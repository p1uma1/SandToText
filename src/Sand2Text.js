import Particle from "./Particle";

export default class Sand2Text {

    constructor(canvas, options = {}) {

        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");

        this.particles = [];
        this.text = "";
        this.mouse = {
            x: null,
            y: null,
            radius: 50
        };
        this.effect = options.effect|| "default";

        this.scale = options.scale || 1;
        this.offsetX = options.offsetX || 0;
        this.offsetY = options.offsetY || 0;
        this.font = options.font || "60px Verdana";
        this.context.font = this.font;
        this.context.fillStyle = "white";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";

        this.particleSize = options.particleSize || 1;
        this.gap = options.gap || 2;

        this.blockOscillate = true;

        this.resizeObserver = new ResizeObserver(() => {
            this.resize();
        });

        this.resizeObserver.observe(this.canvas);
        window.addEventListener(
            "mousemove",
            (event) => {

                this.mouse.x = event.x;
                this.mouse.y = event.y;

            }
        );
        this.draw();
        this.animate();

    }

    //this let partciles to reset the theta,positions to sync when new particles added
    sync(){
        this.particles.forEach((particle)=>{
            particle.reset();
        })
    }

    spread() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].setTarget(Math.random() * this.canvas.width, (Math.random() * this.canvas.height));
        }
    }


    setText(text) {
        this.text = text;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = this.font;
        this.context.fillStyle = "white";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
        const coordinates = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        this.updateParticles(coordinates);
    }


    updateParticles(textCordinates) {
        this.blockOscillate = true;
        let newParticles = [];
        for (let y = 0, y2 = textCordinates.height; y < y2; y += this.gap) {
            for (let x = 0, x2 = textCordinates.width; x < x2; x += this.gap) {

                if (textCordinates.data[4 * (y * textCordinates.width + x) + 3] > 100) {
                    /*
                    the data hold 
                    4  8bit value for each pixel ( rgb + opacity)
                    here im checking opacity
                    */
                    newParticles.push(new Particle(x * this.scale + this.offsetX, y * this.scale + this.offsetY, x * this.scale + this.offsetX, y * this.scale + this.offsetY))
                }

            }

        }
        //if new text require more particles copy the existing particles and add extented particles
        if (newParticles.length > this.particles.length) {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].setTarget(newParticles[i].targetX, newParticles[i].targetY);
            }
            for (let i = this.particles.length; i < newParticles.length; i++) {
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
        this.sync();

        this.blockOscillate = false;

    }

    draw() {
        this.blockOscillate = true;
        const coordinates = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        this.particles = [];
        for (let y = 0, y2 = coordinates.height; y < y2; y += this.gap) {
            for (let x = 0, x2 = coordinates.width; x < x2; x += this.gap) {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                this.particles.push(new Particle(x, y, x, y))
            }

        }
        this.blockOscillate = false;

    }

    animate() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(particle => {
            particle.draw(this.context,this.effect);
            particle.update(this.mouse);
            if (!this.blockOscillate)
                particle.oscilate();
        })

        requestAnimationFrame(() => {
            this.animate();
        });
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.setText(this.text); // this will update the particles
    }
}