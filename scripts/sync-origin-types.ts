import * as fs from "fs-extra";
import * as path from "path";

(async () => {
  const file = path.join(process.cwd(), "src/types/origin.ts");
  const data = await fs.readFile(file, { encoding: "utf8" });

  const lines = data.split("\n");

  let defLineIndex;
  let originTypesArrayStr;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "export const ORIGIN_TYPES = tuple(") {
      defLineIndex = i;
      originTypesArrayStr = "[";
    }

    if (defLineIndex && i > defLineIndex) {
      if (lines[i] === ");") {
        originTypesArrayStr += "]";
        break;
      } else {
        originTypesArrayStr += lines[i];
      }
    }
  }

  const originTypesArray = originTypesArrayStr
    ? JSON.parse(originTypesArrayStr).sort()
    : [];

  const fileContent = `// Formatted and synced by sync-origin-type
import FileFormat from "@sketch-hq/sketch-file-format-ts";
import { tuple } from "./utils";

export const ORIGIN_TYPES = tuple(
${originTypesArray.map((e: string) => `  "${e}"`).join(",\n")}
);
export type OriginTypes = typeof ORIGIN_TYPES[number];

${originTypesArray
  .map((e: string) => `export type ${e} = FileFormat.${e};`)
  .join("\n")}
`;

  console.log(fileContent);

  fs.writeFile(file, fileContent);
})();
