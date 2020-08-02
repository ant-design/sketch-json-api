import * as path from "path";
import { SketchFile, JSONPack } from "../src";

// const testResultsPath = "temp/tests/sketchfile";

// const testSketchFilePath = "demo/files/SimpleButton.sketch";
// const testSketchFile = new SketchFile(testSketchFilePath);

describe("SketchFile class", () => {
  it("todo", () => {
    expect(true).toBe(true);
  });

  //   describe("unzip method works for", () => {
  //     it("sync case", () => {
  //       const syncDestPath = path.join(testResultsPath, "unzip_sync");
  //       testSketchFile.unzipSync(syncDestPath);
  //       expect(JSONPack.isValidStructure(syncDestPath)).toBe(true);
  //     });
  //     it("async case", async () => {
  //       expect.assertions(1);
  //       const asyncDestPath = path.join(testResultsPath, "unzip_async");
  //       await testSketchFile.unzip(asyncDestPath);
  //       expect("a").toBe("a");
  //     });
  //   });
});
