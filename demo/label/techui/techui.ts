import * as fs from "fs";

import { SketchFile, JSONPack, Page, labelSymbolMaster } from "../../../src";
import { TechUI_META } from "./meta";

const ASSET_META = TechUI_META;
const sampleSketchPath = "demo/files/TechUIdemo.sketch";

const originSketch = new SketchFile(sampleSketchPath);

const targetPath = "temp/techui/files";

if (fs.existsSync(targetPath)) {
  //@todo: delete
}

originSketch
  .unzip(targetPath)
  .then(() => {
    let jsonPack;
    if (JSONPack.isValidStructure(targetPath)) {
      jsonPack = JSONPack.fromPathSync(targetPath);

      const pages: Page[] = jsonPack.getPages();

      pages.forEach((page) => {
        page.symbolMasters().forEach((symbolMaster, index) => {
          const labelInfo = ASSET_META.assets.examples.find(
            (example) => example.layerName === symbolMaster.name
          );

          if (labelInfo) {
            const atom = ASSET_META.assets.atoms.find(
              (atom) => atom.identifier === labelInfo.atomAssetID
            );

            const labelledSymbolMaster = labelSymbolMaster(symbolMaster, {
              library: {
                libName: ASSET_META.brand,
                package: ASSET_META.package,
                version: ASSET_META.version,
              },
              atom,
              example: labelInfo,
            });

            page.symbolMasters()[index] = labelledSymbolMaster;
          }
        });
      });

      return jsonPack;
    }
  })
  .then((jsonPack) => {
    if (!jsonPack) {
      throw new Error("JSON pack is not found.");
    }
    const checkPath = "temp/techui/labeljson";
    jsonPack.writeSync(checkPath);
    jsonPack.zipSync("temp/techui/techui-label.sketch");
  });
