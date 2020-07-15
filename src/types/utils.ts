export const tuple = <T extends string[]>(...args: T) => args;

export interface CoordString {
  x: number;
  y: number;
  pattern: "{x, y}";
}

export type Uuid = string;

export interface PageRecord {
  name: string;
  artboards: {
    [key: string]: {
      name: string;
    };
  };
}

export type PagesAndArtboards = {
  [key: string]: PageRecord;
};

export type Version = 121 | 122 | 123 | 124 | 125 | 126 | 127 | 128 | 129 | 130;
