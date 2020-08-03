import { SketchFile } from "../../src";

(async () => {
  const sampleSketchPath = "demo/unzip/minisample.sketch";

  const sketch = new SketchFile(sampleSketchPath);
  await sketch.unzip("temp/unzip");
})();
