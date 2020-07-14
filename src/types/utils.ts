import FileFormat from "@sketch-hq/sketch-file-format-ts";

export const tuple = <T extends string[]>(...args: T) => args;

export interface CoordString {
  x: number;
  y: number;
  pattern: "{x, y}";
}

export type Uuid = string;

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
  "SketchVariant"
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
