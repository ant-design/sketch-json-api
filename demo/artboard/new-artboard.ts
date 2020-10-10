import { JSONPack, Layer, Page } from "../../src";

const DEMO_PATH = "temp/artboard/new-artboard";

const newArtboard = new Layer({ class: "Artboard", data: null });

newArtboard.updateProps({
  data: {
    frame: {
      height: 249,
      width: 263,
    },
    layers: [
      {
        _class: "triangle",
        do_objectID: "FF47D4AF-09ED-4354-8A64-B36F43EBFB08",
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
          constrainProportions: true,
          height: 127,
          width: 127,
          x: 68,
          y: 61,
        },
        clippingMaskMode: 0,
        hasClippingMask: false,
        style: {
          _class: "style",
          do_objectID: "ABC0F641-404C-4179-8EE2-36ADF496FB84",
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
  },
} as any);

const newPage = new Page({ layers: [newArtboard.toSketchJSON()] } as any);

const newPack = new JSONPack({ pages: [newPage] } as any);

(async () => {
  await newPack.write(`${DEMO_PATH}/files`);
  await newPack.zip(`${DEMO_PATH}/result.sketch`);
})();
