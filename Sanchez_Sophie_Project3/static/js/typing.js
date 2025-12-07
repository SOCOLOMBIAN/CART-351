// this is the part for the main entrance page where a type message 
// of the narrative will appear 

console.log('typing.js loaded');

const div = document.querySelector(".text");
const text = "Emotional Habits is a Welcome experience in which you will need to take care of your heart and brain";

function TextTypingEffect(element, text, i = 0) {
    if (i === 0) {
        element.textContent = "";
    }

    element.textContent += text[i];

    if (i === text.length - 1) {
        return;
    }

    setTimeout(() => TextTypingEffect(element, text, i + 1), 50);
}


if (div) {
    TextTypingEffect(div, text);

    setTimeout(() => {
        const prompt = document.getElementById('spacePrompt');
        if (prompt) {
            prompt.style.opacity = '1';
            prompt.style.transition = 'opacity 0.5s ease-in';
        }
    }, text.length * 50 + 500);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        window.location.href = "/create";
    }
});