import * as fs from "fs";
import * as fse from "fs-extra";
import * as pat from "path";

export function writeFileSyncP(
  path: string,
  data: string | NodeJS.ArrayBufferView,
  options?: fs.WriteFileOptions
) {
  const dirname = pat.dirname(path);

  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }

  if (fs.existsSync(dirname)) {
    fs.writeFileSync(path, data, options);
  } else {
    throw Error("can not find path!");
  }
}

/**
 * Test whether or not the given directory or file exists. For files, remove it. For dirctories, remove it recursively and then ensure it again.
 */
export async function resetPath(path: string) {
  try {
    const pathExists = await fse.pathExists(path);
    if (pathExists) {
      await fse.remove(path);
    }

    if (isPathLikeDir(path)) {
      await fse.ensureDir(path);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Check whether a path string is like a directory or not (more like a file).
 */
export function isPathLikeDir(path: string) {
  const obj = pat.parse(path);
  return !obj.ext || obj.ext === "";
}
