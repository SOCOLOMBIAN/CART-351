console.log('reading.js loaded');

document.addEventListener('DOMContentLoaded', function() {
// Get card index from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const cardIndex = urlParams.get('card');

    console.log('Card index from URL:', cardIndex);

// Make sure tarotCards is loaded from cards.js
    if (typeof tarotCards !== 'undefined' && cardIndex !== null && tarotCards[cardIndex]) {
        const selectedCard = tarotCards[cardIndex];
        document.getElementById('cardName').textContent = selectedCard.name;
        document.getElementById('cardMessage').textContent = selectedCard.message;
        console.log('Displaying card:', selectedCard);
    } else {
        console.log('No card index found or tarotCards not loaded properly');
    }
});

// Function to start a new reading
function newReading() {
    window.location.href = '/register';
}
