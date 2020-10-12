import * as fs from "fs";
import * as fse from "fs-extra";

export function bitmap2base64Sync(file: string): string {
  const imageAsBase64Str = fs.readFileSync(file, "base64");
  return imageAsBase64Str;
}

export async function bitmap2base64(file: string): Promise<string> {
  const imageAsBase64Str = await fse.readFile(file, "base64");
  return imageAsBase64Str;
}
