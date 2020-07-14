import FileFormat from "@sketch-hq/sketch-file-format-ts";
import { tuple } from "./utils";

export type PageJSON = FileFormat.Page;

export type Artboard = FileFormat.Artboard;
export type SymbolMaster = FileFormat.SymbolMaster;
export type ArtboardLike = Artboard | SymbolMaster;

export type Layer = FileFormat.AnyLayer;

export const LAYER_CLASS_OPTIONS = tuple(
  "Artboard",
  "Group",
  "Oval",
  "Polygon",
  "Rectangle",
  "ShapePath",
  "Star",
  "Triangle",
  "ShapeGroup",
  "Text",
  "SymbolMaster",
  "SymbolInstance",
  "Slice",
  "Hotspot",
  "Bitmap"
);
export type LayerClass = typeof LAYER_CLASS_OPTIONS[number];
