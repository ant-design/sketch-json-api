import { SketchFile, JSONPack } from "../../src";

const sampleSketchPath = "demo/files/SimpleButton.sketch";

const originSketch = new SketchFile(sampleSketchPath);

const targetPath = "temp/label/files";

originSketch.unzipSync(targetPath);

if (JSONPack.isValidStructure(targetPath)) {
  console.log("yes");
}
