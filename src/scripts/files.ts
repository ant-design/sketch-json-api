import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";

import { writeFileSyncP } from "../utils";
import { UserJSON } from "../structures/user";
import { MetaJSON } from "../structures/meta";
import { DocumentJSON } from "../structures/document";
import { PageJSON } from "../structures/page";

export function newJSONPack(packPath: string) {
  const userJSON = new UserJSON();
  const metaJSON = new MetaJSON();
  const documentJSON = new DocumentJSON();
  const pageJSON = new PageJSON();

  writeFileSyncP(
    path.join(packPath, "user.json"),
    JSON.stringify(userJSON.toSketchJSON())
  );
  writeFileSyncP(
    path.join(packPath, "meta.json"),
    JSON.stringify(metaJSON.toSketchJSON())
  );
  writeFileSyncP(
    path.join(packPath, "document.json"),
    JSON.stringify(documentJSON.toSketchJSON())
  );

  writeFileSyncP(
    path.join(packPath, `pages/${pageJSON.getPageId()}.json`),
    JSON.stringify(pageJSON.toSketchJSON())
  );
}

export function unzipSketch(sketchPath: string, packPath: string) {
  if (!fs.existsSync(sketchPath)) {
    throw Error("sketch file not found!");
  }

  if (!fs.existsSync(packPath)) {
    fs.mkdirSync(packPath, { recursive: true });
  }

  exec(`unzip ${sketchPath} -d ${packPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  });
}

export function zipJSONPack(packPath: string, sketchPath: string) {
  if (!fs.existsSync(packPath)) {
    throw Error("sketch json pack not found!");
  }

  if (!fs.existsSync(path.dirname(sketchPath))) {
    fs.mkdirSync(path.dirname(sketchPath), { recursive: true });
  }

  exec(
    `zip -r -X ${path.join(
      process.cwd(),
      path.dirname(sketchPath),
      path.basename(sketchPath)
    )} *`,
    { cwd: packPath },
    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    }
  );
}
