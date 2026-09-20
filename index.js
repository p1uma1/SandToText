canvas = document.getElementById("canvas1");

const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

const mouse = {
    x: null,
    y: null,
    radius: 20
}

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

context.font = '30px Verdana';
context.fillStyle = "white";
context.textAlign = "center";
context.fillText("HELLO", canvas.width / 2, canvas.height / 2);

console.log("context: ", context)

let textCordinates = context.getImageData(0, 0, canvas.width, canvas.height);



class Particle {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.size = 1;
        this.density = (Math.random() * 30) + 1;
        this.targetX = targetX;
        this.targetY = targetY;
    }

    setTarget(x, y) {
        this.targetX = x;
        this.targetY = y;
    }

    draw() {
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.closePath();
        context.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let force = (distance - mouse.radius) / mouse.radius;
        if (distance < 50) {
            this.x += (forceDirectionX * force * this.density) * 0.5;
            this.y += (forceDirectionY * force * this.density) * 0.5;
        }
        else {
            if (this.x != this.targetX) {
                this.x += (this.targetX - this.x) / 10
            }
            if (this.y != this.targetY) {
                this.y += (this.targetY - this.y) / 10
            }
        }
    }
}
let offsetX = 0;
let offsetY = 0;
let scale = 1;
function init() {
    particles = [];

    for (let y = 0, y2 = textCordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCordinates.width; x < x2; x++) {

            if (textCordinates.data[4 * (y * textCordinates.width + x) + 3] > 128) {
                /*
                the data hold 
                4  8bit value for each pixel ( rgb + opacity)
                here im checking opacity
                */
                particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, x * scale + offsetX, y * scale + offsetY))
            }

        }
    }
    console.log(particles)
}

function updateText(particles) {
    let newParticles = [];
    for (let y = 0, y2 = textCordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCordinates.width; x < x2; x++) {

            if (textCordinates.data[4 * (y * textCordinates.width + x) + 3] > 100) {
                /*
                the data hold 
                4  8bit value for each pixel ( rgb + opacity)
                here im checking opacity
                */
                newParticles.push(new Particle(x * scale + offsetX, y * scale + offsetY, x * scale + offsetX, y * scale + offsetY))
            }

        }

    }
    //if new text require more particles copy the existing particles and add extented particles
    if (newParticles.length > particles.length) {
        for (let i = 0; i < particles.length; i++) {
            particles[i].setTarget(newParticles[i].targetX, newParticles[i].targetY);
        }
        for (let i = particles.length; i < newParticles.length; i++) {
            particles.push(newParticles[i]);
        }
    }
    //if new text require less particles copy the existing particles and remove additional particles
    else {
        for (let i = 0; i < newParticles.length; i++) {
            particles[i].setTarget(newParticles[i].targetX, newParticles[i].targetY);
        }
        particles.length = newParticles.length;
    }
    // console.log(particles)
}
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '30px Verdana';
    context.fillText("Nimsara", canvas.width / 2, canvas.height / 2);
    textCordinates = context.getImageData(0, 0, canvas.width, canvas.height)
    updateText(particles);
})

init();

setTimeout(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // context.font = '30px Verdana';
    // context.fillStyle = "white";
    // context.textAlign = "center";
    context.fillText("Nimsara", canvas.width / 2, canvas.height / 2);
    textCordinates = context.getImageData(0, 0, canvas.width, canvas.height)
    updateText(particles);
}, 3000);

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.draw();
        particle.update();
    })

    requestAnimationFrame(animate)
}

animate();

class Sand2Text {

    constructor(canvasSelector, options = {}) {

        this.canvas = document.querySelector(canvasSelector);
        this.context = this.canvas.getContext("2d");

        this.particles = [];

        this.mouse = {
            x: null,
            y: null,
            radius: 50
        };
        this.font = options.font || "60px Verdana";
        this.context.fillStyle = "white";
        this.context.textAlign = "center";

        this.particleSize = options.particleSize || 1;
        this.gap = options.gap || 2;

        window.addEventListener("resize", () => {
            this.resize();
        });

    }
    setText(text) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.context.fillText(text, canvas.width / 2, canvas.height / 2);
        this.updateParticles();
    }

    createTextTargets(text) {

    }



    updateParticles() {
        let newParticles = [];
        for (let y = 0, y2 = textCordinates.height; y < y2; y++) {
            for (let x = 0, x2 = textCordinates.width; x < x2; x++) {

                if (textCordinates.data[4 * (y * textCordinates.width + x) + 3] > 100) {
                    /*
                    the data hold 
                    4  8bit value for each pixel ( rgb + opacity)
                    here im checking opacity
                    */
                    newParticles.push(new Particle(x * scale + offsetX, y * scale + offsetY, x * scale + offsetX, y * scale + offsetY))
                }

            }

        }
        //if new text require more particles copy the existing particles and add extented particles
        if (newParticles.length > this.particles.length) {
            for (let i = 0; i < particles.length; i++) {
                this.particles[i].setTarget(newParticles[i].targetX, newParticles[i].targetY);
            }
            for (let i = particles.length; i < newParticles.length; i++) {
                this.particles.push(newParticles[i]);
            }
        }
        //if new text require less particles copy the existing particles and remove additional particles
        else {
            for (let i = 0; i < newParticles.length; i++) {
                this.particles[i].setTarget(newParticles[i].targetX, newParticles[i].targetY);
            }
            this.particles.length = newParticles.length;
        }

    }

    update() {

    }

    draw() {

        this.particles = [];

        for (let y = 0, y2 = textCordinates.height; y < y2; y++) {
            for (let x = 0, x2 = textCordinates.width; x < x2; x++) {

                if (textCordinates.data[4 * (y * textCordinates.width + x) + 3] > 128) {
                    /*
                    the data hold 
                    4  8bit value for each pixel ( rgb + opacity)
                    here im checking opacity
                    */
                    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, x * scale + offsetX, y * scale + offsetY))
                }

            }
        }

    }

    animate() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.draw();
            particle.update();
        })

        requestAnimationFrame(() => {
            this.animate();
        });
    }

    resize() {

    }
}