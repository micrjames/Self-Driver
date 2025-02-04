import { lerp, Borders } from "./utils";
import { drawSeg } from "./canvasHelpers";

export class Road {
   private x: number;
   private width: number;
   private laneCount: number;

   private left: number;
   private right: number;
   private top: number;
   private bottom: number;
   private borders: Borders;

   constructor(x: number, width: number, laneCount: number = 3) {
	  this.x = x;
	  this.width = width;
	  this.laneCount = laneCount;

	  this.left = x - width / 2;
	  this.right = x + width / 2;

	  const infinity = 1000000;
	  this.top = -infinity;
	  this.bottom = infinity;

	  const topLeft = {x:this.left, y:this.top};
	  const topRight = {x:this.right,y:this.top};
	  const bottomLeft = {x:this.left,y:this.bottom};
	  const bottomRight = {x:this.right,y:this.bottom};
	  this.borders = [
	     [topLeft, bottomLeft],
		 [topRight, bottomRight]
	  ];
   }

   getLaneCenter(laneIdx: number): number {
	  const laneWidth = this.width/this.laneCount;
	  return this.left+laneWidth/2+Math.min(laneIdx, this.laneCount-1)*laneWidth;
   }

   get _borders(): Borders { 
	  return this.borders;
   }

   draw(ctx: CanvasRenderingContext2D | null) {
	  if(ctx) {
		 ctx.lineWidth = 5;
		 ctx.strokeStyle = 'white';
		 
		 for(let i = 1; i <= this.laneCount-1; i++) {
			const x = lerp(
						   this.left,
						   this.right,
						   i/this.laneCount
					  );
			if(i > 0 && i < this.laneCount)
			   ctx.setLineDash([20, 20]);
			else
			   ctx.setLineDash([]);
			/*
			ctx.beginPath();
			ctx.moveTo(x, this.top);
			ctx.lineTo(x, this.bottom);
			ctx.stroke();
		    */
			drawSeg(ctx, [
			   {x, y: this.top},
			   {x, y: this.bottom}
			]);
		 }

		 ctx.setLineDash([]);
		 this.borders.forEach(border => {
			/*
			ctx.beginPath();
			ctx.moveTo(border[0].x, border[0].y);
			ctx.moveTo(border[1].x, border[1].y);
			ctx.stroke();
		    */
			drawSeg(ctx, [
			   {x: border[0].x, y: border[0].y},
			   {x: border[1].x, y: border[1].y}
			]);
		 });
	  }
   }
}
