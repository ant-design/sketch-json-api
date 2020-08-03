import * as fs from "fs";
import * as fse from "fs-extra";
import * as fsc from "../utils/fs-custom";
import * as path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { zip } from "compressing";

import { User } from "./User";
import { Meta } from "./Meta";
import { Document } from "./Document";
import { Page } from "./Page";
import SketchType, { JSONPackComponent } from "../types";

const STRUCTURE: Record<
  JSONPackComponent,
  { fileOrDir: "file" | "dir"; path: string }
> = {
  user: {
    fileOrDir: "file",
    path: "user.json",
  },
  meta: {
    fileOrDir: "file",
    path: "meta.json",
  },
  document: {
    fileOrDir: "file",
    path: "document.json",
  },
  pages: {
    fileOrDir: "dir",
    path: "pages",
  },
};

export type JSONPackConstructorOptions = {
  user: User;
  meta: Meta;
  document: Document;
  pages: Page[];
  path?: string;
};

export interface ZipOpts {
  cli?: boolean;
}

export class JSONPack {
  user: User;
  meta: Meta;
  document: Document;
  pages: Page[];
  path?: string;

  constructor();
  constructor(options: JSONPackConstructorOptions);
  constructor(options?: any) {
    this.path = (options && options.path) || null;
    this.user = (options && options.user) || new User();

    // at least one page
    let atLeastOnePage;
    if (options && options.pages && options.pages.length) {
      this.pages = options.pages;
    } else {
      atLeastOnePage = new Page();
      this.pages = [atLeastOnePage];
    }

    if (options && options.meta) {
      this.meta = options.meta;
    } else {
      this.meta = new Meta(undefined, this.pages);
    }

    if (options && options.document) {
      this.document = options.document;
    } else {
      this.document = new Document(undefined, this.pages);
    }
  }

  static fromPathSync(packPath: string): JSONPack {
    if (!JSONPack.isValidStructure(packPath)) {
      throw Error("Invalid structure of path.");
    }

    const user = User.fromPath(path.join(packPath, "user.json"));
    const meta = Meta.fromPath(path.join(packPath, "meta.json"));
    const document = Document.fromPath(path.join(packPath, "document.json"));
    const pages = fs
      .readdirSync(path.join(packPath, "pages"))
      .map((pagePath) => Page.fromPath(path.join(packPath, "pages", pagePath)));

    return new this({
      user,
      meta,
      document,
      pages,
      path: packPath,
    });
  }

  static fromPath(packPath: string): Promise<JSONPack> {
    return new Promise((resolve, reject) => {
      if (!JSONPack.isValidStructure(packPath)) {
        reject("Invalid structure of path.");
      }

      const user = User.fromPath(path.join(packPath, "user.json"));
      const meta = Meta.fromPath(path.join(packPath, "meta.json"));
      const document = Document.fromPath(path.join(packPath, "document.json"));
      const pages = fs
        .readdirSync(path.join(packPath, "pages"))
        .map((pagePath) =>
          Page.fromPath(path.join(packPath, "pages", pagePath))
        );

      const pack = new this({
        user,
        meta,
        document,
        pages,
        path: packPath,
      });

      resolve(pack);
    });
  }

  getPages() {
    return this.pages;
  }

  setPath(path: string) {
    this.path = path;
  }

  async write(packPath: string): Promise<void> {
    this.path = packPath;
    await fsc.resetPath(this.path);

    const userPromise = fsc.writeFile(
      path.join(packPath, "user.json"),
      JSON.stringify(this.user.toSketchJSON())
    );
    const metaPromise = fsc.writeFile(
      path.join(packPath, "meta.json"),
      JSON.stringify(this.meta.toSketchJSON())
    );
    const documentPromise = fsc.writeFile(
      path.join(packPath, "document.json"),
      JSON.stringify(this.document.toSketchJSON())
    );

    const pagePromises = this.pages.map((page) => {
      return fsc.writeFile(
        path.join(packPath, `pages/${page.getPageId()}.json`),
        JSON.stringify(page.toSketchJSON())
      );
    });

    const allPromises = [
      userPromise,
      metaPromise,
      documentPromise,
      ...pagePromises,
    ];

    return new Promise((resolve, reject) => {
      Promise.all(allPromises)
        .then(() => {
          resolve();
        })
        .catch((err) => reject(err));
    });
  }

  writeSync(packPath: string) {
    this.path = packPath;
    fsc.resetPathSync(this.path);

    fsc.writeFileSync(
      path.join(packPath, "user.json"),
      JSON.stringify(this.user.toSketchJSON())
    );
    fsc.writeFileSync(
      path.join(packPath, "meta.json"),
      JSON.stringify(this.meta.toSketchJSON())
    );
    fsc.writeFileSync(
      path.join(packPath, "document.json"),
      JSON.stringify(this.document.toSketchJSON())
    );

    this.pages.forEach((page) => {
      fsc.writeFileSync(
        path.join(packPath, `pages/${page.getPageId()}.json`),
        JSON.stringify(page.toSketchJSON())
      );
    });
  }

  static isValidStructure(packPath: string): boolean {
    if (packPath && fs.existsSync(packPath)) {
      const keys = Object.keys(STRUCTURE) as JSONPackComponent[];
      keys.forEach((key) => {
        const value = STRUCTURE[key];
        const componentPath = path.join(packPath, value.path);
        if (value.fileOrDir === "file" && !fs.existsSync(componentPath)) {
          return false;
        }
        if (value.fileOrDir === "dir") {
          if (
            !fs.existsSync(componentPath) ||
            !fs.readdirSync(componentPath)?.length
          ) {
            return false;
          }
        }
      });

      return true;
    }

    return false;
  }

  async zip(sketchPath: string, options?: ZipOpts): Promise<void> {
    if (!this.path) {
      throw Error(
        "Please firstly write() once or set the path for this JSON pack."
      );
    }

    if (!JSONPack.isValidStructure(this.path)) {
      await this.write(this.path);
    }

    // check again
    if (!JSONPack.isValidStructure(this.path)) {
      throw Error(`The structure of this JSON pack is invalid! ${sketchPath}`);
    }

    fse.ensureDir(path.dirname(sketchPath));

    if (options?.cli) {
      await promisify(exec)(
        `zip -r -X ${path.resolve(process.cwd(), sketchPath)} *`,
        { cwd: this.path }
      );
    } else {
      await zip.compressDir(this.path, sketchPath);
    }
  }

  getAllArtboards(): SketchType.ArtboardLike[] {
    const allArtboards: SketchType.ArtboardLike[] = [];
    this.pages.forEach((page) => {
      page.artboards().forEach((artboard) => {
        allArtboards.push(artboard);
      });
    });
    return allArtboards;
  }
}
