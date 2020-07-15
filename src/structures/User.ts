import * as fs from "fs";

import SketchType from "../types";
import { CONSTANTS } from "../constants";

export class User {
  document: SketchType.UserDocumentConfigs;

  otherConfigs?: { key: string; value: SketchType.UserPageConfigs | any }[];

  constructor();
  constructor(options: SketchType.User);
  constructor(options?: any) {
    this.document = (options && options.document) || {
      pageListCollapsed: CONSTANTS.user.document.pageListCollapsed.default,
      pageListHeight: CONSTANTS.user.document.pageListHeight.default,
    };

    if (options) {
      Object.keys(options).forEach((key) => {
        if (key !== "document") {
          if (!this.otherConfigs) this.otherConfigs = [];
          this.otherConfigs.push({
            key,
            value: options[key],
          });
        }
      });
    }
  }

  updateProps(options?: SketchType.User): void;
  updateProps(options?: any) {
    Object.keys(options).forEach((prop) => {
      if (this.hasOwnProperty(prop)) {
        this[prop as keyof this] = options[prop];
      }
    });
  }

  static fromData(options: SketchType.User): User {
    return new this(options);
  }

  static fromPath(path: string): User {
    const file = fs.readFileSync(path, "utf-8");
    if (file) {
      const meta = new this(JSON.parse(file));
      return meta;
    } else {
      throw Error("Invalid data from path.");
    }
  }

  toSketchJSON(): SketchType.User {
    const json: SketchType.User = { document: this.document };

    if (this.otherConfigs) {
      this.otherConfigs.forEach(({ key, value }) => {
        json[key] = value;
      });
    }

    return json;
  }
}
