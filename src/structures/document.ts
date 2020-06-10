import * as fs from "fs";

import SketchType from "../types";
import { INIT_DATA } from "../constants";

export type DocumentConstructorOptions = {
  do_objectID: SketchType.Uuid;
  // ...
};

export class Document {
  data: SketchType.DocumentJSON;

  constructor();
  constructor(options: DocumentConstructorOptions);
  constructor(options?: any) {
    this.data = INIT_DATA.document;
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
