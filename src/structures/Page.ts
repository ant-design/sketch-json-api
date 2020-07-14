import * as fs from "fs";
import { v4 } from "uuid";

import SketchType from "../types";
import { Rect } from "./models";
import { INIT_DATA } from "../constants";

export type PageConstructorOptions = {
  pageId: SketchType.Uuid;
  data: SketchType.PageJSON;
};

export class Page {
  pageId: SketchType.Uuid;
  data: SketchType.PageJSON;

  constructor();
  constructor(options?: PageConstructorOptions);
  constructor(options?: any) {
    this.pageId = (options && options.pageId) || v4().toUpperCase();
    this.data = (options && options.data) || {
      _class: "page",
      do_objectID: this.pageId,
      booleanOperation: -1,
      exportOptions: INIT_DATA.ExportOptions,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: false,
      isVisible: true,
      layerListExpandedType: 0,
      name: "Page",
      nameIsFixed: false,
      resizingConstraint: 63,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      hasClickThrough: true,
      frame: new Rect().toSketchJSON(),
      layers: [],
      includeInCloudUpload: true,
      horizontalRulerData: INIT_DATA.RulerData,
      verticalRulerData: INIT_DATA.RulerData,
    };
  }

  addSymbolMaster(symbolMaster: SketchType.SymbolMaster) {
    this.data.layers.push(symbolMaster);
  }

  getPageId() {
    return this.pageId;
  }

  setData(data: SketchType.PageJSON) {
    this.data = data;
  }

  static fromData(data: SketchType.PageJSON): Page {
    const page = new this();
    page.setData(data);
    return page;
  }

  static fromPath(path: string): Page {
    const file = fs.readFileSync(path, "utf-8");
    if (file) {
      const data: SketchType.PageJSON = JSON.parse(file);
      const id = data.do_objectID;

      const page = new this({ pageId: id, data });
      return page;
    } else {
      throw Error("Invalid data from path.");
    }
  }

  artboards(): SketchType.ArtboardLike[] {
    const allArtboards: SketchType.ArtboardLike[] = [];
    const layers = this.data.layers;
    layers.forEach((layer) => {
      if (layer._class === "artboard" || layer._class === "symbolMaster") {
        allArtboards.push(layer);
      }
    });
    return allArtboards;
  }

  symbolMasters(): SketchType.SymbolMaster[] {
    const allSymbolMasters: SketchType.SymbolMaster[] = [];
    const layers = this.data.layers;
    layers.forEach((layer) => {
      if (layer._class === "symbolMaster") {
        allSymbolMasters.push(layer);
      }
    });
    return allSymbolMasters;
  }

  toSketchJSON() {
    return this.data;
  }

  getLayers(options?: {
    classes: SketchType.LayerClass[];
  }): SketchType.Layer[] {
    if (!options || !options.classes) {
      return this.data.layers;
    }

    const filteredLayerClasses = options.classes.map((c) => c.toLowerCase());

    const filteredLayers: SketchType.Layer[] = [];
    const layers = this.data.layers;
    layers.forEach((layer) => {
      if (filteredLayerClasses.includes(layer._class.toLowerCase())) {
        filteredLayers.push(layer);
      }
    });
    return filteredLayers;
  }
}
