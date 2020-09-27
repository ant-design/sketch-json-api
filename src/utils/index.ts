import SketchType from "../types";

export function labelSymbolMaster(
  symbolMaster: SketchType.SymbolMaster,
  labelObject: Record<string, any>
): SketchType.SymbolMaster {
  symbolMaster.userInfo = labelObject;
  return symbolMaster;
}

export function makeid(length: number): string {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export * from "./fs-custom";
export * from "./object";
