import FileFormat from "@sketch-hq/sketch-file-format-ts";
import { tuple } from "./utils";
import {
  Artboard,
  Group,
  Oval,
  Polygon,
  Rectangle,
  ShapePath,
  Star,
  Triangle,
  ShapeGroup,
  Text,
  SymbolMaster,
  SymbolInstance,
  Slice,
  Hotspot,
  Bitmap,
} from "./origin";

export type Page = FileFormat.Page;

export type ArtboardLike = Artboard | SymbolMaster;

// Layer = AnyLayer - 'Page'
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
export type Layer =
  | Artboard
  | Group
  | Oval
  | Polygon
  | Rectangle
  | ShapePath
  | Star
  | Triangle
  | ShapeGroup
  | Text
  | SymbolMaster
  | SymbolInstance
  | Slice
  | Hotspot
  | Bitmap;
