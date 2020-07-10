import { JSONPack } from "../../src";

const samplePackPath = "demo/files/miniSamplePack";

const pack = JSONPack.fromPath(samplePackPath);
pack.zip("temp/zip/generated.sketch");
