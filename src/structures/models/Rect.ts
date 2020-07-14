import SketchType from "../../types";

export interface RectConstrOpts {
  constrainProportions?: boolean;
  height?: number;
  width?: number;
  x?: number;
  y?: number;
}

export class Rect {
  static _class: "rect";

  constrainProportions: boolean;
  height: number;
  width: number;
  x: number;
  y: number;

  constructor(options?: RectConstrOpts) {
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
