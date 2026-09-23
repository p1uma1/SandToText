export const Effects = Object.freeze({
    BLINK: "blink",
    PULSE: "pulse",
    WAVE: "wave",
    FLICKER: "flicker",
    FLOAT: "float"
});

export const wave = (context, particle) => {
    particle.y +=
        Math.sin(particle.theta + particle.x * 0.05) * 0.5;
    context.fillStyle = 'white';
    context.beginPath();
    context.ellipse(
        particle.x,
        particle.y,
        particle.size,
        particle.size,
        0,
        0,
        Math.PI * 2
    );

    context.fill();
}

export const pulse = (context, particle) => {

    context.fillStyle = 'white';
    context.globalAlpha =
        Math.abs(Math.sin(particle.theta));
    context.beginPath();
    context.ellipse(
        particle.x,
        particle.y,
        particle.size,
        particle.size,
        0,
        0,
        Math.PI * 2
    );

    context.fill();
}

export const flicker = (context, particle) => {

    context.fillStyle = 'white';
    context.globalAlpha =
        Math.random();
    context.beginPath();
    context.ellipse(
        particle.x,
        particle.y,
        particle.size,
        particle.size,
        0,
        0,
        Math.PI * 2
    );

    context.fill();
}

export const noEffect = (context, particle) => {
    context.fillStyle = 'white';
    context.beginPath();
    context.ellipse(
        particle.x,
        particle.y,
        particle.size,
        particle.size,
        0,
        0,
        Math.PI * 2
    );

    context.fill();
}

export const blink = (context, particle) => {

    context.fillStyle = 'white';
    context.globalAlpha =
        Math.round(Math.sin(particle.theta*2));
    context.beginPath();
    context.ellipse(
        particle.x,
        particle.y,
        particle.size,
        particle.size,
        0,
        0,
        Math.PI * 2
    );

    context.fill();
}
