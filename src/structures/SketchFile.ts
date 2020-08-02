import * as fs from "fs";
import * as fse from "fs-extra";
import { exec } from "child_process";
import { Extract } from "unzipper";
import { promisify } from "util";

export class SketchFile {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  unzipSync(packPath: string, cli?: boolean) {
    try {
      if (!fs.existsSync(this.path)) {
        throw Error("sketch file not found!");
      }

      if (!fs.existsSync(packPath)) {
        fs.mkdirSync(packPath, { recursive: true });
      }

      if (cli) {
        exec(`unzip ${this.path} -d ${packPath}`, (err) => {
          if (err) {
            console.error(err);
            return false;
          }
        });
      } else {
        fs.createReadStream(this.path).pipe(Extract({ path: packPath }));
      }
    } catch (error) {
      throw error;
    }
  }

  async unzip(packPath: string, cli?: boolean): Promise<void> {
    const fileExists = await fse.pathExists(this.path);
    if (!fileExists) {
      throw new Error("sketch file not found!");
    }

    fse.ensureDir(packPath);

    if (cli) {
      const execAsync = promisify(exec);
      await execAsync(`unzip -o ${this.path} -d ${packPath}`);
    } else {
      await fse
        .createReadStream(this.path)
        .pipe(Extract({ path: packPath }))
        .promise();
    }
  }
}
