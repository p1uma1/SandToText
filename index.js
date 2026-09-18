canvas = document.getElementById("canvas1");

const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

context.font = '30px Verdana';
context.fillStyle = "white";
context.fillText('A', 20, 40)

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.density = (Math.random() * 30) + 1;
        this.targetX = this.x;
        this.targetY = this.y;
    }

    draw() {
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.closePath();
        context.fill();
    }
}

function init() {
    particles = [];
    for(let i = 0 ; i<10;i++){
        particles.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height));
    }
    console.log(particles)
}
init();

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.draw();
    })
    
    requestAnimationFrame(animate)
}

animate();