import { Car } from "./Car";
import { Road } from "./Road";
import { Segment } from "./utils";

export function drawWithTransform(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number | undefined, drawFunction: (ctx: CanvasRenderingContext2D) => void) {
    ctx.save();
    ctx.translate(x, y);
    if (angle !== undefined) ctx.rotate(angle);
    drawFunction(ctx);
    ctx.restore();
}

export function drawCentered(ctx: CanvasRenderingContext2D, obj: unknown, canvasHeight: number, drawFunction: (ctx: CanvasRenderingContext2D) => void): void {
    if (typeof obj === 'object' && obj !== null && '_y' in obj && typeof (obj as any)._y === 'number') {
        drawWithTransform(ctx, 0, -(obj as { _y: number })._y + canvasHeight * 0.5, undefined, drawFunction);
    } else {
        console.error('Object does not have the expected structure for drawing');
    }
}

export function drawScene(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, car: Car, road: Road) {
    drawCentered(ctx, car, canvas.height, ctx => {
        road.draw(ctx);
        car.draw(ctx);
    });
}


export function drawSeg(ctx: CanvasRenderingContext2D, ray: Segment) {
   if (!Array.isArray(ray) || ray.length !== 2 ||
	   typeof ray[0] === 'undefined' || typeof ray[1] === 'undefined' ||
	   typeof ray[0].x !== 'number' || typeof ray[0].y !== 'number' ||
	   typeof ray[1].x !== 'number' || typeof ray[1].y !== 'number') {
	   console.error("Ray array or its elements are invalid or undefined.");
   } else {
	   ctx.beginPath();
	   ctx.moveTo(ray[0].x, ray[0].y);
	   ctx.lineTo(ray[1].x, ray[1].y);
	   ctx.stroke();
   }
}
