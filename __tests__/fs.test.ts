import * as fse from "fs-extra";
import * as path from "path";

import * as fsc from "../src/utils/fs";

test("fs", async () => {
  const samplePath = "temp/tests/some-dir-path";
  await fsc.resetPath(samplePath);
  const filePath1 = path.join(samplePath, "test1.txt");
  const filePath2 = path.join(samplePath, "test2.txt");

  await fse.writeFile(filePath1, "any content 1");
  await fse.writeFile(filePath2, "any content 2");

  let isFile1There = await fse.pathExists(filePath1);
  expect(isFile1There).toBe(true);

  await fsc.resetPath(filePath1);
  isFile1There = await fse.pathExists(filePath1);
  expect(isFile1There).toBe(false);

  let isFile2There = await fse.pathExists(filePath2);
  expect(isFile2There).toBe(true);

  await fsc.resetPath(samplePath);
  isFile2There = await fse.pathExists(filePath2);
  expect(isFile2There).toBe(false);
});
