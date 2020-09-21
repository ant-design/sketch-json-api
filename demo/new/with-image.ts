import * as fse from "fs-extra";
import { get as _get, set as _set } from "lodash";
import { v4 } from "uuid";
import { JSONPack, Page, Layer } from "../../src";

const datajson = {
  imageList: [
    "layers[2].layers[0].layers[1].layers[1].image",
    "layers[2].layers[2].layers[1].layers[1].image",
    "layers[2].layers[4].layers[1].layers[1].image",
  ],
  data: {
    _class: "symbolMaster",
    // ...SketchJSON 
    isVisible: true,
  },
};

const json = datajson.data;
const list = datajson.imageList;

const folderFilePath = `/tmp/justtryone`;
const sketchFilePath = `${folderFilePath}.sketch`;

(async () => {
  const filelist: { name: string; data: string }[] = [];
  for (let i = 0; i < list.length; i++) {
    const whereWeHaveImage = list[i];
    const imageJson = _get(json, whereWeHaveImage);

    const base64Image = imageJson.data?._data;
    const filename = `${v4()}.png`;

    // modify json

    const newImageJson = {
      _class: "MSJSONFileReference",
      _ref_class: "MSImageData",
      _ref: `images/${filename}`,
    };

    _set(json, whereWeHaveImage, newImageJson);
    filelist.push({ name: filename, data: base64Image });
  }

  // generate Sketch JSON pack

  const newLayer = new Layer({ class: "SymbolMaster", data: json });
  const newPage = new Page({ layers: [newLayer.toSketchJSON()] } as any);
  const newPack = new JSONPack({ pages: [newPage] } as any);

  await newPack.write(folderFilePath);

  // after writing pack, insert images

  await fse.ensureDir(`${folderFilePath}/images/`);

  for (let i = 0; i < filelist.length; i++) {
    const { name, data } = filelist[i];

    await fse.writeFile(`${folderFilePath}/images/${name}`, data, {
      encoding: "base64",
    });
  }

  // zip the .sketch file

  await newPack.zip(sketchFilePath);
})();
