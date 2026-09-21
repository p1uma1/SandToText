export default class Particle {
    constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.size = 1;
        this.density = (Math.random() * 30) + 1;
        this.targetX = targetX;
        this.targetY = targetY;
        this.theta = x;
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
        if (mouse.x === null || mouse.y === null) {
    this.x += (this.targetX - this.x) / 10;
    this.y += (this.targetY - this.y) / 10;
    return;
}
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance === 0) return;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let force = (distance - mouse.radius) / mouse.radius;
        if (distance < 50) {
            this.x += (forceDirectionX * force * this.density) * 0.5;
            this.y += (forceDirectionY * force * this.density) * 0.5;
        }
        else {
            if (this.x != this.targetX) {
                this.x += (this.targetX - this.x) / 20
            }
            if (this.y != this.targetY) {
                this.y += (this.targetY - this.y) / 20
            }
            
        }
    }

    oscilate(){
        
                this.x += Math.cos(this.theta);
                this.y += Math.sin(this.theta);
                this.theta += 0.001;
            
    }
}
