import SketchType from "../../types";
import { Page } from "../Page";

export class PagesAndArtboards {
  data: SketchType.PagesAndArtboards;

  constructor(data?: SketchType.PagesAndArtboards) {
    if (data) {
      this.data = data;
    } else {
      const page = new Page();
      const data = {} as SketchType.PagesAndArtboards;
      data[page.getPageId()] = {
        name: page.getName(),
        artboards: {},
      };

      this.data = data;
    }
  }

  static fromPages(pages: Page[]): PagesAndArtboards {
    const data = {} as SketchType.PagesAndArtboards;

    pages.forEach((page) => {
      const pageId = page.getPageId();
      const pageName = page.getName();

      const pageRecord = {} as SketchType.PageRecord;
      pageRecord.name = pageName;
      pageRecord.artboards = {};

      page.artboards().forEach((artboard) => {
        pageRecord.artboards[artboard.do_objectID] = {
          name: artboard.name,
        };
      });

      data[pageId] = pageRecord;
    });

    const pagesAndArtboards = new PagesAndArtboards(data);

    return pagesAndArtboards;
  }

  toSketchJSON(): SketchType.PagesAndArtboards {
    return this.data;
  }
}
