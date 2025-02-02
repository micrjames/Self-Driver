import { Controls } from "./Controls";

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

	  this.controls = new Controls();
   }

   get _y(): number {
	  return this.y;
   }

   update() {
	   if(this.controls.forward){
		 // this.y -= 2;
		 this.speed += this.acceleration;
       }
	   if(this.controls.reverse) {
		   // this.y += 2;
		   this.speed -= this.acceleration;
	   }

	   if(this.speed > this.maxSpeed)
		   this.speed = this.maxSpeed;
	   if(this.speed < -this.maxSpeed/2)         // car is moving in reverse.
		   this.speed = -this.maxSpeed/2;

	   if(this.speed > 0) {
		   this.speed -= this.friction;
	   }
	   if(this.speed < 0) {
		   this.speed += this.friction;
	   }
	   if(Math.abs(this.speed) < this.friction) {
		   this.speed = 0;
	   }

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

	   this.x -= Math.sin(this.angle) * this.speed;
	   this.y -= Math.cos(this.angle) * this.speed;
	   // this.y -= this.speed;
   }

   draw(ctx: CanvasRenderingContext2D | null) {
	  if(ctx) {
		 ctx.save();
		 ctx.translate(this.x, this.y);
		 ctx.rotate(-this.angle);
		 ctx.beginPath();
		 ctx.rect(-this.width/2, // this.x-this.width/2,
				  -this.height/2, // this.y-this.height/2,
				  this.width,
				  this.height
				 );
		 ctx.fill();
		 ctx.restore();
	  }
   }
}
