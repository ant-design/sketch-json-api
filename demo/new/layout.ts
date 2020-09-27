import * as path from "path";
import { JSONPack, Page, Layer } from "../../src";

const targetPath = "temp/new/layout";
const newPackPath = path.join(targetPath, "layout");

(async () => {
  try {
    const layers = [];
    for (let i = 0; i < 100; i++) {
      const newLayer = new Layer();
      newLayer.updateProps({
        data: {
          name: `layer ${i}`,
          frame: {
            _class: "rect",
            constrainProportions: false,
            height: Math.floor(Math.random() * Math.floor(700)),
            width: Math.floor(Math.random() * Math.floor(400)),
            x: Math.floor(Math.random() * Math.floor(50)),
            y: Math.floor(Math.random() * Math.floor(50)),
          },
        },
      } as any);

      layers.push(newLayer.toSketchJSON());
    }

    const newPage = new Page({ layers } as any);
    newPage.reLayoutLayers();

    const newPack = new JSONPack({ pages: [newPage] } as any);

    await newPack.write(newPackPath);
    await newPack.zip(path.join(path.dirname(newPackPath), "layout.sketch"));
  } catch (error) {
    throw error;
  }
})();
