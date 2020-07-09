import * as fs from "fs";
import { v4 } from "uuid";

import SketchType from "../types";
import { INIT_DATA } from "../constants";

export type PageConstrOpts = {
  pageId?: SketchType.PageId;
  data?: SketchType.PageJSON;
};

export class Page {
  pageId: SketchType.PageId;
  data: SketchType.PageJSON;

  constructor(options?: PageConstrOpts) {
    this.pageId = (options && options.pageId) || v4().toUpperCase();
    this.data = (options && options.data) || INIT_DATA.page; //@todo
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
