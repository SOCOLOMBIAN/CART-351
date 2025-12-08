// Animation of the canvas 

const canvas = document.getElementById('characterCanvas');
const ctx = canvas.getContext('2d');

class Shadow {
    constructor() {
        this.x = canvas.width ;
        this.y = canvas.height;
        this.targetX = this.x;
        this.targetY = this.y;
        this.size = 60;
        this.speed = 3;
        this.breathe = 0;
    }

    update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
        
        this.breathe += 0.08;

        if (distance < 5 && Math.random() < 0.02) {
            this.targetX = 100 + Math.random() * (canvas.width - 200);
            this.targetY = 100 + Math.random() * (canvas.height - 200);
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        // Breathing effect
        const breatheSize = this.size + Math.sin(this.breathe) * 5;

        // Shadow body
        const gradient = ctx.createRadialGradient(0, -10, 0, 0, 0, breatheSize);
        gradient.addColorStop(0, 'rgba(178, 178, 247, 0.95)');
        gradient.addColorStop(1, 'rgba(55, 55, 118, 0.98)');
        
        ctx.beginPath();
        ctx.arc(0, 0, breatheSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

    
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(179, 179, 255, 1)';
        ctx.fill();
        
       
        ctx.shadowBlur = 0;

        // Eyes positioning
        const eyeY = -15;  
        const eyeSpacing = 18;  
        // Draw eye
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.arc(-eyeSpacing, eyeY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eyeSpacing, eyeY, 8, 0, Math.PI * 2);
        ctx.fill();

        // White of eyes
        ctx.fillStyle = 'rgba(200, 200, 220, 0.95)';  
        ctx.beginPath();
        ctx.arc(-eyeSpacing, eyeY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eyeSpacing, eyeY, 7, 0, Math.PI * 2);
        ctx.fill();

        // Pupils 
        ctx.fillStyle = 'rgba(50, 50, 100, 1)';  
        ctx.beginPath();
        ctx.arc(-eyeSpacing, eyeY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eyeSpacing, eyeY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Mouth 
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';  
        ctx.lineWidth = 3; 
        ctx.beginPath();
        ctx.arc(0, 10, 10, 0.3, Math.PI - 0.3); 
        ctx.stroke();

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

// Mouse interaction - shadow follows cursor
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    shadow.targetX = e.clientX - rect.left;
    shadow.targetY = e.clientY - rect.top;
});

// Form submission
const startButton = document.getElementById('startJourney');
const nameInput = document.getElementById('characterName');
const degreeInput = document.getElementById('characterDegree');

startButton.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const degree = degreeInput.value.trim();

    if (!name || !degree) {
        alert('Please fill in both fields!');
        return;
    }

    try {
        const response = await fetch('/character', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, degree })
        });
        
        const data = await response.json();
        
        if (data.good) {
            window.location.href = '/game';
        }
    } catch (error) {
        console.error('Error creating character:', error);
        alert('Please try again.');
    }
});