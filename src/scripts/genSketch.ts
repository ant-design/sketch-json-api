import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";

import { UserJSON } from "../structures/user";
import { MetaJSON } from "../structures/meta";
import { DocumentJSON } from "../structures/document";
import { PageJSON } from "../structures/page";
import SketchType from "../types";
import { labelSymbolMaster } from "../utils";

const userJSON = new UserJSON();
const metaJSON = new MetaJSON();
const documentJSON = new DocumentJSON();
const pageJSON = new PageJSON();

const symbolMasterSample: SketchType.SymbolMaster = {
  _class: "symbolMaster",
  do_objectID: "CD88CE73-601B-47CD-9965-6AA98B668FE6",
  booleanOperation: -1,
  isFixedToViewport: false,
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  isLocked: false,
  isVisible: true,
  layerListExpandedType: 0,
  name: "Triangle",
  nameIsFixed: false,
  resizingConstraint: 63,
  resizingType: 0,
  rotation: 0,
  shouldBreakMaskChain: true,
  exportOptions: {
    _class: "exportOptions",
    includedLayerIds: [],
    layerOptions: 0,
    shouldTrim: false,
    exportFormats: [],
  },
  frame: {
    _class: "rect",
    constrainProportions: false,
    height: 61,
    width: 89,
    x: 100,
    y: 0,
  },
  clippingMaskMode: 0,
  hasClippingMask: false,
  style: {
    _class: "style",
    do_objectID: "E3B4AD3D-CB28-42D5-B06F-55671AB1EA22",
    endMarkerType: 0,
    miterLimit: 10,
    startMarkerType: 0,
    windingRule: 1,
    blur: {
      _class: "blur",
      isEnabled: false,
      center: "{0.5, 0.5}",
      motionAngle: 0,
      radius: 10,
      saturation: 1,
      type: 0,
    },
    borderOptions: {
      _class: "borderOptions",
      isEnabled: true,
      dashPattern: [],
      lineCapStyle: 0,
      lineJoinStyle: 0,
    },
    borders: [],
    colorControls: {
      _class: "colorControls",
      isEnabled: false,
      brightness: 0,
      contrast: 1,
      hue: 0,
      saturation: 1,
    },
    contextSettings: {
      _class: "graphicsContextSettings",
      blendMode: 0,
      opacity: 1,
    },
    fills: [],
    innerShadows: [],
    shadows: [],
  },
  hasClickThrough: true,
  groupLayout: { _class: "MSImmutableFreeformGroupLayout" },
  layers: [
    {
      _class: "triangle",
      do_objectID: "63404F76-0991-49D4-B030-4C5C3FE59A9D",
      booleanOperation: -1,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: false,
      isVisible: true,
      layerListExpandedType: 0,
      name: "Triangle",
      nameIsFixed: false,
      resizingConstraint: 63,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      exportOptions: {
        _class: "exportOptions",
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
        exportFormats: [],
      },
      frame: {
        _class: "rect",
        constrainProportions: false,
        height: 61,
        width: 89,
        x: 0,
        y: 0,
      },
      clippingMaskMode: 0,
      hasClippingMask: false,
      style: {
        _class: "style",
        do_objectID: "17EF594C-AA68-4645-8834-1354C00C54AB",
        endMarkerType: 0,
        miterLimit: 10,
        startMarkerType: 0,
        windingRule: 1,
        blur: {
          _class: "blur",
          isEnabled: false,
          center: "{0.5, 0.5}",
          motionAngle: 0,
          radius: 10,
          saturation: 1,
          type: 0,
        },
        borderOptions: {
          _class: "borderOptions",
          isEnabled: true,
          dashPattern: [],
          lineCapStyle: 0,
          lineJoinStyle: 0,
        },
        borders: [
          {
            _class: "border",
            isEnabled: true,
            fillType: 0,
            color: {
              _class: "color",
              alpha: 1,
              blue: 0.592,
              green: 0.592,
              red: 0.592,
            },
            contextSettings: {
              _class: "graphicsContextSettings",
              blendMode: 0,
              opacity: 1,
            },
            gradient: {
              _class: "gradient",
              elipseLength: 0,
              from: "{0.5, 0}",
              gradientType: 0,
              to: "{0.5, 1}",
              stops: [
                {
                  _class: "gradientStop",
                  position: 0,
                  color: {
                    _class: "color",
                    alpha: 1,
                    blue: 1,
                    green: 1,
                    red: 1,
                  },
                },
                {
                  _class: "gradientStop",
                  position: 1,
                  color: {
                    _class: "color",
                    alpha: 1,
                    blue: 0,
                    green: 0,
                    red: 0,
                  },
                },
              ],
            },
            position: 0,
            thickness: 1,
          },
        ],
        colorControls: {
          _class: "colorControls",
          isEnabled: false,
          brightness: 0,
          contrast: 1,
          hue: 0,
          saturation: 1,
        },
        contextSettings: {
          _class: "graphicsContextSettings",
          blendMode: 0,
          opacity: 1,
        },
        fills: [
          {
            _class: "fill",
            isEnabled: true,
            fillType: 0,
            color: {
              _class: "color",
              alpha: 1,
              blue: 0.847,
              green: 0.847,
              red: 0.847,
            },
            contextSettings: {
              _class: "graphicsContextSettings",
              blendMode: 0,
              opacity: 1,
            },
            gradient: {
              _class: "gradient",
              elipseLength: 0,
              from: "{0.5, 0}",
              gradientType: 0,
              to: "{0.5, 1}",
              stops: [
                {
                  _class: "gradientStop",
                  position: 0,
                  color: {
                    _class: "color",
                    alpha: 1,
                    blue: 1,
                    green: 1,
                    red: 1,
                  },
                },
                {
                  _class: "gradientStop",
                  position: 1,
                  color: {
                    _class: "color",
                    alpha: 1,
                    blue: 0,
                    green: 0,
                    red: 0,
                  },
                },
              ],
            },
            noiseIndex: 0,
            noiseIntensity: 0,
            patternFillType: 1,
            patternTileScale: 1,
          },
        ],
        innerShadows: [],
        shadows: [],
      },
      edited: false,
      isClosed: true,
      pointRadiusBehaviour: 1,
      points: [
        {
          _class: "curvePoint",
          cornerRadius: 0,
          curveFrom: "{0.5, 0}",
          curveMode: 1,
          curveTo: "{0.5, 0}",
          hasCurveFrom: false,
          hasCurveTo: false,
          point: "{0.5, 0}",
        },
        {
          _class: "curvePoint",
          cornerRadius: 0,
          curveFrom: "{1, 1}",
          curveMode: 1,
          curveTo: "{1, 1}",
          hasCurveFrom: false,
          hasCurveTo: false,
          point: "{1, 1}",
        },
        {
          _class: "curvePoint",
          cornerRadius: 0,
          curveFrom: "{0, 1}",
          curveMode: 1,
          curveTo: "{0, 1}",
          hasCurveFrom: false,
          hasCurveTo: false,
          point: "{0, 1}",
        },
      ],
      isEquilateral: false,
    },
  ],
  hasBackgroundColor: false,
  includeBackgroundColorInExport: true,
  includeInCloudUpload: true,
  isFlowHome: false,
  presetDictionary: {},
  resizesContent: false,
  backgroundColor: {
    _class: "color",
    alpha: 1,
    blue: 1,
    green: 1,
    red: 1,
  },
  horizontalRulerData: { _class: "rulerData", base: 0, guides: [] },
  verticalRulerData: { _class: "rulerData", base: 0, guides: [] },
  includeBackgroundColorInInstance: false,
  symbolID: "C90B14DA-A27D-4380-A783-49FE7437A852",
  changeIdentifier: 3,
  overrideProperties: [],
  allowsOverrides: true,
};

const labelledSymbolMasterSample = labelSymbolMaster(symbolMasterSample, {
  id: "a-b-c-d",
  brand: "TechUI",
  name: "somebtn",
  link: "http://#",
});

pageJSON.addSymbolMaster(labelledSymbolMasterSample);

const tempPath = "temp";
if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath);
}

const filesPath = path.join(tempPath, "files");
if (!fs.existsSync(filesPath)) {
  fs.mkdirSync(filesPath);
}

fs.writeFileSync(
  path.join(filesPath, "user.json"),
  JSON.stringify(userJSON.toSketchJSON())
);
fs.writeFileSync(
  path.join(filesPath, "meta.json"),
  JSON.stringify(metaJSON.toSketchJSON())
);
fs.writeFileSync(
  path.join(filesPath, "document.json"),
  JSON.stringify(documentJSON.toSketchJSON())
);

const pagesPath = path.join(filesPath, "pages");
if (!fs.existsSync(pagesPath)) {
  fs.mkdirSync(pagesPath);
}

fs.writeFileSync(
  path.join(pagesPath, `${pageJSON.getPageId()}.json`),
  JSON.stringify(pageJSON.toSketchJSON())
);

// zip

const sketchPath = path.join(tempPath, "sketch");
if (!fs.existsSync(sketchPath)) {
  fs.mkdirSync(sketchPath);
}

exec(
  `zip -r -X ${path.join(process.cwd(), sketchPath, "generated.sketch")} *`,
  { cwd: filesPath },
  (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }
  }
);
