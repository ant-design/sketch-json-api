import { JSONPack } from "../src";

test("JSONPack", async () => {
  const samplePackPath = "demo/files/SomeArtboards";

  const pack = await JSONPack.fromPath(samplePackPath);

  const artboards = pack.getAllArtboards();

  expect(
    artboards.map((artboard) => {
      return { name: artboard.name, class: artboard._class };
    })
  ).toStrictEqual([
    { name: "SomeSymbolMaster", class: "symbolMaster" },
    { name: "SomeArtboard", class: "artboard" },
  ]);
});
