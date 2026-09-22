export const Effects = Object.freeze({
    BLINK: "blink",
    PULSE: "pulse",
    WAVE: "wave",
    FLICKER: "flicker",
    FLOAT: "float"
});

export const blink = (context,particle)=>{
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

export const noEffect = (context,particle)=>{
    
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
    
