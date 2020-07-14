import * as path from "path";
import { SketchFile, JSONPack, Page } from "../../src";
import { Layer } from "../../src/types";

const sampleSketchPath = "demo/files/1Symbol1Artboard.sketch";
const targetPath = "temp/split/split-from";
const packPath = path.join(targetPath, "pack");
const newPackPath = path.join(targetPath, "new");

(async () => {
  try {
    // get one of the layers from a Sketch file

    const sketch = new SketchFile(sampleSketchPath);
    await sketch.unzip(packPath);
    const pack = await JSONPack.fromPath(packPath);

    const pages = pack.getPages();
    let somePage: Page;
    if (pages && pages.length) {
      somePage = pages[0];
    } else {
      throw new Error("No page!");
    }

    const layers = somePage.getLayers({ classes: ["Artboard"] });
    let someLayer: Layer;
    if (layers && layers.length) {
      someLayer = layers[0];
    } else {
      throw new Error("No valid Layer!");
    }

    // make a new Sketch file with that single layer

    const newPack = new JSONPack();
    newPack.write(newPackPath);
    newPack.zip(path.join(path.dirname(newPackPath), "new.sketch"));
  } catch (error) {
    throw error;
  }
})();
