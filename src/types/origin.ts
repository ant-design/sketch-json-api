import FileFormat from "@sketch-hq/sketch-file-format-ts";
import { tuple } from "./utils";

export const ORIGIN_TYPES = tuple(
  "Rect",
  "Style",
  "MarkerType",
  "Border",
  "Fill",
  "Shadow",
  "TextStyle",
  "GraphicsContextSettings",
  "BorderOptions",
  "InnerShadow",
  "ColorControls",
  "Color",
  "ParagraphStyle",
  "ExportOptions",
  "RulerData",
  "BundleId",
  "NumericalBool",
  "SketchVariant",
  "Artboard",
  "SymbolMaster",
  "AnyLayer",
  "BooleanOperation",
  "ExportOptions",
  "LayerListExpanded",
  "ResizeType",
  "Group",
  "Oval",
  "Polygon",
  "Rectangle",
  "ShapePath",
  "Star",
  "Triangle",
  "ShapeGroup",
  "Text",
  "SymbolInstance",
  "Slice",
  "Hotspot",
  "Bitmap",
  "AssetCollection",
  "ColorSpace",
  "ForeignLayerStyle",
  "ForeignSymbol",
  "ForeignTextStyle",
  "SharedStyleContainer",
  "SharedTextStyleContainer",
  "FileRef"
);
export type OriginTypes = typeof ORIGIN_TYPES[number];

export type Rect = FileFormat.Rect;
export type Style = FileFormat.Style;
export type MarkerType = FileFormat.MarkerType;
export type Border = FileFormat.Border;
export type Fill = FileFormat.Fill;
export type Shadow = FileFormat.Shadow;
export type TextStyle = FileFormat.TextStyle;
export type GraphicsContextSettings = FileFormat.GraphicsContextSettings;
export type BorderOptions = FileFormat.BorderOptions;
export type InnerShadow = FileFormat.InnerShadow;
export type ColorControls = FileFormat.ColorControls;
export type BundleId = FileFormat.BundleId;
export type NumericalBool = FileFormat.NumericalBool;
export type SketchVariant = FileFormat.SketchVariant;
export type Artboard = FileFormat.Artboard;
export type SymbolMaster = FileFormat.SymbolMaster;
export type AnyLayer = FileFormat.AnyLayer;
export type BooleanOperation = FileFormat.BooleanOperation;
export type RulerData = FileFormat.RulerData;
export type ExportOptions = FileFormat.ExportOptions;
export type LayerListExpanded = FileFormat.LayerListExpanded;
export type ResizeType = FileFormat.ResizeType;
export type Group = FileFormat.Group;
export type Oval = FileFormat.Oval;
export type Polygon = FileFormat.Polygon;
export type Rectangle = FileFormat.Rectangle;
export type ShapePath = FileFormat.ShapePath;
export type Star = FileFormat.Star;
export type Triangle = FileFormat.Triangle;
export type ShapeGroup = FileFormat.ShapeGroup;
export type Text = FileFormat.Text;
export type SymbolInstance = FileFormat.SymbolInstance;
export type Slice = FileFormat.Slice;
export type Hotspot = FileFormat.Hotspot;
export type Bitmap = FileFormat.Bitmap;
export type AssetCollection = FileFormat.AssetCollection;
export type ColorSpace = FileFormat.ColorSpace;
export type ForeignLayerStyle = FileFormat.ForeignLayerStyle;
export type ForeignSymbol = FileFormat.ForeignSymbol;
export type ForeignTextStyle = FileFormat.ForeignTextStyle;
export type SharedStyleContainer = FileFormat.SharedStyleContainer;
export type SharedTextStyleContainer = FileFormat.SharedTextStyleContainer;
export type FileRef = FileFormat.FileRef;
