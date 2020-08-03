import * as path from "path";
import { SketchFile, JSONPack } from "../src";

const testResultsPath = "temp/tests/sketchfile";

const testSketchFilePath = "demo/files/SimpleButton.sketch";
const testSketchFile = new SketchFile(testSketchFilePath);

describe("SketchFile class", () => {
  describe("unzip method works", () => {
    const unzipTestResultsPath = path.join(testResultsPath, "unzip");

    it("by cli", async () => {
      const cliDestPath = path.join(unzipTestResultsPath, "by_cli");
      await testSketchFile.unzip(cliDestPath, { cli: true });
      expect(JSONPack.isValidStructure(cliDestPath)).toBe(true);
    });

    it("by node", async () => {
      const nodeDestPath = path.join(unzipTestResultsPath, "by_node");
      await testSketchFile.unzip(nodeDestPath);
      expect(JSONPack.isValidStructure(nodeDestPath)).toBe(true);
    });
  });
});
