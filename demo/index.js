import Sand2Text from "../src/Sand2Text";

const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})
const sand = new Sand2Text(canvas, {
    font: "80px Verdana",
    gap: 0,
    // effect: "wave"
});

sand.setText("SAND TO TEXT");

setTimeout(() => {
    sand.setText("PARTICLE EFFECTS");
}, 3000)