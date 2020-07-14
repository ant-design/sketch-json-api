import * as fs from "fs";
import { exec } from "child_process";

export class SketchFile {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  unzipSync(packPath: string): boolean {
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

  unzip(packPath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.path)) {
        const error = "sketch file not found!";
        console.warn(error);
        reject(error);
      }

      if (!fs.existsSync(packPath)) {
        fs.mkdirSync(packPath, { recursive: true });
      }

      exec(`unzip -o ${this.path} -d ${packPath}`, (error, stdout) => {
        if (error) {
          console.warn(error);
          reject(error);
        }

        resolve(stdout ? true : false);
      });
    });
  }
}
