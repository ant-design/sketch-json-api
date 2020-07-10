import FileFormat from "@sketch-hq/sketch-file-format-ts";

export interface CoordString {
  x: number;
  y: number;
  pattern: "{x, y}";
}

export type Uuid = string;

export type PageId = Uuid;
