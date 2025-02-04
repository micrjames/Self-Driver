export interface KeyMappings {
   [key: string]: string;
}

export const lerp = (A: number, B: number, t: number): number => A+(B-A)*t;


export type Borders = [
   {x: number, y: number}[],
   {x: number, y: number}[]
];
