import SketchType from "../../types";
import CONSTANTS from "../../constants";

export class DocumentJSON {
  constructor() {}

  toSketchJSON() {
    const sketchJSON: SketchType.DocumentJSON = {
      _class: "document",
      do_objectID: "8B84C1BB-ADEF-4766-9AD4-F91CE2485378",
      agreedToFontEmbedding: false,
      autoEmbedFonts: false,
      colorSpace: 0,
      currentPageIndex: 0,
      assets: {
        _class: "assetCollection",
        do_objectID: "21BD5B6A-507E-494C-9BCF-CBC641C3BCE9",
        images: [],
        colorAssets: [],
        exportPresets: [],
        gradientAssets: [],
        imageCollection: { _class: "imageCollection", images: {} },
        colors: [],
        gradients: [],
      },
      fontReferences: [],
      foreignLayerStyles: [],
      foreignSwatches: [],
      foreignSymbols: [],
      foreignTextStyles: [],
      layerStyles: { _class: "sharedStyleContainer", objects: [] },
      layerSymbols: { _class: "symbolContainer", objects: [] },
      layerTextStyles: { _class: "sharedTextStyleContainer", objects: [] },
      pages: [
        {
          _class: "MSJSONFileReference",
          _ref_class: "MSImmutablePage",
          _ref: "pages/A869BA2A-E632-4C2D-924E-7883848BB266",
        },
      ],
      sharedSwatches: { _class: "swatchContainer", objects: [] },
    };

    return sketchJSON;
  }
}
