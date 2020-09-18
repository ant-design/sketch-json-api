import * as fse from "fs-extra";
import { curl } from "urllib";
import { v4 } from "uuid";
import { JSONPack, Page, Layer } from "../../src";

const downloadFile = async (url: string, dest: string): Promise<void> => {
  const file = fse.createWriteStream(dest);
  await curl(url, { writeStream: file });
};

(async () => {
  await downloadFile(
    "http://some-oss/url.json", // replace your url
    "/tmp/try.json"
  );

  const obj = await fse.readJSON("/tmp/try.json");

  const urllist: any[] = [];
  obj?.data?.forEach((d: any) => {
    d.blocks?.forEach((b: any) => {
      const filename = b.title || v4();
      const str = b.sketchData;
      if (str) {
        const info = JSON.parse(str);
        const url = info?.ossUrl;
        if (url) {
          urllist.push({ filename, url });
        }
      }
    });
  });

  console.log(urllist);

  await fse.ensureDir("/tmp/manysketchs");

  for (let i = 0; i < urllist.length; i++) {
    const { filename, url } = urllist[i];

    const jsonFilePath = `/tmp/manysketchs/${filename}.json`;
    await downloadFile(url, jsonFilePath);

    // generate sketch file

    const json = await fse.readJSON(jsonFilePath);

    const newLayer = new Layer({ class: "SymbolMaster", data: json });
    const newPage = new Page({ layers: [newLayer.toSketchJSON()] } as any);
    const newPack = new JSONPack({ pages: [newPage] } as any);

    const folderFilePath = `/tmp/manysketchs/${filename}`;
    await newPack.write(folderFilePath);
    await newPack.zip(`${folderFilePath}.sketch`);
  }
})();
