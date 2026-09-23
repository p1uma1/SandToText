import Sand2Text from "../src/Sand2Text";

const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})
const sand = new Sand2Text(canvas, {
    gap: 0,
    effect: "flicker"
});

sand.setText("HELLO WORLD");

// setTimeout(() => {
//     sand.spread();
// }, 3000)

setTimeout(() => {
    sand.setText("WATCH IT MORPH");
}, 3000)