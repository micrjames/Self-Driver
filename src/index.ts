import "./styles/main.scss";
import { Car } from "./Car";

const body = document.body;
const container = body.firstElementChild;
const canvas = document.createElement("canvas");
canvas.id = "myCanvas";
container?.appendChild(canvas);

canvas.width = 200;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);
car.draw(ctx);

animate();
function animate() {
   car.update();
   canvas.height = window.innerHeight; // unless, rectangle will not be discrete
   car.draw(ctx);
   requestAnimationFrame(animate);
}
