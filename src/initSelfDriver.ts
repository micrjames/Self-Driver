import { container } from "./incs";
import { setupCanvas } from "./canvasSetup";
import { Car } from "./Car";
import { Road } from "./Road";

import { animate } from "./animateCar";

export function init() {
   const canvas = setupCanvas(container);
   const ctx = canvas.getContext("2d");

   if(ctx) {
	  const road = new Road(canvas.width/2, canvas.width*0.9);
	  const car = new Car(road.getLaneCenter(1), 100, 30, 50);
	  // car.draw(ctx);
	  animate(car, road, canvas, ctx);
   } else {
	  console.error("2D context not available.");
   }
}
