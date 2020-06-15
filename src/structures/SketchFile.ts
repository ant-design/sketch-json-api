import * as fs from "fs";
import { exec } from "child_process";

export class SketchFile {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  unzip(packPath: string): boolean {
    if (!fs.existsSync(this.path)) {
      throw Error("sketch file not found!");
    }

    if (!fs.existsSync(packPath)) {
      fs.mkdirSync(packPath, { recursive: true });
    }

    exec(`unzip ${this.path} -d ${packPath}`, (err) => {
      if (err) {
        console.error(err);
        return false;
      }
    });

    return true;
  }
}
