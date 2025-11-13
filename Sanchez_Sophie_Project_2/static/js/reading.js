console.log('reading.js loaded');

// Tarot card data (must match cards.js)
const tarotCards = [
    { name: "Mystic Moon", message: "Trust your intuition. The answers you search are within you, illuminated by the moon's gentle light." },
    { name: "Cosmic Star", message: "Hope and renewal. Believe in the possibilities." },
    { name: "Special Sun", message: "Clarity and success await you. The warmth of the sun reveals the truth you need to see." },
    { name: "Ancient Tree", message: "Growth comes from patience and nurturing." },
    { name: "Moving River", message: "Go with the flow. The universe is guiding you on a journey of transformation." },
    { name: "Continuous Flame", message: "Something special will rise. Embrace change with courage." }
];

document.addEventListener('DOMContentLoaded', function() {
    // Get card index from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const cardIndex = urlParams.get('card');
    
    console.log('Card index from URL:', cardIndex);
    
    if (cardIndex !== null && tarotCards[cardIndex]) {
        const selectedCard = tarotCards[cardIndex];
        document.getElementById('cardName').textContent = selectedCard.name;
        document.getElementById('cardMessage').textContent = selectedCard.message;
        console.log('Displaying card:', selectedCard);
    } else {
        console.log('No card index found or invalid index');
    }
});

function newReading() {
    window.location.href = '/register';
}