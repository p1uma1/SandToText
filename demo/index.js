import Sand2Text from "sand2text";

const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

})
const sand = new Sand2Text(canvas, {
    font: "80px Verdana",
    gap: 3,
});

sand.setText("Hello");

setTimeout(() => {
    sand.setText("World");
}, 3000)