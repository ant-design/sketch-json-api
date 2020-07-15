import * as fs from "fs";
import { v4 } from "uuid";

import SketchType from "../types";
import { Page } from "./Page";

export class Document {
  static _class: "document" = "document";

  do_objectID: SketchType.Uuid;
  pages: SketchType.FileRef[];

  assets: SketchType.AssetCollection;
  colorSpace: SketchType.ColorSpace;
  currentPageIndex: number;
  foreignLayerStyles: SketchType.ForeignLayerStyle[];
  foreignSymbols: SketchType.ForeignSymbol[];
  foreignTextStyles: SketchType.ForeignTextStyle[];
  layerStyles: SketchType.SharedStyleContainer;
  layerTextStyles: SketchType.SharedTextStyleContainer;

  constructor();
  constructor(options: SketchType.Document);
  constructor(options?: SketchType.Document, pages?: Page[]);
  constructor(options?: any, pages?: any) {
    this.do_objectID = (options && options.do_objectID) || v4().toUpperCase();

    if (pages) {
      this.pages = pages.map((page: Page) => {
        const pageRef: SketchType.FileRef = {
          _class: "MSJSONFileReference",
          _ref_class: "MSImmutablePage",
          _ref: `pages/${page.getPageId()}`,
        };
        return pageRef;
      });
    } else if (options && options.pages && options.pages.length) {
      this.pages = options.pages;
    } else {
      const atLeastOnePage = new Page();
      const pageRef: SketchType.FileRef = {
        _class: "MSJSONFileReference",
        _ref_class: "MSImmutablePage",
        _ref: `pages/${atLeastOnePage.getPageId()}`,
      };
      this.pages = [pageRef];
    }

    this.assets = (options && options.assets) || {
      _class: "assetCollection",
      colors: [],
      gradients: [],
      imageCollection: {
        _class: "imageCollection",
        images: {},
      },
      images: [],
    };

    this.colorSpace = (options && options.colorSpace) || 0;
    this.currentPageIndex = (options && options.currentPageIndex) || 1;
    this.foreignLayerStyles = (options && options.foreignLayerStyles) || [];
    this.foreignSymbols = (options && options.foreignSymbols) || [];
    this.foreignTextStyles = (options && options.foreignTextStyles) || [];
    this.layerStyles = (options && options.layerStyles) || {
      _class: "sharedStyleContainer",
      objects: [],
    };
    this.layerTextStyles = (options && options.layerTextStyles) || {
      _class: "sharedTextStyleContainer",
      objects: [],
    };
  }

  updateProps(options?: SketchType.Document): void;
  updateProps(options?: any) {
    Object.keys(options).forEach((prop) => {
      if (this.hasOwnProperty(prop)) {
        this[prop as keyof this] = options[prop];
      }
    });
  }

  static fromData(options: SketchType.Document): Document {
    const document = new this();
    document.updateProps(options);
    return document;
  }

  static fromPath(path: string): Document {
    const file = fs.readFileSync(path, "utf-8");
    if (file) {
      const document = new this();
      document.updateProps(JSON.parse(file));
      return document;
    } else {
      throw Error("Invalid data from path.");
    }
  }

  toSketchJSON(): SketchType.Document {
    return {
      _class: Document._class,

      do_objectID: this.do_objectID,
      pages: this.pages,

      assets: this.assets,
      colorSpace: this.colorSpace,
      currentPageIndex: this.currentPageIndex,
      foreignLayerStyles: this.foreignLayerStyles,
      foreignSymbols: this.foreignSymbols,
      foreignTextStyles: this.foreignTextStyles,
      layerStyles: this.layerStyles,
      layerTextStyles: this.layerTextStyles,
    };
  }
}
