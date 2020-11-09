import SketchType from "../types";

/**
 * @deprecated use markLayer instead
 */
export function labelSymbolMaster(
  symbolMaster: SketchType.SymbolMaster,
  labelObject: Record<string, any>
): SketchType.SymbolMaster {
  symbolMaster.userInfo = labelObject;
  return symbolMaster;
}

export function markLayer(
  layer: SketchType.AnyLayer,
  markName: string,
  markObject: Record<string, any>
) {
  if (!layer.userInfo) {
    layer.userInfo = {};
  }

  if (layer.userInfo[markName]) {
    console.warn(`Overwriting userInfo.${markName} of layer: ${layer}`);
  }

  layer.userInfo[markName] = markObject;
  return layer;
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
