import FileFormat from "@sketch-hq/sketch-file-format-ts";
import { CoordString, Uuid } from "./utils";

export interface UserJSON {
  document: UserJSON_Document;
  [key: string]: any;
}

export interface UserJSON_Document {
  pageListHeight: number;
  pageListCollapsed: FileFormat.NumericalBool;
  expandedSymbolPathsInSidebar?: [];
  expandedTextStylePathsInPopover?: [];
  libraryListCollapsed?: FileFormat.NumericalBool;
  componentSidebarTreeStructure?: FileFormat.NumericalBool;
}

export interface UserJSON_PageConfig {
  pageId: Uuid;
  scrollOrigin: CoordString;
  zoomValue?: number;
}
