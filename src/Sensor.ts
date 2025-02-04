import { Car } from "./Car";
import { lerp, Point, LineSeg } from "./utils";
import { drawSeg } from "./canvasHelpers";
import { Borders, Segment, getIntersection } from "./utils";

export class Sensor {
   private car: Car;
   private rayCount: number;
   private rayLength: number;
   private raySpread: number;
   private rays: Array<[ { x: number, y: number }, { x: number, y: number } ]>;
   private readings: ({
	  x: number, y: number, offset: number
   } | null | undefined)[] ;
   private lineSegs: LineSeg[];
   constructor(car: Car) {
	  this.car = car;

	  this.rayCount = 3;
	  this.rayLength = 100;
	  this.raySpread = Math.PI/4;

	  this.rays = [];
	  this.readings = [];

	  this.lineSegs = [{
			"color": "gray",
			"segment": [] 
		 },
		 {
			"color": "black",
			"segment": [] 
		 }
	  ];
   }

   update(roadBorders: Borders) {
	  this.castRays();
	  this.readings = [];
	  for(let i = 0; i < this.rays.length; i++) {
		 this.readings.push(
			this.getReading(this.rays[i], roadBorders)
		 );
	  }
   }

   private getReading(ray: Segment, roadBorders: Borders): {
	  x: number, y: number, offset: number
   } | null | undefined {
	  let touches = [];

	  for(let i = 0; i < roadBorders.length; i++) {
		 const touch = getIntersection(
			ray[0],
			ray[1],
			roadBorders[i][0],
			roadBorders[i][1]
		 );
		 if(touch) touches.push(touch);
	  }
	  if(touches.length == 0) return null;
	  else {
		 const offsets = touches.map(e=>e.offset);
		 const minOffset = Math.min(...offsets);
		 return touches.find(e=>e.offset=minOffset);
	  }
   }

   private castRays() {
	  this.rays = [];
	  for(let i = 0; i < this.rayCount; i++) {
		 const rayAngle = lerp(
			this.raySpread/2,
			-this.raySpread/2,
			i/(this.rayCount-1)
		 );

		 const start = { x: this.car._x, y: this.car._y };
		 const end = {
			x: this.car._x - Math.sin(rayAngle)*this.rayLength,
			y: this.car._y - Math.cos(rayAngle)*this.rayLength
		 };

		 this.rays.push([start, end]);
	  }
   }

   draw(ctx: CanvasRenderingContext2D) {
	  let end: Point;
	  for(let i = 0; i < this.rayCount; i++) {
		 end = this.rays[i][1];
		 if(this.readings[i])
			end = { x: this.readings[i]?.x, y: this.readings[i]?.y };

		 ctx.lineWidth = 2;
		 this.lineSegs.forEach((lineSeg, idx) => {
			this.lineSegs[idx].segment = [
			   this.rays[i][idx],
			   end
			];
			ctx.strokeStyle = `${lineSeg.color}`;
			drawSeg(ctx, lineSeg.segment); 
		 });
	  }
   } 
}
