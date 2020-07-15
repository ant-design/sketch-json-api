import FileFormat from "@sketch-hq/sketch-file-format-ts";
import { CoordString } from "./utils";

export interface UserDocumentConfigs {
  pageListHeight: number;
  pageListCollapsed: FileFormat.NumericalBool;
  expandedSymbolPathsInSidebar?: [];
  expandedTextStylePathsInPopover?: [];
  libraryListCollapsed?: FileFormat.NumericalBool;
  componentSidebarTreeStructure?: FileFormat.NumericalBool;
}

export interface UserPageConfigs {
  scrollOrigin: CoordString;
  zoomValue?: number;
}

export type User = FileFormat.User;
