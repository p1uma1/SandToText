// canvas = document.getElementById("canvas1");

// const context = canvas.getContext('2d');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// let particles = [];

// const mouse = {
//     x: null,
//     y: null,
//     radius: 20
// }

// window.addEventListener("mousemove", (event) => {
//     mouse.x = event.x;
//     mouse.y = event.y;
// })

// context.font = '30px Verdana';
// context.fillStyle = "white";
// context.textAlign = "center";
// context.fillText("HELLO", canvas.width / 2, canvas.height / 2);

// console.log("context: ", context)

// let textCordinates = context.getImageData(0, 0, canvas.width, canvas.height);



// class Particle {
//     constructor(x, y, targetX, targetY) {
//         this.x = x;
//         this.y = y;
//         this.size = 1;
//         this.density = (Math.random() * 30) + 1;
//         this.targetX = targetX;
//         this.targetY = targetY;
//     }

//     setTarget(x, y) {
//         this.targetX = x;
//         this.targetY = y;
//     }

//     draw() {
//         context.fillStyle = 'white';
//         context.beginPath();
//         context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
//         context.closePath();
//         context.fill();
//     }

//     update() {
//         let dx = mouse.x - this.x;
//         let dy = mouse.y - this.y;
//         let distance = Math.sqrt(dx * dx + dy * dy);
//         let forceDirectionX = dx / distance;
//         let forceDirectionY = dy / distance;
//         let force = (distance - mouse.radius) / mouse.radius;
//         if (distance < 50) {
//             this.x += (forceDirectionX * force * this.density) * 0.5;
//             this.y += (forceDirectionY * force * this.density) * 0.5;
//         }
//         else {
//             if (this.x != this.targetX) {
//                 this.x += (this.targetX - this.x) / 10
//             }
//             if (this.y != this.targetY) {
//                 this.y += (this.targetY - this.y) / 10
//             }
//         }
//     }
// }
// let offsetX = 0;
// let offsetY = 0;
// let scale = 1;
// function init() {
//     particles = [];

//     for (let y = 0, y2 = textCordinates.height; y < y2; y++) {
//         for (let x = 0, x2 = textCordinates.width; x < x2; x++) {

//             if (textCordinates.data[4 * (y * textCordinates.width + x) + 3] > 128) {
//                 /*
//                 the data hold 
//                 4  8bit value for each pixel ( rgb + opacity)
//                 here im checking opacity
//                 */
//                 particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, x * scale + offsetX, y * scale + offsetY))
//             }

//         }
//     }
//     console.log(particles)
// }

// function updateText(particles) {
//     let newParticles = [];
//     for (let y = 0, y2 = textCordinates.height; y < y2; y++) {
//         for (let x = 0, x2 = textCordinates.width; x < x2; x++) {

//             if (textCordinates.data[4 * (y * textCordinates.width + x) + 3] > 100) {
//                 /*
//                 the data hold 
//                 4  8bit value for each pixel ( rgb + opacity)
//                 here im checking opacity
//                 */
//                 newParticles.push(new Particle(x * scale + offsetX, y * scale + offsetY, x * scale + offsetX, y * scale + offsetY))
//             }

//         }

//     }
//     //if new text require more particles copy the existing particles and add extented particles
//     if (newParticles.length > particles.length) {
//         for (let i = 0; i < particles.length; i++) {
//             particles[i].setTarget(newParticles[i].targetX, newParticles[i].targetY);
//         }
//         for (let i = particles.length; i < newParticles.length; i++) {
//             particles.push(newParticles[i]);
//         }
//     }
//     //if new text require less particles copy the existing particles and remove additional particles
//     else {
//         for (let i = 0; i < newParticles.length; i++) {
//             particles[i].setTarget(newParticles[i].targetX, newParticles[i].targetY);
//         }
//         particles.length = newParticles.length;
//     }
//     // console.log(particles)
// }
// window.addEventListener("resize", () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.font = '30px Verdana';
//     context.fillText("Nimsara", canvas.width / 2, canvas.height / 2);
//     textCordinates = context.getImageData(0, 0, canvas.width, canvas.height)
//     updateText(particles);
// })

// init();

// setTimeout(() => {
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     // context.font = '30px Verdana';
//     // context.fillStyle = "white";
//     // context.textAlign = "center";
//     context.fillText("Nimsara", canvas.width / 2, canvas.height / 2);
//     textCordinates = context.getImageData(0, 0, canvas.width, canvas.height)
//     updateText(particles);
// }, 3000);

// function animate() {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     particles.forEach(particle => {
//         particle.draw();
//         particle.update();
//     })

//     requestAnimationFrame(animate)
// }

// animate();

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

    draw(context) {
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.closePath();
        context.fill();
    }

    update(mouse) {
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


class Sand2Text {

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

        window.addEventListener("resize", () => {
            this.resize();
        });
        window.addEventListener(
            "mousemove",
            (event) => {

                this.mouse.x = event.x;
                this.mouse.y = event.y;

            }
        );
        this.draw();

    }


    setText(text) {
        this.text = text;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = this.font;
        this.context.fillStyle = "white";
        this.context.textAlign = "center";
        this.context.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
        const coordinates = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        this.updateParticles(coordinates);
    }


    updateParticles(textCordinates) {
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

    }

    draw() {
        const coordinates = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        this.particles = [];
        for (let y = 0, y2 = coordinates.height; y < y2; y += this.gap) {
            for (let x = 0, x2 = coordinates.width; x < x2; x += this.gap) {
                const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.particles.push(new Particle(x, y, x, y))
            }

        }

    }

    animate() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(particle => {
            particle.draw(this.context);
            particle.update(this.mouse);
        })

        requestAnimationFrame(() => {
            this.animate();
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.setText(this.text); // this will update the particles
    }
}

canvas = document.getElementById("canvas1");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

sand2text = new Sand2Text(canvas, { gap: 3 });
sand2text.setText("Hello");
sand2text.animate();


setTimeout(()=>{
    sand2text.setText("Nimsara Piumal");
},6000)

// class Sand2Text {

//     constructor(canvas, options = {}) {

//         this.canvas = canvas;
//         this.context = canvas.getContext("2d");

//         this.canvas.width = window.innerWidth;
//         this.canvas.height = window.innerHeight;

//         this.particles = [];

//         this.text = "";

//         this.font =
//             options.font || "60px Verdana";

//         this.particleSize =
//             options.particleSize || 1;

//         this.gap =
//             options.gap || 1;

//         this.mouse = {
//             x: null,
//             y: null,
//             radius: options.mouseRadius || 50
//         };


//         // mouse
//         window.addEventListener(
//             "mousemove",
//             (event) => {

//                 this.mouse.x = event.x;
//                 this.mouse.y = event.y;

//             }
//         );


//         // resize
//         window.addEventListener(
//             "resize",
//             () => this.resize()
//         );


//         this.setupContext();

//         this.animate();
//     }


//     setupContext() {

//         this.context.font = this.font;
//         this.context.fillStyle = "white";
//         this.context.textAlign = "center";
//         this.context.textBaseline = "middle";
//     }


//     setText(text) {

//         this.text = text;

//         // temporarily remove particles from canvas
//         this.context.clearRect(
//             0,
//             0,
//             this.canvas.width,
//             this.canvas.height
//         );

//         this.setupContext();

//         // temporarily draw text
//         this.context.fillText(
//             text,
//             this.canvas.width / 2,
//             this.canvas.height / 2
//         );

//         // read pixels
//         const imageData =
//             this.context.getImageData(
//                 0,
//                 0,
//                 this.canvas.width,
//                 this.canvas.height
//             );


//         const targets =
//             this.createTargets(imageData);


//         this.updateParticles(targets);
//     }


//     createTargets(imageData) {

//         const targets = [];

//         for (
//             let y = 0;
//             y < imageData.height;
//             y += this.gap
//         ) {

//             for (
//                 let x = 0;
//                 x < imageData.width;
//                 x += this.gap
//             ) {

//                 const alphaIndex =
//                     4 *
//                     (
//                         y * imageData.width +
//                         x
//                     ) +
//                     3;


//                 if (
//                     imageData.data[alphaIndex] >
//                     100
//                 ) {

//                     targets.push({
//                         x: x,
//                         y: y
//                     });

//                 }
//             }
//         }

//         return targets;
//     }


//     updateParticles(targets) {

//         /*
//          FIRST TEXT
//         */

//         if (this.particles.length === 0) {

//             for (const target of targets) {

//                 this.particles.push(
//                     new Particle(
//                         Math.random() *
//                             this.canvas.width,

//                         Math.random() *
//                             this.canvas.height,

//                         target.x,
//                         target.y,

//                         this.particleSize
//                     )
//                 );
//             }

//             return;
//         }


//         /*
//          EXISTING PARTICLES
//          get new targets
//         */

//         const sharedLength =
//             Math.min(
//                 this.particles.length,
//                 targets.length
//             );


//         for (
//             let i = 0;
//             i < sharedLength;
//             i++
//         ) {

//             this.particles[i].setTarget(
//                 targets[i].x,
//                 targets[i].y
//             );

//         }


//         /*
//          NEW TEXT NEEDS MORE
//          PARTICLES
//         */

//         if (
//             targets.length >
//             this.particles.length
//         ) {

//             for (
//                 let i = this.particles.length;
//                 i < targets.length;
//                 i++
//             ) {

//                 const target = targets[i];

//                 this.particles.push(
//                     new Particle(

//                         Math.random() *
//                             this.canvas.width,

//                         Math.random() *
//                             this.canvas.height,

//                         target.x,
//                         target.y,

//                         this.particleSize
//                     )
//                 );
//             }
//         }


//         /*
//          NEW TEXT NEEDS FEWER
//          PARTICLES
//         */

//         if (
//             targets.length <
//             this.particles.length
//         ) {

//             this.particles.length =
//                 targets.length;
//         }
//     }


//     render() {

//         this.context.clearRect(
//             0,
//             0,
//             this.canvas.width,
//             this.canvas.height
//         );


//         for (const particle of this.particles) {

//             particle.draw(this.context);

//         }
//     }


//     update() {

//         for (const particle of this.particles) {

//             particle.update(this.mouse);

//         }
//     }


//     animate() {

//         this.render();

//         this.update();

//         requestAnimationFrame(
//             () => this.animate()
//         );
//     }


//     resize() {

//         this.canvas.width =
//             window.innerWidth;

//         this.canvas.height =
//             window.innerHeight;


//         // resizing canvas resets context settings
//         this.setupContext();


//         if (this.text) {
//             this.setText(this.text);
//         }
//     }
// }