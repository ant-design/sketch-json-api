import * as fs from "fs";

import SketchType from "../types";
import { INIT_DATA } from "../constants";

export class Page {
  pageId: SketchType.PageId;
  data: SketchType.PageJSON;

  constructor() {
    this.pageId = "A869BA2A-E632-4C2D-924E-7883848BB266";
    this.data = INIT_DATA.page;
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
      const page = new this();
      page.setData(JSON.parse(file));
      return page;
    } else {
      throw Error("Invalid data from path.");
    }
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
}
