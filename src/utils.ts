export interface KeyMappings {
   [key: string]: string;
}

export const lerp = (A: number, B: number, t: number): number => A+(B-A)*t;


export type LineSeg = { 
   "color": String,
   "segment": Segment 
};
export type Point = {
   x: number | undefined, y: number | undefined
}
export type Segment = Point[];
export type Borders = [
   Segment,
   Segment
];

export function getIntersection(A: Point, B: Point, C: Point, D: Point): {
   x: number, y: number, offset: number
} | null | undefined {
if (typeof A === 'undefined' || typeof B === 'undefined' || typeof C === 'undefined' || typeof D === 'undefined' ||
        typeof A.x !== 'number' || typeof A.y !== 'number' ||
        typeof B.x !== 'number' || typeof B.y !== 'number' ||
        typeof C.x !== 'number' || typeof C.y !== 'number' ||
        typeof D.x !== 'number' || typeof D.y !== 'number') {
        console.error("One or more points (A, B, C, D) are invalid or undefined.");
        // Optionally, return or throw, depending on your error handling strategy
        return null;
    }
   const tTop = (D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
   const uTop = (C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
   const bottom = (D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);

   if(bottom != 0) {
	  const t = tTop/bottom;
	  const u = uTop/bottom;
	  if(t >= 0 && t <= 1 && u >= 0 && u <= 1) {
		 return {
			x: lerp(A.x, B.x, t),
			y: lerp(A.y, B.y, t),
			offset: t
		 };
	  }
   }

   return undefined;
}

export function polysIntersect(poly1: Point[], poly2: Point[]): boolean {
   for(let i = 0; i < poly1.length; i++) {
	  for(let j = 0; j < poly2.length; j++) {
		 const touch = getIntersection(
			poly1[i], poly1[(i+1)%poly1.length],
			poly2[i], poly2[(j+1)%poly2.length]
		 );
		 if(touch) return true;
	  }
   }
   return false;
}
