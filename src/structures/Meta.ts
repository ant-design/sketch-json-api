import * as fs from "fs";

import SketchType from "../types";
import { INIT_DATA } from "../constants";
import { makeid } from "../utils";

export type PageRecord = {
  name: string;
  artboards: {
    [key: string]: {
      name: string;
    };
  };
};

export type MetaConstructorOptions = {
  metaId: SketchType.Uuid;
  data: SketchType.MetaJSON;
};

export class Meta {
  metaCommit: SketchType.Uuid;
  data: SketchType.MetaJSON;

  constructor();
  constructor(options: MetaConstructorOptions);
  constructor(options?: any) {
    this.metaCommit = (options && options.metaCommit) || makeid(40);
    this.data = (options && options.data) || {
      commit: this.metaCommit,
      pagesAndArtboards: {},
      version: 130,
      fonts: [],
      compatibilityVersion: 99,
      app: SketchType.FileFormat.default.BundleId.PublicRelease,
      autosaved: 0,
      variant: "NONAPPSTORE",
      created: {
        commit: this.metaCommit,
        appVersion: "66.1",
        build: 97080,
        app: SketchType.FileFormat.default.BundleId.PublicRelease,
        compatibilityVersion: 99,
        version: 130,
        variant: "NONAPPSTORE",
      },
      saveHistory: ["NONAPPSTORE.97080"],
      appVersion: "66.1",
      build: 97080,
    };
  }

  setData(data: SketchType.MetaJSON) {
    this.data = data;
  }

  static fromData(data: SketchType.MetaJSON): Meta {
    const meta = new this();
    meta.setData(data);
    return meta;
  }

  static fromPath(path: string): Meta {
    const file = fs.readFileSync(path, "utf-8");
    if (file) {
      const meta = new this();
      meta.setData(JSON.parse(file));
      return meta;
    } else {
      throw Error("Invalid data from path.");
    }
  }

  toSketchJSON() {
    // todo
    const sketchJSON: SketchType.MetaJSON = this.data;

    return sketchJSON;
  }
}
