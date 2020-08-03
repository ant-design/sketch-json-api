import * as fse from "fs-extra";
import { exec } from "child_process";
import { promisify } from "util";
import { zip } from "compressing";

export interface UnzipOpts {
  cli?: boolean;
}

export class SketchFile {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  async unzip(packPath: string, options?: UnzipOpts): Promise<void> {
    const fileExists = await fse.pathExists(this.path);
    if (!fileExists) {
      throw new Error("sketch file not found!");
    }

    fse.ensureDir(packPath);

    if (options?.cli) {
      const execAsync = promisify(exec);
      await execAsync(`unzip -o ${this.path} -d ${packPath}`);
    } else {
      await zip.uncompress(this.path, packPath);
    }
  }
}
