import { JSONPack, Layer, Page, SketchFile, SketchType } from "../../src";

const DEMO_SOURCE_FILE = "demo/files/LayerSymbolArtboard.sketch";
const DEMO_PATH = "temp/artboard/symbol2artboard";

(async () => {
  const originSketch = new SketchFile(DEMO_SOURCE_FILE);
  const originFilePath = `${DEMO_PATH}/origin`;
  await originSketch.unzip(originFilePath);

  if (!JSONPack.isValidStructure(originFilePath)) return;

  const originPack = await JSONPack.fromPath(originFilePath);

  const allArtboardLikes = originPack.getAllArtboards();

  const newLayers = allArtboardLikes.map((layer) => {
    if (layer._class === "symbolMaster") {
      const outerArtboard = new Layer({ class: "Artboard", data: null });
      outerArtboard.updateProps({
        data: {
          name: layer.name,
          frame: layer.frame,
          layers: layer.layers,
        } as SketchType.Artboard,
      });
      return outerArtboard.toSketchJSON();
    }

    return layer;
  });

  const newPage = new Page({ layers: newLayers } as any);
  const newPack = new JSONPack({ pages: [newPage] } as any);

  await newPack.write(`${DEMO_PATH}/files`);
  await newPack.zip(`${DEMO_PATH}/result.sketch`);
})();
