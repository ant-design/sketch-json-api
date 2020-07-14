import SketchType from "../types";

type InitData = Partial<
  Record<SketchType.OriginTypes | "page" | "document" | "meta", any>
>;

const Color = {
  _class: "color",
  alpha: 1,
  blue: 0,
  green: 0,
  red: 0,
};

const ParagraphStyle = {
  _class: "paragraphStyle",
  alignment: 0,
};

const TextStyle = {
  _class: "textStyle",
  encodedAttributes: {
    MSAttributedStringFontAttribute: {
      _class: "fontDescriptor",
      attributes: {
        name: "Helvetica",
        size: 36,
      },
    },
    MSAttributedStringColorAttribute: Color,
    textStyleVerticalAlignmentKey: 0,
    underlineStyle: 0,
    strikethroughStyle: 0,
    paragraphStyle: ParagraphStyle,
  },
  verticalAlignment: 0,
  kerning: 0,
};

const GraphicsContextSettings = {
  _class: "graphicsContextSettings",
  blendMode: 0,
  opacity: 1,
};

const BorderOptions = {
  _class: "borderOptions",
  isEnabled: true,
  dashPattern: [],
  lineCapStyle: 1,
  lineJoinStyle: 1,
};

const ColorControls = {
  _class: "colorControls",
  isEnabled: false,
  brightness: 0,
  contrast: 1,
  hue: 0,
  saturation: 1,
};

const ExportOptions = {
  _class: "exportOptions",
  includedLayerIds: [],
  layerOptions: 0,
  shouldTrim: false,
  exportFormats: [],
};

const RulerData = { _class: "rulerData", base: 0, guides: [] };

export const INIT_DATA: InitData = {
  Color,
  ParagraphStyle,
  TextStyle,
  GraphicsContextSettings,
  BorderOptions,
  ColorControls,
  ExportOptions,
  RulerData,
};

export default INIT_DATA;
