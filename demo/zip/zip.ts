import { JSONPack } from "../../src";

const samplePackPath = "demo/files/miniSamplePack";

(async () => {
  const pack = await JSONPack.fromPath(samplePackPath);
  pack.zip("temp/zip/generated.sketch");
})();
