import { Car } from "./Car";
import { lerp } from "./utils";
import { drawSeg } from "./canvasHelpers";

export class Sensor {
   private car: Car;
   private rayCount: number;
   private rayLength: number;
   private raySpread: number;
   private rays: Array<[ { x: number, y: number }, { x: number, y: number } ]>;
   constructor(car: Car) {
	  this.car = car;

	  this.rayCount = 3;
	  this.rayLength = 100;
	  this.raySpread = Math.PI/4;

	  this.rays = [];
   }

   update() {
	  this.castRays();
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
	  for(let i = 0; i < this.rayCount; i++) {
		 ctx.lineWidth = 2;
		 ctx.strokeStyle = "yellow";
		 drawSeg(ctx, this.rays[i]);
	  }
   } 
}
