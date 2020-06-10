import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";

import { User } from "./User";
import { Meta } from "./Meta";
import { Document } from "./Document";
import { Page } from "./Page";
import { writeFileSyncP } from "../utils";
import { JSONPackComponent } from "../types";

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

export class JSONPack {
  user: User;
  meta: Meta;
  document: Document;
  pages: Page[];
  path?: string;

  constructor();
  constructor(options: JSONPackConstructorOptions);
  constructor(options?: any) {
    this.user = (options && options.user) || new User();
    this.meta = (options && options.meta) || new Meta();
    this.document = (options && options.document) || new Document();
    this.pages = (options && options.pages) || [new Page()];
    this.path = (options && options.path) || null;
  }

  static fromPath(packPath: string): JSONPack {
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

  setPath(path: string) {
    this.path = path;
  }

  write(packPath: string) {
    writeFileSyncP(
      path.join(packPath, "user.json"),
      JSON.stringify(this.user.toSketchJSON())
    );
    writeFileSyncP(
      path.join(packPath, "meta.json"),
      JSON.stringify(this.meta.toSketchJSON())
    );
    writeFileSyncP(
      path.join(packPath, "document.json"),
      JSON.stringify(this.document.toSketchJSON())
    );

    this.pages.forEach((page) => {
      writeFileSyncP(
        path.join(packPath, `pages/${page.getPageId()}.json`),
        JSON.stringify(page.toSketchJSON())
      );
    });

    if (fs.existsSync(packPath)) {
      this.setPath(packPath);
    }
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

  zip(sketchPath: string) {
    if (!this.path) {
      throw Error(
        "Please firstly write() once or set the path for this JSON pack."
      );
    }

    if (!JSONPack.isValidStructure(this.path)) {
      this.write(this.path);
    }

    // check again
    if (!JSONPack.isValidStructure(this.path)) {
      throw Error(`The structure of this JSON pack is invalid! ${sketchPath}`);
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
      { cwd: this.path },
      (err, error) => {
        if (err) {
          console.error(err);
        }
        if (error) {
          console.error(error);
        }
      }
    );
  }
}
