import { v4 } from "uuid";

import SketchType from "../types";
import { assignDeep } from "../utils";

export interface LayerConstrOpts {
  class?: SketchType.LayerClass;
  data?: any; // TODO: SketchType.Layer
}

const randomSymbolMaster = () => {
  return {
    _class: "symbolMaster",
    frame: {
      _class: "rect",
      constrainProportions: false,
      height: 200,
      width: 200,
      x: 0,
      y: 0,
    },
    allowsOverrides: true,
    backgroundColor: {
      _class: "color",
      red: 1,
      green: 1,
      blue: 1,
      alpha: 1,
    },
    booleanOperation: -1,
    changeIdentifier: 0,
    do_objectID: v4().toUpperCase(),
    symbolID: v4().toUpperCase(),
    exportOptions: {
      _class: "exportOptions",
      includedLayerIds: [],
      layerOptions: 0,
      shouldTrim: false,
      exportFormats: [],
    },
    hasClickThrough: true,
    includeInCloudUpload: true,
    hasBackgroundColor: false,
    includeBackgroundColorInExport: true,
    resizesContent: false,
    includeBackgroundColorInInstance: false,
    nameIsFixed: false,
    horizontalRulerData: { _class: "rulerData", base: 0, guides: [] },
    verticalRulerData: { _class: "rulerData", base: 0, guides: [] },
    resizingConstraint: 1,
    resizingType: 1,
    isFixedToViewport: false,
    sharedStyleID: "",
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isFlowHome: false,
    name: "SymbolMaster",
    rotation: 0,
    layerListExpandedType: 0,
    overrideProperties: [],
    layers: [],
    isVisible: true,
  };
};

const randomArtboard = () => {
  return {
    _class: "artboard",
    do_objectID: v4().toUpperCase(),
    booleanOperation: -1,
    isFixedToViewport: false,
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: 0,
    name: "Artboard",
    nameIsFixed: false,
    resizingConstraint: 63,
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: true,
    exportOptions: {
      _class: "exportOptions",
      includedLayerIds: [],
      layerOptions: 0,
      shouldTrim: false,
      exportFormats: [],
    },
    frame: {
      _class: "rect",
      constrainProportions: false,
      height: 200,
      width: 300,
      x: 100,
      y: 100,
    },
    clippingMaskMode: 0,
    hasClippingMask: false,
    style: {
      _class: "style",
      do_objectID: v4().toUpperCase(),
      endMarkerType: 0,
      miterLimit: 10,
      startMarkerType: 0,
      windingRule: 1,
      blur: {
        _class: "blur",
        isEnabled: false,
        center: "{0.5, 0.5}",
        motionAngle: 0,
        radius: 10,
        saturation: 1,
        type: 0,
      },
      borderOptions: {
        _class: "borderOptions",
        isEnabled: true,
        dashPattern: [],
        lineCapStyle: 0,
        lineJoinStyle: 0,
      },
      borders: [],
      colorControls: {
        _class: "colorControls",
        isEnabled: false,
        brightness: 0,
        contrast: 1,
        hue: 0,
        saturation: 1,
      },
      contextSettings: {
        _class: "graphicsContextSettings",
        blendMode: 0,
        opacity: 1,
      },
      fills: [],
      innerShadows: [],
      shadows: [],
    },
    hasClickThrough: false,
    groupLayout: { _class: "MSImmutableFreeformGroupLayout" },
    layers: [],
    hasBackgroundColor: false,
    includeBackgroundColorInExport: true,
    includeInCloudUpload: true,
    isFlowHome: false,
    presetDictionary: {},
    resizesContent: false,
    backgroundColor: {
      _class: "color",
      alpha: 1,
      blue: 1,
      green: 1,
      red: 1,
    },
    horizontalRulerData: { _class: "rulerData", base: 0, guides: [] },
    verticalRulerData: { _class: "rulerData", base: 0, guides: [] },
  };
};

export class Layer {
  class: SketchType.LayerClass;
  data: any; // TODO: SketchType.Layer

  constructor();
  constructor(options: LayerConstrOpts);
  constructor(options?: any) {
    const _class = options?.class || "Artboard";
    let _data = options?.data;
    if (!_data) {
      if (options?.class === "SymbolMaster") {
        _data = randomSymbolMaster();
      } else {
        _data = randomArtboard();
      }
    }

    if (!_data._class || _class.toLowerCase() !== _data._class.toLowerCase()) {
      throw new Error(
        `Class (${options.class}) and data (${options.data._class}) can not match!`
      );
    }

    this.class = _class;
    this.data = _data;
  }

  updateProps(options?: LayerConstrOpts): void;
  updateProps(options?: any) {
    Object.keys(options).forEach((prop) => {
      if (this.hasOwnProperty(prop)) {
        this[prop as keyof this] = assignDeep(
          {},
          this[prop as keyof this],
          options[prop]
        );
      }
    });
  }

  toSketchJSON(): SketchType.Layer {
    return JSON.parse(JSON.stringify(this.data));
  }

  static symbolToArtboard(
    symbol: SketchType.SymbolMaster
  ): SketchType.Artboard {
    const outerArtboard = new Layer({ class: "Artboard", data: null });
    outerArtboard.updateProps({
      data: {
        name: symbol.name,
        frame: symbol.frame,
        layers: symbol.layers,
      } as SketchType.Artboard,
    });
    return outerArtboard.toSketchJSON() as SketchType.Artboard;
  }

  static artboardToSymbol(
    artboard: SketchType.Artboard
  ): SketchType.SymbolMaster {
    const outerSymbol = new Layer({
      class: "SymbolMaster",
      data: null,
    });
    outerSymbol.updateProps({
      data: {
        name: artboard.name,
        frame: artboard.frame,
        layers: artboard.layers,
      },
    });

    return outerSymbol.toSketchJSON() as SketchType.SymbolMaster;
  }
}
