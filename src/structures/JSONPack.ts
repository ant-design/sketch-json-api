import * as fs from "fs";
import * as fse from "fs-extra";
import * as fsc from "../utils/fs-custom";
import * as path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { zip } from "compressing";
import { pipeline } from "stream";

import { User } from "./User";
import { Meta } from "./Meta";
import { Document } from "./Document";
import { Page } from "./Page";
import SketchType, { JSONPackComponent } from "../types";

import { bitmap2base64Sync } from "../utils/image";

const pipe = promisify(pipeline);

const STRUCTURE: Record<
  JSONPackComponent,
  { fileOrDir: "file" | "dir"; path: string; required: boolean }
> = {
  user: {
    fileOrDir: "file",
    path: "user.json",
    required: true,
  },
  meta: {
    fileOrDir: "file",
    path: "meta.json",
    required: true,
  },
  document: {
    fileOrDir: "file",
    path: "document.json",
    required: true,
  },
  pages: {
    fileOrDir: "dir",
    path: "pages",
    required: true,
  },
  images: {
    fileOrDir: "dir",
    path: "images",
    required: false,
  },
};

export type Image = {
  fileName: string;
  path?: string;
  base64: string;
};

export type JSONPackConstructorOptions = {
  user: User;
  meta: Meta;
  document: Document;
  pages: Page[];
  images?: Image[];
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
  images?: Image[];
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

    if (options?.images) {
      this.images = options.images;
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

    const args: JSONPackConstructorOptions = {
      user,
      meta,
      document,
      pages,
      path: packPath,
    };

    // maybe images
    if (fs.existsSync(path.join(packPath, "images"))) {
      const imageFileNames = fs.readdirSync(path.join(packPath, "images"));
      if (imageFileNames?.length) {
        const base64Images: Image[] = imageFileNames.map((fileName) => {
          const pat = path.join(packPath, "images", fileName);
          const base64Str = bitmap2base64Sync(pat);
          return {
            fileName,
            base64: base64Str,
          };
        });

        args.images = base64Images;
      }
    }

    return new this(args);
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

      const args: JSONPackConstructorOptions = {
        user,
        meta,
        document,
        pages,
        path: packPath,
      };

      // maybe images
      if (fs.existsSync(path.join(packPath, "images"))) {
        const imageFileNames = fs.readdirSync(path.join(packPath, "images"));
        if (imageFileNames?.length) {
          const base64Images: Image[] = imageFileNames.map((fileName) => {
            const pat = path.join(packPath, "images", fileName);
            const base64Str = bitmap2base64Sync(pat);
            return {
              fileName,
              base64: base64Str,
            };
          });

          args.images = base64Images;
        }
      }

      const pack = new this(args);

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

    if (this.images) {
      const imagesPromises = this.images.map((image) => {
        image.path = path.join(packPath, "images", image.fileName);
        return fsc.writeFile(image.path, image.base64, { encoding: "base64" });
      });

      allPromises.push(...imagesPromises);
    }

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

    if (this.images) {
      this.images.forEach((image) => {
        image.path = path.join(packPath, "images", image.fileName);
        fsc.writeFileSync(image.path, image.base64, { encoding: "base64" });
      });
    }
  }

  static isValidStructure(packPath: string): boolean {
    if (packPath && fs.existsSync(packPath)) {
      const keys = Object.keys(STRUCTURE) as JSONPackComponent[];
      keys.forEach((key) => {
        const value = STRUCTURE[key];
        const componentPath = path.join(packPath, value.path);
        if (value.required) {
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
      const zipStream = new zip.Stream();
      const files = await fse.readdir(this.path);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        zipStream.addEntry(path.join(this.path, file));
      }
      const destStream = fse.createWriteStream(sketchPath);
      await pipe(zipStream, destStream);
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
