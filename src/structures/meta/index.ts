import SketchType from "../../types";
import CONSTANTS from "../../constants";

export class MetaJSON {
  constructor() {}

  toSketchJSON() {
    const sketchJSON: SketchType.MetaJSON = {
      commit: "d06f2f7bf433bc948c6f867ddfb87013f4871eb3",
      pagesAndArtboards: {
        "A869BA2A-E632-4C2D-924E-7883848BB266": {
          name: "Page 1",
          artboards: {},
        },
      },
      version: 130,
      fonts: [],
      compatibilityVersion: 99,
      app: SketchType.FileFormat.default.BundleId.PublicRelease,
      autosaved: 0,
      variant: "NONAPPSTORE",
      created: {
        commit: "d06f2f7bf433bc948c6f867ddfb87013f4871eb3",
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

    return sketchJSON;
  }
}
