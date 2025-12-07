// animation of the canvas 

const canvas= document.getElementById('characterCanvas');
const ctx= canvas.getContext('2d')

class Shadow {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height /2;
        this.targetX = this.x;
        this.targetY = this.y;
        this.size = 60;
        this.speed = 3;
        this.shadow = 0;

    }

    update() {

        const dx = this.targetX - this.x;
        const dy= this.targetY - this.y;
        //
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
         
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }

        this.shadow += 0.08;

        if (distance < 5 && Math.random() < 0.02) {
            this.targetX = 100 + Math.random() * (canvas.width - 200);
            this.targetY = 100 + Math.random() * (canvas.height - 200);
        }
    }

    draw() {

        ctx.save();
        ctx.translate(this.x,this.y);

        const gradient = ctx.createRadialGradient(0, -10, 0, 0, 0, breatheSize);
        gradient.addColorStop(0, 'rgba(30, 30, 50, 0.95)');
        gradient.addColorStop(0.5, 'rgba(40, 40, 70, 0.85)');
        gradient.addColorStop(1, 'rgba(20, 20, 40, 0.6)');
        ctx.fillStyle = gradient;
        ctx.fill();

        //color of the shadow 
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(100, 100, 150, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;

        //eyes
        const eyeY = -this.shadow * 0.3;
        const eyeSpace = this.shadow * 0.4;

        ctx.fillStyle = 'rgba(150, 150, 200, 0.7)';
        ctx.beginPath();
        ctx.arc(-eyeSpace, eyeY, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(eyeSpace, eyeY, 6, 0, Math.PI * 2);
        ctx.fill();

        //pupil 
        ctx.fillStyle = 'rgba(200, 200, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(-eyeSpacing, eyeY, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(eyeSpace, eyeY, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

    }

}

const shadow = new Shadow();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    shadow.update();
    shadow.draw();
    
    requestAnimationFrame(animate);
}

animate();

// this part 
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    shadow.targetX = e.clientX - rect.left;
    shadow.targetY = e.clientY - rect.top;
});