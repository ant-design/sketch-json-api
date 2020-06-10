import * as fs from "fs";
import * as path from "path";

const getDirName = path.dirname;

export function writeFileSyncP(
  path: string,
  data: string | NodeJS.ArrayBufferView,
  options?: fs.WriteFileOptions
) {
  const dirname = getDirName(path);

  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }

  if (fs.existsSync(dirname)) {
    fs.writeFileSync(path, data, options);
  } else {
    throw Error("can not find path!");
  }
}
