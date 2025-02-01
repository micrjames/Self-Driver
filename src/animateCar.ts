import { Car } from "./Car";

export function animate(car: Car, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
   car.update();
   canvas.height = window.innerHeight; // unless, rectangle will not be discrete
   car.draw(ctx);
   requestAnimationFrame(() => animate(car, canvas, ctx));
}
