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
context.fillText('HELLO', 40, 20)

const textCordinates = context.getImageData(0,0,100,100)

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 1;
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

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let force = (distance - mouse.radius) / mouse.radius;
        if (distance < 50) {
            this.x += forceDirectionX * force * this.density;
            this.y += forceDirectionY * force * this.density;
        }
        else {
            if(this.x !=this.targetX){
                this.x += (this.targetX-this.x)/10
            }
            if(this.y !=this.targetY){
                this.y += (this.targetY-this.y)/10
            }
        }
    }
}

function init() {
    particles = [];

    for( let y=0, y2 = textCordinates.height; y<y2; y++){
        for(let x =0, x2 = textCordinates.width; x<x2;x++){

            if(textCordinates.data[4*(y*textCordinates.width+x)]>128){
                /*
                the data hold 
                4  8bit value for each pixel ( rgb + opacity)
                here im checking opacity
                */
                particles.push(new Particle(x,y))
            }
            
        }
    }
    console.log(particles)
}
init();

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.draw();
        particle.update();
    })

    requestAnimationFrame(animate)
}

animate();