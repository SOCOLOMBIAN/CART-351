// this is the part for the main entrance page where a type message 
// of the narrative will appear 

console.log('typing.js loaded');


    const div = document.querySelector(".text")
    const text= " Welcome to the experience in wich you will need to take care of your heart and brain";

    function TextTypingEffect(element,text, i = 0) {
    if (i === 0 ) {
        element.textContent = "";
    }

    element.textContent += text[i];

    if (i === text.length -1 ) {
    return;
    }

    setTimeout(() => TextTypingEffect(element,text, i + 1), 50);  

}

TextTypingEffect(div, text);