import { SketchFile, JSONPack } from "../../src";

const sampleSketchPath = "demo/label/SimpleButton.sketch";

const originSketch = new SketchFile(sampleSketchPath);

const targetPath = "temp/label/files";

originSketch.unzip(targetPath);

if (JSONPack.isValidStructure(targetPath)) {
  console.log("yes");
}
