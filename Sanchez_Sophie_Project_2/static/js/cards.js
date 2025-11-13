// this is the tarot card data for the messages

console.log('cards.js loaded');

const tarotCards = [
    { name: "Mystic Moon", message: "Trust your intuition. The answers you search are within you, illuminated by the moon's gentle light." },
    { name: "Cosmic Star", message: "Hope and renewal. Believe in the possibilities." },
    { name: "Special Sun", message: "Clarity and success await you. The warmth of the sun reveals the truth you need to see." },
    { name: "Ancient Tree", message: "Growth comes from patience and nurturing." },
    { name: "Moving River", message: "Go with the flow. The universe is guiding you on a journey of transformation." },
    { name: "Continuous Flame", message: "Something special will rise. Embrace change with courage." }
];

document.addEventListener('DOMContentLoaded', async function() {
    console.log('Page loaded — creating your card...');

//function get a random card
const randomIndex=Math.floor(Math.random() * tarotCards.length);
const selectedCard= tarotCards[randomIndex];

console.log('Random card drawn:', selectedCard);

const params = {
    cardName: selectedCard.name,
    cardMessage: selectedCard.message,
};

const queryParams = new URLSearchParams(params).toString();
const url = `/saveCardData?${queryParams}`;

console.log('Sending request to:', url);

fetch(url)
    .then(res => res.json())
    .then(resJSON => {
        console.log('Server response:', resJSON);

        if (resJSON.success) {
            console.log('Success! Redirecting to reading page...');
                // Redirect to reading page with card index
            window.location.href = '/reading?card=' + randomIndex;
            } else {
                console.error('Server returned error:', resJSON.message);
                alert('Error saving reading: ' + resJSON.message);
            }
        })
        .catch(err => {
            console.error('Fetch error:', err);
            alert('Error connecting to server. Please try again.');
        });
}
)