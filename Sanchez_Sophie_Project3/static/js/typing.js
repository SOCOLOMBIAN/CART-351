// this is the part for the main entrance page where a type message 
// of the narrative will appear 

console.log('typing.js loaded');


    const div = document.querySelector(".text")
    const text= " Emotions Habits is a Welcome experience in wich you will need to take care of your heart and brain";

    function TextTypingEffect(element,text, i = 0) {
    if (i === 0 ) {
        element.textContent = "";
    }

    element.textContent += text[i];

    if (i === text.length -1 ) {
    return;
    }

    setTimeout(() => TextTypingEffect(element,text, i + 1), 50);  

    // i got help for this part from IA because the typing effect and tab wasn't working
    if (div) {
        TextTypingEffect(div,text);

        setTimeout(() => {
        const prompt = document.getElementById('spacePrompt');
        if (prompt) {
            prompt.style.opacity = '1';
        }
    }, text.length * 50 + 500);  
}

     document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            window.location.href = "/create";
        }
    });

}

