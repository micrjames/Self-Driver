import { container } from "./incs";
import { setupCanvas } from "./canvasSetup";
import { Car } from "./Car";
import { animate } from "./animateCar";

export function init() {
   const canvas = setupCanvas(container);
   const ctx = canvas.getContext("2d");

   if(ctx) {
	  const car = new Car(100, 100, 30, 50);
	  // car.draw(ctx);
	  animate(car, canvas, ctx);
   } else {
	  console.error("2D context not available.");
   }
}
