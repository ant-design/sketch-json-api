import * as fs from "fs";
import { v4 } from "uuid";

import SketchType from "../types";
import { Rect } from "./models";
import { INIT_DATA } from "../constants";

export class Page {
  static _class: "page" = "page";

  do_objectID: SketchType.Uuid;
  booleanOperation: SketchType.BooleanOperation;
  exportOptions: SketchType.ExportOptions;
  frame: SketchType.Rect;
  isFixedToViewport: boolean;
  isFlippedHorizontal: boolean;
  isFlippedVertical: boolean;
  isLocked: boolean;
  isVisible: boolean;
  layerListExpandedType: SketchType.LayerListExpanded;
  name: string;
  nameIsFixed: boolean;
  resizingConstraint: number;
  resizingType: SketchType.ResizeType;
  rotation: number;
  shouldBreakMaskChain: boolean;
  hasClickThrough: boolean;
  layers: SketchType.Layer[];
  includeInCloudUpload: boolean;
  horizontalRulerData: SketchType.RulerData;
  verticalRulerData: SketchType.RulerData;

  constructor();
  constructor(options?: SketchType.Page);
  constructor(options?: any) {
    this.do_objectID = (options && options.do_objectID) || v4().toUpperCase();
    this.name = (options && options.name) || "Page";
    this.frame = (options && options.frame) || new Rect().toSketchJSON();
    this.layers = (options && options.layers) || [];

    this.booleanOperation = (options && options.booleanOperation) || -1;
    this.exportOptions =
      (options && options.exportOptions) || INIT_DATA.ExportOptions;
    this.isFixedToViewport = (options && options.isFixedToViewport) || false;
    this.isFlippedHorizontal =
      (options && options.isFlippedHorizontal) || false;
    this.isFlippedVertical = (options && options.isFlippedVertical) || false;
    this.isLocked = (options && options.isLocked) || false;
    this.isVisible = (options && options.isVisible) || true;
    this.layerListExpandedType =
      (options && options.layerListExpandedType) || 0;
    this.nameIsFixed = (options && options.nameIsFixed) || false;
    this.resizingConstraint = (options && options.resizingConstraint) || 63;
    this.resizingType = (options && options.resizingType) || 0;
    this.rotation = (options && options.rotation) || 0;
    this.shouldBreakMaskChain =
      (options && options.shouldBreakMaskChain) || false;
    this.hasClickThrough = (options && options.hasClickThrough) || true;
    this.includeInCloudUpload =
      (options && options.includeInCloudUpload) || true;
    this.horizontalRulerData =
      (options && options.horizontalRulerData) || INIT_DATA.RulerData;
    this.verticalRulerData =
      (options && options.verticalRulerData) || INIT_DATA.RulerData;
  }

  updateProps(options?: SketchType.Page): void;
  updateProps(options?: any) {
    Object.keys(options).forEach((prop) => {
      if (this.hasOwnProperty(prop)) {
        this[prop as keyof this] = options[prop];
      }
    });
  }

  addSymbolMaster(symbolMaster: SketchType.SymbolMaster) {
    this.layers.push(symbolMaster);
  }

  getPageId() {
    return this.do_objectID;
  }

  getName() {
    return this.name;
  }

  static fromData(options: SketchType.Page): Page {
    const page = new this();
    page.updateProps(options);
    return page;
  }

  static fromPath(path: string): Page {
    const file = fs.readFileSync(path, "utf-8");
    if (file) {
      const options: SketchType.Page = JSON.parse(file);
      const page = new this(options);
      return page;
    } else {
      throw Error("Invalid data from path.");
    }
  }

  artboards(): SketchType.ArtboardLike[] {
    const allArtboards: SketchType.ArtboardLike[] = [];
    const layers = this.layers;
    layers.forEach((layer) => {
      if (layer._class === "artboard" || layer._class === "symbolMaster") {
        allArtboards.push(layer);
      }
    });
    return allArtboards;
  }

  symbolMasters(): SketchType.SymbolMaster[] {
    const allSymbolMasters: SketchType.SymbolMaster[] = [];
    const layers = this.layers;
    layers.forEach((layer) => {
      if (layer._class === "symbolMaster") {
        allSymbolMasters.push(layer);
      }
    });
    return allSymbolMasters;
  }

  toSketchJSON(): SketchType.Page {
    return {
      _class: Page._class,

      do_objectID: this.do_objectID,
      name: this.name,
      layers: this.layers as SketchType.Layer[],

      booleanOperation: this.booleanOperation,
      exportOptions: this.exportOptions,
      frame: this.frame,
      isFixedToViewport: this.isFixedToViewport,
      isFlippedHorizontal: this.isFlippedHorizontal,
      isFlippedVertical: this.isFlippedVertical,
      isLocked: this.isLocked,
      isVisible: this.isVisible,
      layerListExpandedType: this.layerListExpandedType,
      nameIsFixed: this.nameIsFixed,
      resizingConstraint: this.resizingConstraint,
      resizingType: this.resizingType,
      rotation: this.rotation,
      shouldBreakMaskChain: this.shouldBreakMaskChain,
      hasClickThrough: this.hasClickThrough,
      includeInCloudUpload: this.includeInCloudUpload,
      horizontalRulerData: this.horizontalRulerData,
      verticalRulerData: this.verticalRulerData,
    };
  }

  getLayers(options?: {
    classes: SketchType.LayerClass[];
  }): SketchType.Layer[] {
    if (!options || !options.classes) {
      return this.layers;
    }

    const filteredLayerClasses = options.classes.map((c) => c.toLowerCase());

    const filteredLayers: SketchType.Layer[] = [];
    const layers = this.layers;
    layers.forEach((layer) => {
      if (filteredLayerClasses.includes(layer._class.toLowerCase())) {
        filteredLayers.push(layer);
      }
    });
    return filteredLayers;
  }

  reLayoutLayers() {
    let yMark = 0;
    const Y_Margin = 20;
    const Y_MAX = 2000;

    let xMark = 0;
    const X_Margin = 100;
    let localMaxWidth = 0;

    this.layers.forEach((layer, i) => {
      const { height, width } = layer.frame;

      if (width > localMaxWidth) {
        localMaxWidth = width;
      }

      let layerTop = yMark + Y_Margin;
      let layerBottom = layerTop + height;

      if (layerBottom > Y_MAX) {
        layerTop = 0;
        layerBottom = height;
        xMark += localMaxWidth + X_Margin;
        localMaxWidth = width;
      }

      this.layers[i].frame.y = layerTop;
      yMark = layerBottom;

      this.layers[i].frame.x = xMark;
    });
  }
}
