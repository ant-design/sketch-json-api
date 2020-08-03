import { JSONPack } from "../../src";

const samplePackPath = "demo/files/miniSamplePack";

(async () => {
  const pack = await JSONPack.fromPath(samplePackPath);
  await pack.zip("temp/zip/generated.sketch");
})();
