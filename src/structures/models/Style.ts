import { v4 } from "uuid";
import SketchType, { Uuid } from "../../types";
import { INIT_DATA } from "../../constants";

export interface StyleConstrOpts {
  do_objectID?: Uuid;
  startMarkerType?: SketchType.MarkerType;
  endMarkerType?: SketchType.MarkerType;
  miterLimit?: number;
  windingRule?: number;
  borders?: SketchType.Border[];
  borderOptions?: SketchType.BorderOptions;
  fills?: SketchType.Fill[];
  shadows?: SketchType.Shadow[];
  innerShadows?: SketchType.InnerShadow[];
  textStyle?: SketchType.TextStyle;
  contextSettings?: SketchType.GraphicsContextSettings;
  colorControls?: SketchType.ColorControls;
}

export class Style {
  static _class: "style";

  do_objectID: Uuid;

  startMarkerType: SketchType.MarkerType;
  endMarkerType: SketchType.MarkerType;
  miterLimit: number;
  windingRule: number;
  borders: SketchType.Border[];
  borderOptions: SketchType.BorderOptions;
  fills: SketchType.Fill[];
  shadows: SketchType.Shadow[];
  innerShadows: SketchType.InnerShadow[];
  textStyle: SketchType.TextStyle;
  contextSettings: SketchType.GraphicsContextSettings;
  colorControls: SketchType.ColorControls;

  constructor(options?: StyleConstrOpts) {
    this.do_objectID = (options && options.do_objectID) || v4().toUpperCase();

    this.startMarkerType = (options && options.startMarkerType) || 0;
    this.endMarkerType = (options && options.endMarkerType) || 0;
    this.miterLimit = (options && options.miterLimit) || 10;
    this.windingRule = (options && options.windingRule) || 0;
    this.borders = (options && options.borders) || [];
    this.borderOptions =
      (options && options.borderOptions) || INIT_DATA.BorderOptions;
    this.fills = (options && options.fills) || [];
    this.shadows = (options && options.shadows) || [];
    this.innerShadows = (options && options.innerShadows) || [];
    this.textStyle = (options && options.textStyle) || INIT_DATA.TextStyle;
    this.contextSettings =
      (options && options.contextSettings) || INIT_DATA.GraphicsContextSettings;
    this.colorControls =
      (options && options.colorControls) || INIT_DATA.ColorControls;
  }

  toSketchJSON(): SketchType.Style {
    return {
      _class: Style._class,
      do_objectID: this.do_objectID,
      startMarkerType: this.startMarkerType,
      endMarkerType: this.endMarkerType,
      miterLimit: this.miterLimit,
      windingRule: this.windingRule,
      borders: this.borders,
      borderOptions: this.borderOptions,
      fills: this.fills,
      shadows: this.shadows,
      innerShadows: this.innerShadows,
      textStyle: this.textStyle,
      contextSettings: this.contextSettings,
      colorControls: this.colorControls,
    };
  }
}
