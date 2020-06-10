import SketchType from "../types";

export function labelSymbolMaster(
  symbolMaster: SketchType.SymbolMaster,
  labelObject: Record<string, any>
): SketchType.SymbolMaster {
  symbolMaster.userInfo = labelObject;
  return symbolMaster;
}

export * from "./fs";
