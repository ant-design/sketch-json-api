import * as path from "path";
import * as fse from "fs-extra";
import { JSONPack } from "../src";

const testResultsPath = "temp/tests/jsonpack";

const samplePackPath = "demo/files/SomeArtboards";

describe("JSONPack class", () => {
  let testPack;
  beforeAll(async () => {
    testPack = await JSONPack.fromPath(samplePackPath);
  });

  describe("getAllArtboards method works", () => {
    it("basic", async () => {
      const artboards = testPack.getAllArtboards();

      expect(
        artboards.map((artboard) => {
          return { name: artboard.name, class: artboard._class };
        })
      ).toStrictEqual([
        { name: "SomeSymbolMaster", class: "symbolMaster" },
        { name: "SomeArtboard", class: "artboard" },
      ]);
    });
  });

  describe("zip method works", () => {
    const zipTestResultsPath = path.join(testResultsPath, "zip");

    it("by cli", async () => {
      const cliDestPath = path.join(zipTestResultsPath, "by_cli.sketch");
      await testPack.zip(cliDestPath, { cli: true });
      expect(fse.pathExistsSync(cliDestPath)).toBe(true);
    });

    it("by node", async () => {
      const nodeDestPath = path.join(zipTestResultsPath, "by_node.sketch");
      await testPack.zip(nodeDestPath);
      expect(fse.pathExistsSync(nodeDestPath)).toBe(true);
    });
  });
});
