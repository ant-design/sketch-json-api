import { Meta } from "../src";

test("meta constructor", () => {
  const meta = new Meta();
  console.log(meta.toSketchJSON());
});

test("meta from data", () => {
  const data: any = {
    commit: "d06f2f7bf433bc948c6f867ddfb87013f4871eb3",
    pagesAndArtboards: {
      "A869BA2A-E632-4C2D-924E-7883848BB266": { name: "Page 1", artboards: {} },
    },
    version: 130,
    fonts: [],
    compatibilityVersion: 99,
    app: "com.bohemiancoding.sketch3",
    autosaved: 0,
    variant: "NONAPPSTORE",
    created: {
      commit: "d06f2f7bf433bc948c6f867ddfb87013f4871eb3",
      appVersion: "66.1",
      build: 97080,
      app: "com.bohemiancoding.sketch3",
      compatibilityVersion: 99,
      version: 130,
      variant: "NONAPPSTORE",
    },
    saveHistory: ["NONAPPSTORE.97080"],
    appVersion: "66.1",
    build: 97080,
  };
  const meta = Meta.fromData(data);
  console.log(meta.toSketchJSON());
});

test("meta from path", () => {
  Meta.fromPath("demo/zip/miniSamplePack/meta.json");
});
