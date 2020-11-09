import { markLayer } from "../src";

describe("Marking", () => {
  describe("Mark layers without userInfo", () => {
    it("symbolMaster", async () => {
      const someSymbolMasterJSON: any = {
        _class: "symbolMaster",
      };

      markLayer(someSymbolMasterJSON, "myMark", {
        info: { key: "value" },
      });

      expect(someSymbolMasterJSON.userInfo.myMark).toStrictEqual({
        info: { key: "value" },
      });
    });

    it("artboard", async () => {
      const someArtboardJSON: any = {
        _class: "artboard",
      };

      markLayer(someArtboardJSON, "myMark", {
        info: { key: "value" },
      });

      expect(someArtboardJSON.userInfo.myMark).toStrictEqual({
        info: { key: "value" },
      });
    });
  });

  describe("Mark layers with userInfo", () => {
    it("not overwrite", async () => {
      const someSymbolMasterJSON: any = {
        _class: "symbolMaster",
        userInfo: {
          a: "aaa",
        },
      };

      markLayer(someSymbolMasterJSON, "myMark", {
        info: { key: "value" },
      });

      expect(someSymbolMasterJSON.userInfo.a).toEqual("aaa");
      expect(someSymbolMasterJSON.userInfo.myMark).toStrictEqual({
        info: { key: "value" },
      });
    });

    it("overwrite userInfo key", async () => {
      const spy = jest.spyOn(global.console, "warn");

      const someSymbolMasterJSON: any = {
        _class: "symbolMaster",
        userInfo: {
          a: "aaa",
        },
      };

      markLayer(someSymbolMasterJSON, "a", {
        info: { key: "value" },
      });

      expect(spy).toHaveBeenCalled();
      expect(someSymbolMasterJSON.userInfo.a).toStrictEqual({
        info: { key: "value" },
      });

      spy.mockRestore();
    });
  });
});
