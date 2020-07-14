import * as fs from "fs";
import { v4 } from "uuid";

import SketchType from "../types";

export type DocumentConstructorOptions = {
  documentId: SketchType.Uuid;
  data: SketchType.DocumentJSON;
};

export class Document {
  documentId: SketchType.Uuid;
  data: SketchType.DocumentJSON;

  constructor();
  constructor(options: DocumentConstructorOptions);
  constructor(options?: any) {
    this.documentId = (options && options.documentId) || v4().toUpperCase();
    this.data = (options && options.data) || {
      _class: "document",
      do_objectID: this.documentId,
      assets: {
        _class: "assetCollection",
        colors: [],
        gradients: [],
        imageCollection: {
          _class: "imageCollection",
          images: {},
        },
        images: [],
      },
      colorSpace: 0,
      currentPageIndex: 1,
      foreignLayerStyles: [],
      foreignSymbols: [],
      foreignTextStyles: [],
      layerStyles: {
        _class: "sharedStyleContainer",
        objects: [],
      },
      layerSymbols: {
        _class: "symbolContainer",
        objects: [],
      },
      layerTextStyles: {
        _class: "sharedTextStyleContainer",
        objects: [],
      },
      pages: [],
    };
  }

  setData(data: SketchType.DocumentJSON) {
    this.data = data;
  }

  static fromData(data: SketchType.DocumentJSON): Document {
    const document = new this();
    document.setData(data);
    return document;
  }

  static fromPath(path: string): Document {
    const file = fs.readFileSync(path, "utf-8");
    if (file) {
      const document = new this();
      document.setData(JSON.parse(file));
      return document;
    } else {
      throw Error("Invalid data from path.");
    }
  }

  toSketchJSON() {
    return this.data;
  }
}
