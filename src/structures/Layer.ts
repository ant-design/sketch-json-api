import { v4 } from "uuid";

import SketchType from "../types";
import { assignDeep } from "../utils";

export interface LayerConstrOpts {
  class?: SketchType.LayerClass;
  data?: any; // TODO: SketchType.Layer
}

const INIT_ARTBOARD = {
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

export class Layer {
  class: SketchType.LayerClass;
  data: any; // TODO: SketchType.Layer

  constructor();
  constructor(options: LayerConstrOpts);
  constructor(options?: any) {
    if (
      options &&
      options.class &&
      options.data &&
      (!options.data._class ||
        options.class.toLowerCase() !== options.data._class.toLowerCase())
    ) {
      throw new Error(
        `Class (${options.class}) and data (${options.data._class}) can not match!`
      );
    }
    this.class = (options && options.class) || "Artboard";
    this.data = (options && options.data) || INIT_ARTBOARD;
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
}
