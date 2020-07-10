import FileFormat from "@sketch-hq/sketch-file-format-ts";

export type PageJSON = FileFormat.Page;

export type Artboard = FileFormat.Artboard;
export type SymbolMaster = FileFormat.SymbolMaster;
export type ArtboardLike = Artboard | SymbolMaster;
