import * as fs from "fs";

import SketchType from "../types";
import { makeid } from "../utils";
import { Page } from "./Page";
import { PagesAndArtboards } from "./models/PagesAndArtboards";

export class Meta {
  commit: string;
  pagesAndArtboards: SketchType.PagesAndArtboards;
  version: SketchType.Version;
  fonts: string[];
  compatibilityVersion: 99;
  app: SketchType.BundleId;
  autosaved: SketchType.NumericalBool;
  variant: SketchType.SketchVariant;
  created: {
    commit: string;
    appVersion: string;
    build: number;
    app: SketchType.BundleId;
    compatibilityVersion: number;
    version: number;
    variant: SketchType.SketchVariant;
  };
  saveHistory: string[];
  appVersion: string;
  build: number;

  constructor();
  constructor(options: SketchType.Meta);
  constructor(options?: SketchType.Meta, pages?: Page[]);
  constructor(options?: any, pages?: any) {
    this.commit = (options && options.commit) || makeid(40);

    if (pages) {
      this.pagesAndArtboards = PagesAndArtboards.fromPages(
        pages
      ).toSketchJSON();
    } else if (
      options &&
      options.pagesAndArtboards &&
      Object.keys(options.pagesAndArtboards).length
    ) {
      this.pagesAndArtboards = options.pagesAndArtboards;
    } else {
      const atLeastOnePage = new Page();
      const initPagesAndArtboards: SketchType.PagesAndArtboards = {};
      initPagesAndArtboards[atLeastOnePage.getPageId()] = {
        name: atLeastOnePage.toSketchJSON().name,
        artboards: {},
      };
      this.pagesAndArtboards = initPagesAndArtboards;
    }

    this.version = (options && options.version) || 130;
    this.fonts = (options && options.fonts) || [];
    this.compatibilityVersion = (options && options.compatibilityVersion) || 99;
    this.app =
      (options && options.app) ||
      SketchType.FileFormat.default.BundleId.PublicRelease;
    this.autosaved = (options && options.autosaved) || 0;
    this.variant = (options && options.variant) || "NONAPPSTORE";
    this.created = (options && options.created) || {
      commit: this.commit,
      appVersion: "66.1",
      build: 97080,
      app: SketchType.FileFormat.default.BundleId.PublicRelease,
      compatibilityVersion: 99,
      version: 130,
      variant: "NONAPPSTORE",
    };
    this.saveHistory = (options && options.saveHistory) || [
      "NONAPPSTORE.97080",
    ];
    this.appVersion = (options && options.appVersion) || "66.1";
    this.build = (options && options.build) || 97080;
  }

  updateProps(options?: SketchType.Meta): void;
  updateProps(options?: any) {
    Object.keys(options).forEach((prop) => {
      if (this.hasOwnProperty(prop)) {
        this[prop as keyof this] = options[prop];
      }
    });
  }

  static fromData(options: SketchType.Meta): Meta {
    const meta = new this();
    meta.updateProps(options);
    return meta;
  }

  static fromPath(path: string): Meta {
    const file = fs.readFileSync(path, "utf-8");
    if (file) {
      const meta = new this();
      meta.updateProps(JSON.parse(file));
      return meta;
    } else {
      throw Error("Invalid data from path.");
    }
  }

  toSketchJSON(): SketchType.Meta {
    return {
      commit: this.commit,
      pagesAndArtboards: this.pagesAndArtboards,
      version: this.version,
      fonts: this.fonts,
      compatibilityVersion: this.compatibilityVersion,
      app: this.app,
      autosaved: this.autosaved,
      variant: this.variant,
      created: this.created,
      saveHistory: this.saveHistory,
      appVersion: this.appVersion,
      build: this.build,
    };
  }
}
