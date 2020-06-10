import SketchType from "../../types";
import CONSTANTS from "../../constants";

export interface UserJSONOptions {
  document?: SketchType.UserJSON_Document;
  pageConfigs?: SketchType.UserJSON_PageConfig[];
}

type KeyOfPageConfig = keyof SketchType.UserJSON_PageConfig;

export class UserJSON {
  document: SketchType.UserJSON_Document;
  pageConfigs?: SketchType.UserJSON_PageConfig[];
  constructor(options?: UserJSONOptions) {
    this.document = {
      pageListCollapsed: CONSTANTS.user.document.pageListCollapsed.default,
      pageListHeight: CONSTANTS.user.document.pageListHeight.default,
    };

    if (options) {
      const { document, pageConfigs } = options;

      if (document) {
        this.document = { ...this.document, ...document };
      }

      if (pageConfigs) {
        this.pageConfigs = pageConfigs;
      }
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
