import { SketchFile, JSONPack, Page, labelSymbolMaster } from "../../src";

const ASSET_META = {
  brand: "some design system",
  assets: {
    atoms: [
      {
        identifier: "checkbox",
        name: "Checkbox",
        package: "@com/someds",
      },
      {
        identifier: "radio",
        name: "Radio",
        package: "@com/someds",
      },
    ],
    examples: [
      {
        atomAssetID: "checkbox",
        identifier: "checkbox/unselected",
        name: "Checkbox(unselected)",
      },
      {
        atomAssetID: "checkbox",
        identifier: "checkbox/hover",
        name: "Checkbox(hover)",
      },
      {
        atomAssetID: "checkbox",
        identifier: "checkbox/selected",
        name: "Checkbox(selected)",
      },
      {
        atomAssetID: "radio",
        identifier: "radio/unselected",
        name: "Radio(unselected)",
      },
      {
        atomAssetID: "radio",
        identifier: "radio/hover",
        name: "Radio(hover)",
      },
      {
        atomAssetID: "radio",
        identifier: "radio/selected",
        name: "Radio(selected)",
      },
    ],
  },
};

const sampleSketchPath = "demo/files/CheckboxAndRadio.sketch";

const originSketch = new SketchFile(sampleSketchPath);

const targetPath = "temp/label/files";

originSketch
  .unzip(targetPath)
  .then((unzipped) => {
    if (unzipped) {
      let jsonPack;
      if (JSONPack.isValidStructure(targetPath)) {
        jsonPack = JSONPack.fromPathSync(targetPath);

        const pages: Page[] = jsonPack.getPages();

        pages.forEach((page) => {
          page.symbolMasters().forEach((symbolMaster, index) => {
            const labelInfo = ASSET_META.assets.examples.find(
              (example) => example.identifier === symbolMaster.name
            );

            if (labelInfo) {
              const atom = ASSET_META.assets.atoms.find(
                (atom) => atom.identifier === labelInfo.atomAssetID
              );

              const labelledSymbolMaster = labelSymbolMaster(symbolMaster, {
                example: labelInfo,
                atom,
              });

              page.symbolMasters()[index] = labelledSymbolMaster;
            }
          });
        });

        return jsonPack;
      }
    }
  })
  .then((jsonPack) => {
    const checkPath = "temp/label/check";
    jsonPack?.writeSync(checkPath);
  });
