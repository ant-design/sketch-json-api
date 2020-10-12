export * as FileFormat from "@sketch-hq/sketch-file-format-ts";

export * from "./utils";
export * from "./origin";
export * from "./user";
export * from "./meta";
export * from "./document";
export * from "./page";

export type JSONPackComponent =
  | "user"
  | "meta"
  | "document"
  | "pages"
  | "images";

import * as SketchType from ".";
export default SketchType;
