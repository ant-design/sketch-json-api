import * as fs from "fs";

import SketchType from "../types";
import { INIT_DATA } from "../constants";

export type MetaConstructorOptions = {
  commit: string;
  appVersion: string;
  // ...
};

export class Meta {
  data: SketchType.MetaJSON;

  constructor();
  constructor(options: MetaConstructorOptions);
  constructor(options?: any) {
    this.data = INIT_DATA.meta;
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
