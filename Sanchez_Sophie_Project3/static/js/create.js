// animation of the canvas 

const canvas= document.getElementById('characterCanvas');
const ctx= canvas.getContext('2d')


let shadow = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 60,
    speedX: 2,
    speedY: 1.5,
}

