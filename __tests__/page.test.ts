import { Page, Layer } from "../src";

test("page", () => {
  const layer = new Layer();

  const layers = [layer.toSketchJSON()];

  const page = new Page({ layers } as any);
  // console.log(page.toSketchJSON());
});
