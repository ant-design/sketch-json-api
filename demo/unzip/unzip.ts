import { SketchFile } from "../../src";

const sampleSketchPath = "demo/unzip/minisample.sketch";

const sketch = new SketchFile(sampleSketchPath);
sketch.unzip("temp/unzip");
