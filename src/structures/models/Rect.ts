import SketchType from "../../types";

export class Rect {
  static _class: "rect" = "rect";

  constrainProportions: boolean;
  height: number;
  width: number;
  x: number;
  y: number;

  constructor();
  constructor(options: SketchType.Rect);
  constructor(options?: any) {
    this.constrainProportions =
      (options && options.constrainProportions) || false;
    this.height = (options && options.height) || 100;
    this.width = (options && options.width) || 100;
    this.x = (options && options.x) || 0;
    this.y = (options && options.y) || 0;
  }

  toSketchJSON(): SketchType.Rect {
    return {
      _class: Rect._class,
      constrainProportions: this.constrainProportions,
      height: this.height,
      width: this.width,
      x: this.x,
      y: this.y,
    };
  }
}
