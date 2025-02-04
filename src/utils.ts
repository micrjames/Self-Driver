export interface KeyMappings {
   [key: string]: string;
}

export const lerp = (A: number, B: number, t: number): number => A+(B-A)*t;


export type Point = {
   x: number, y: number
}
export type Segment = Point[];
export type Borders = [
   Segment,
   Segment
];
