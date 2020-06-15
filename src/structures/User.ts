import * as fs from "fs";

import SketchType from "../types";
import { CONSTANTS } from "../constants";

export interface UserConstructorOptions {
  document?: SketchType.UserJSON_Document;
  pageConfigs?: SketchType.UserJSON_PageConfig[];
}

type KeyOfPageConfig = keyof SketchType.UserJSON_PageConfig;

export class User {
  document: SketchType.UserJSON_Document;
  pageConfigs?: SketchType.UserJSON_PageConfig[];

  constructor();
  constructor(options: UserConstructorOptions);
  constructor(options?: any) {
    this.document = (options && options.document) || {
      pageListCollapsed: CONSTANTS.user.document.pageListCollapsed.default,
      pageListHeight: CONSTANTS.user.document.pageListHeight.default,
    };

    if (options && options.pageConfigs) {
      this.pageConfigs = options.pageConfigs;
    }
  }

  static fromData(data: UserConstructorOptions) {
    return new this(data);
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

  toSketchJSON() {
    const sketchJSON: SketchType.UserJSON = { document: this.document };
    if (this.pageConfigs) {
      this.pageConfigs.forEach((pageConfig) => {
        sketchJSON[pageConfig.pageId] = {};
        const keys = Object.keys(pageConfig) as KeyOfPageConfig[];
        keys.forEach((key) => {
          if (key !== "pageId") {
            sketchJSON[pageConfig.pageId][key] = pageConfig[key];
          }
        });
      });
    }

    return sketchJSON;
  }
}
