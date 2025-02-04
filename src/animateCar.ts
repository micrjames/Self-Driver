import { Car } from "./Car";
import { Road } from "./Road";
import { drawScene } from "./canvasHelpers";

export function animate(car: Car, road: Road, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
   car.update(road._borders);
   canvas.height = window.innerHeight; // unless, rectangle will not be discrete

   drawScene(canvas, ctx, car, road); 

   /*
   ctx.save();
   ctx.translate(0, -car._y+canvas.height*0.5); // 1/2 way up the road static

   road.draw(ctx);
   car.draw(ctx);

   ctx.restore();
   */
   requestAnimationFrame(() => animate(car, road, canvas, ctx));
}
