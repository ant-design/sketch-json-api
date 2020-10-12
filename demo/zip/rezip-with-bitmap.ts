import { JSONPack, SketchFile } from "../../src";

const DEMO_SOURCE_FILE = "demo/files/bitmap.sketch";
const DEMO_PATH = "temp/zip/rezip-with-bitmap";

(async () => {
  const originSketch = new SketchFile(DEMO_SOURCE_FILE);
  const originFilePath = `${DEMO_PATH}/origin`;
  await originSketch.unzip(originFilePath);

  if (!JSONPack.isValidStructure(originFilePath)) return;

  const newPack = await JSONPack.fromPath(originFilePath);

  await newPack.write(`${DEMO_PATH}/files`);
  await newPack.zip(`${DEMO_PATH}/result.sketch`);
})();
