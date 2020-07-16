// Formatted and synced by sync-origin-type
import FileFormat from "@sketch-hq/sketch-file-format-ts";
import { tuple } from "./utils";

export const ORIGIN_TYPES = tuple(
  "AnyLayer",
  "Artboard",
  "AssetCollection",
  "Bitmap",
  "BooleanOperation",
  "Border",
  "BorderOptions",
  "BundleId",
  "Color",
  "ColorControls",
  "ColorSpace",
  "ExportOptions",
  "FileRef",
  "Fill",
  "ForeignLayerStyle",
  "ForeignSymbol",
  "ForeignTextStyle",
  "GraphicsContextSettings",
  "Group",
  "Hotspot",
  "InnerShadow",
  "LayerListExpanded",
  "MarkerType",
  "NumericalBool",
  "Oval",
  "ParagraphStyle",
  "Polygon",
  "Rect",
  "Rectangle",
  "ResizeType",
  "RulerData",
  "Shadow",
  "ShapeGroup",
  "ShapePath",
  "SharedStyleContainer",
  "SharedTextStyleContainer",
  "SketchVariant",
  "Slice",
  "Star",
  "Style",
  "SymbolInstance",
  "SymbolMaster",
  "Text",
  "TextStyle",
  "Triangle"
);
export type OriginTypes = typeof ORIGIN_TYPES[number];

export type AnyLayer = FileFormat.AnyLayer;
export type Artboard = FileFormat.Artboard;
export type AssetCollection = FileFormat.AssetCollection;
export type Bitmap = FileFormat.Bitmap;
export type BooleanOperation = FileFormat.BooleanOperation;
export type Border = FileFormat.Border;
export type BorderOptions = FileFormat.BorderOptions;
export type BundleId = FileFormat.BundleId;
export type Color = FileFormat.Color;
export type ColorControls = FileFormat.ColorControls;
export type ColorSpace = FileFormat.ColorSpace;
export type ExportOptions = FileFormat.ExportOptions;
export type FileRef = FileFormat.FileRef;
export type Fill = FileFormat.Fill;
export type ForeignLayerStyle = FileFormat.ForeignLayerStyle;
export type ForeignSymbol = FileFormat.ForeignSymbol;
export type ForeignTextStyle = FileFormat.ForeignTextStyle;
export type GraphicsContextSettings = FileFormat.GraphicsContextSettings;
export type Group = FileFormat.Group;
export type Hotspot = FileFormat.Hotspot;
export type InnerShadow = FileFormat.InnerShadow;
export type LayerListExpanded = FileFormat.LayerListExpanded;
export type MarkerType = FileFormat.MarkerType;
export type NumericalBool = FileFormat.NumericalBool;
export type Oval = FileFormat.Oval;
export type ParagraphStyle = FileFormat.ParagraphStyle;
export type Polygon = FileFormat.Polygon;
export type Rect = FileFormat.Rect;
export type Rectangle = FileFormat.Rectangle;
export type ResizeType = FileFormat.ResizeType;
export type RulerData = FileFormat.RulerData;
export type Shadow = FileFormat.Shadow;
export type ShapeGroup = FileFormat.ShapeGroup;
export type ShapePath = FileFormat.ShapePath;
export type SharedStyleContainer = FileFormat.SharedStyleContainer;
export type SharedTextStyleContainer = FileFormat.SharedTextStyleContainer;
export type SketchVariant = FileFormat.SketchVariant;
export type Slice = FileFormat.Slice;
export type Star = FileFormat.Star;
export type Style = FileFormat.Style;
export type SymbolInstance = FileFormat.SymbolInstance;
export type SymbolMaster = FileFormat.SymbolMaster;
export type Text = FileFormat.Text;
export type TextStyle = FileFormat.TextStyle;
export type Triangle = FileFormat.Triangle;
