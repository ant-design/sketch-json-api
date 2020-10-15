import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import { isObject } from "./types";

export function bitmap2base64Sync(file: string): string {
  const imageAsBase64Str = fs.readFileSync(file, "base64");
  return imageAsBase64Str;
}

export async function bitmap2base64(file: string): Promise<string> {
  const imageAsBase64Str = await fse.readFile(file, "base64");
  return imageAsBase64Str;
}

export function imageIsBitmap(imageJSON: any): boolean {
  return (
    imageJSON._ref_class === "MSImageData" &&
    imageJSON._class === "MSJSONFileReference" &&
    imageJSON._ref
  );
}

export interface ImageInfo {
  name: string;
  base64: string;
}

export async function findAllBitmapInSketchJSON(
  sketchJSON: any,
  rootPath: string
) {
  const store: ImageInfo[] = [];

  if (isObject(sketchJSON)) {
    for (const key in sketchJSON) {
      if (key === "image" && imageIsBitmap(sketchJSON["image"])) {
        const pat = path.join(rootPath, sketchJSON["image"]._ref);
        const base64 = await bitmap2base64(pat);
        const name = sketchJSON["image"]._ref.replace("images/", "");
        store.push({ name, base64 });
      } else if (isObject(sketchJSON[key]) || Array.isArray(sketchJSON[key])) {
        const more = await findAllBitmapInSketchJSON(sketchJSON[key], rootPath);
        store.push(...more);
      }
    }
  } else if (Array.isArray(sketchJSON)) {
    for (let i = 0; i < sketchJSON.length; i++) {
      const element = sketchJSON[i];
      const more = await findAllBitmapInSketchJSON(element, rootPath);
      store.push(...more);
    }
  }

  return store;
}
