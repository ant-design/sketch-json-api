import * as fse from "fs-extra";
import { get as _get, set as _set } from "lodash";
import { v4 } from "uuid";
import { JSONPack, Page, Layer } from "../../src";

const json = {
  _class: "symbolMaster",
  frame: {
    _class: "rect",
    constrainProportions: false,
    height: 128,
    width: 128,
    x: 0,
    y: 0,
  },
  allowsOverrides: true,
  backgroundColor: {
    _class: "color",
    red: 1,
    green: 1,
    blue: 1,
    alpha: 1,
  },
  booleanOperation: -1,
  changeIdentifier: 0,
  do_objectID: "58C4090A-F24B-444C-8F4D-3E2A65E9429D",
  symbolID: "A26CF47E-981E-415B-88C3-6765C6B9B0A0",
  exportOptions: {
    _class: "exportOptions",
    includedLayerIds: [],
    layerOptions: 0,
    shouldTrim: false,
    exportFormats: [],
  },
  hasClickThrough: true,
  includeInCloudUpload: true,
  hasBackgroundColor: false,
  includeBackgroundColorInExport: true,
  resizesContent: false,
  includeBackgroundColorInInstance: false,
  nameIsFixed: false,
  shouldBreakMaskChain: false,
  horizontalRulerData: { _class: "rulerData", base: 0, guides: [] },
  verticalRulerData: { _class: "rulerData", base: 0, guides: [] },
  resizingConstraint: 1,
  resizingType: 1,
  groupLayout: { _class: "MSImmutableFreeformGroupLayout" },
  isFixedToViewport: false,
  sharedStyleID: "",
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  isLocked: false,
  isFlowHome: false,
  name: "",
  rotation: 0,
  layerListExpandedType: 0,
  overrideProperties: [
    {
      _class: "MSImmutableOverrideProperty",
      canOverride: true,
      overrideName: "2F7F15EE-D786-4E2C-AC6E-99D421A057A4_image",
    },
  ],
  layers: [
    {
      _class: "bitmap",
      do_objectID: "2F7F15EE-D786-4E2C-AC6E-99D421A057A4",
      frame: {
        _class: "rect",
        constrainProportions: false,
        height: 128,
        width: 128,
        x: 0,
        y: 0,
      },
      style: {
        _class: "style",
        do_objectID: "BFFDEFB1-FFBB-4E15-9102-9A604094BA27",
        endMarkerType: 0,
        miterLimit: 10,
        startMarkerType: 0,
        windingRule: 1,
        borderOptions: {
          _class: "borderOptions",
          isEnabled: true,
          dashPattern: [],
          lineCapStyle: 0,
          lineJoinStyle: 0,
        },
        colorControls: {
          _class: "colorControls",
          isEnabled: false,
          brightness: 0,
          contrast: 1,
          hue: 0,
          saturation: 1,
        },
        fills: [],
        borders: [],
        shadows: [],
        innerShadows: [],
        contextSettings: {
          _class: "graphicsContextSettings",
          blendMode: 0,
          opacity: 1,
        },
      },
      image: {
        _class: "MSJSONOriginalDataReference",
        _ref_class: "MSImageData",
        _ref: "images/B0A3F862-F847-4BCD-821C-E8D472766227",
        data: {
          _data:
            "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",
        },
        sha1: { _data: "" },
      },
      booleanOperation: -1,
      exportOptions: {
        _class: "exportOptions",
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
        exportFormats: [],
      },
      clippingMask: "",
      intendedDPI: 32,
      fillReplacesImage: false,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: false,
      isVisible: true,
      layerListExpandedType: 0,
      name: "bitmap",
      nameIsFixed: false,
      resizingConstraint: 63,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      clippingMaskMode: 0,
      hasClippingMask: false,
    },
  ],
  isVisible: true,
};

const whereWeHaveImage = "layers[0].image";

const folderFilePath = `/tmp/justtryone`;
const sketchFilePath = `${folderFilePath}.sketch`;

(async () => {
  const imageJson = _get(json, whereWeHaveImage);

  const base64Image = imageJson.data?._data;
  const filename = `${v4()}.png`;

  // modify json

  const newImageJson = {
    _class: "MSJSONFileReference",
    _ref_class: "MSImageData",
    _ref: `images/${filename}`,
  };

  _set(json, whereWeHaveImage, newImageJson);

  // generate Sketch JSON pack

  const newLayer = new Layer({ class: "SymbolMaster", data: json });
  const newPage = new Page({ layers: [newLayer.toSketchJSON()] } as any);
  const newPack = new JSONPack({ pages: [newPage] } as any);

  await newPack.write(folderFilePath);

  // after writing pack, insert images

  await fse.ensureDir(`${folderFilePath}/images/`);

  await fse.writeFile(`${folderFilePath}/images/${filename}`, base64Image, {
    encoding: "base64",
  });

  // zip the .sketch file

  await newPack.zip(sketchFilePath);
})();
