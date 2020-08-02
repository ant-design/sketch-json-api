import { SketchFile, JSONPack, Page } from "../../src";

const sampleSketchPath = "demo/files/SimpleButton.sketch";

const originSketch = new SketchFile(sampleSketchPath);

const targetPath = "temp/symbol/files";

originSketch.unzip(targetPath).then(() => {
  let jsonPack;
  if (JSONPack.isValidStructure(targetPath)) {
    jsonPack = JSONPack.fromPathSync(targetPath);

    const pages: Page[] = jsonPack.getPages();

    pages.forEach((page) => {
      page.symbolMasters().forEach((symbolMaster) => {
        console.log(
          `symbolMaster: ${symbolMaster.name}, ${symbolMaster.do_objectID}`
        );
      });
    });
  }
});
