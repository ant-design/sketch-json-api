import { JSONPack, Layer, Page, SketchFile, SketchType } from "../../src";

const DEMO_SOURCE_FILE = "demo/files/LayerSymbolArtboard.sketch";
const DEMO_PATH = "temp/artboard/artboard2symbol";

(async () => {
  const originSketch = new SketchFile(DEMO_SOURCE_FILE);
  const originFilePath = `${DEMO_PATH}/origin`;
  await originSketch.unzip(originFilePath);

  if (!JSONPack.isValidStructure(originFilePath)) return;

  const originPack = await JSONPack.fromPath(originFilePath);

  const allArtboardLikes = originPack.getAllArtboards();

  const newLayers = allArtboardLikes.map((layer) => {
    if (layer._class === "artboard") {
      const outerSymbol = new Layer({ class: "SymbolMaster", data: null });
      outerSymbol.updateProps({
        data: {
          name: layer.name,
          frame: layer.frame,
          layers: layer.layers,
        } as SketchType.SymbolMaster,
      });
      return outerSymbol.toSketchJSON();
    }

    return layer;
  });

  const newPage = new Page({ layers: newLayers } as any);
  const newPack = new JSONPack({ pages: [newPage] } as any);

  await newPack.write(`${DEMO_PATH}/files`);
  await newPack.zip(`${DEMO_PATH}/result.sketch`);
})();
