export function setupCanvas(container: Element | null): HTMLCanvasElement {
   const canvas = document.createElement("canvas");
   canvas.id = "myCanvas";
   if(container)
	  container.appendChild(canvas);

   canvas.width = 200;
   canvas.height = window.innerHeight;

   return canvas;
}
