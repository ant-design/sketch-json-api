import * as fs from "fs";
import * as fse from "fs-extra";
import * as pat from "path";

/**
 * Custom verson of `fs.writeFileSync`, reset the path first.
 */
export function writeFileSync(
  path: string,
  data: string,
  options?: fs.WriteFileOptions
) {
  resetPathSync(path);
  fs.writeFileSync(path, data, options);
}

/**
 * Custom verson of `fse.writeFile`, reset the path first.
 */
export async function writeFile(
  path: string,
  data: string,
  options?: fse.WriteFileOptions
) {
  try {
    await resetPath(path);
    await fse.writeFile(path, data, options);
  } catch (error) {
    console.log(error);
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
    } else {
      await fse.ensureDir(pat.dirname(path));
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Test whether or not the given directory or file exists. For files, remove it. For dirctories, remove it recursively and then ensure it again.
 */
export function resetPathSync(path: string) {
  const pathExists = fse.existsSync(path);
  if (pathExists) {
    fse.removeSync(path);
  }

  if (isPathLikeDir(path)) {
    fse.ensureDirSync(path);
  } else {
    fse.ensureDirSync(pat.dirname(path));
  }
}

/**
 * Check whether a path string is like a directory or not (more like a file).
 */
export function isPathLikeDir(path: string) {
  const obj = pat.parse(path);
  return !obj.ext || obj.ext === "";
}
