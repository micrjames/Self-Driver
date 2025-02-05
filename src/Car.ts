import { Controls } from "./Controls";
import { Sensor } from "./Sensor";
import { Point, Borders } from "./utils";
import { drawWithTransform } from "./canvasHelpers";

export class Car {
   private x: number;
   private y: number;
   private width: number;
   private height: number;

   private speed: number;
   private acceleration: number;
   private maxSpeed: number;
   private friction: number;
   private angle: number;

   private polygon: Point[];

   private sensor: Sensor;
   private controls: Controls;

   constructor(x: number, y: number, width: number, height: number) {
	  this.x = x;
	  this.y = y;
	  this.width = width;
	  this.height = height;

	  this.speed = 0;
	  this.acceleration = 0.2;
	  this.maxSpeed = 3;
	  this.friction = 0.05;
	  this.angle = 0;

	  this.polygon = [];

	  this.sensor = new Sensor(this);
	  this.controls = new Controls();
   }

   get _x(): number {
	  return this.x;
   }
   get _y(): number {
	  return this.y;
   }

   update(borders: Borders) { 
	  this.accelerate();
	  this.steer();
	  this.updatePostion();
	  this.clampSpeed();
	  this.applyFriction();

	  this.polygon = this.createPolygon();

	  this.sensor.update(borders);
   }

   private createPolygon(): Point[] {
	  const rad = Math.hypot(this.width, this.height)/2;
	  const alpha = Math.atan2(this.width, this.height);

	  const points = this.createPolyPoints(rad, alpha);
	  return points;
   }

   private createPolyPoints(rad: number, alpha: number): Point[] {
	  return [
		 this.createPolyPoint(this.angle-alpha, rad),
		 this.createPolyPoint(this.angle+alpha, rad),
		 this.createPolyPoint(Math.PI+this.angle-alpha, rad),
		 this.createPolyPoint(Math.PI+this.angle+alpha, rad)
	  ];
   }

   private createPolyPoint(angle: number, rad: number): Point {
		 return {
			x: this.x - Math.sin(angle) * rad,
			y: this.y - Math.cos(angle) * rad
		 };
   }

   private accelerate() {
	  if(this.controls.forward){
		// this.y -= 2;
		this.speed += this.acceleration;
      }
	  if(this.controls.reverse) {
		// this.y += 2;
		this.speed -= this.acceleration;
	  }
   }
   private steer() {
	  if(this.speed != 0) {
		  const flip = this.speed > 0 ? 1 : -1;
		  if(this.controls.left) {
			  // this.x -= 2;
			  this.angle += 0.03 * flip;
		  }
		  if(this.controls.right) {
			  // this.x += 2;
			  this.angle -= 0.03 * flip;
		  }
	  }
   }
   private updatePostion() {
	  this.x -= Math.sin(this.angle) * this.speed;
	  this.y -= Math.cos(this.angle) * this.speed;
	  // this.y -= this.speed;
   }
   private clampSpeed() {
	  this.speed = Math.max(-this.maxSpeed / 2, Math.min(this.speed, this.maxSpeed));
   /*
	  if(this.speed > this.maxSpeed)
		  this.speed = this.maxSpeed;
	  if(this.speed < -this.maxSpeed/2)         // car is moving in reverse.
		  this.speed = -this.maxSpeed/2;
	   */
	}
	private applyFriction() {
	   if (this.speed !== 0) {
           const frictionSign = Math.sign(this.speed);
           this.speed -= frictionSign * this.friction;
           if (Math.abs(this.speed) < this.friction) {
               this.speed = 0;
           }
       }
	   /*
	   if(this.speed > 0) {
		   this.speed -= this.friction;
	   }
	   if(this.speed < 0) {
		   this.speed += this.friction;
	   }
	   if(Math.abs(this.speed) < this.friction) {
		   this.speed = 0;
	   }
	   */
	}

   draw(ctx: CanvasRenderingContext2D | null) {
	  if(ctx) {
		 ctx.beginPath();
					 
		 ctx.moveTo(<number>this.polygon[0].x, <number>this.polygon[0].y);
		 for(let i = 0; i < this.polygon.length; i++)
		 	ctx.lineTo(<number>this.polygon[i].x, <number>this.polygon[i].y);
					
				
	     ctx.fill();
		 /*
		  drawWithTransform(ctx, this.x, this.y, -this.angle, ctx => {
			  ctx.beginPath();
			  ctx.rect(-this.width/2, // this.x-this.width/2,
					 -this.height/2, // this.y-this.height/2,
					 this.width,
					 this.height
					);
			  ctx.fill();
		 });
		 */
		 this.sensor.draw(ctx);
	  }
   }
}
