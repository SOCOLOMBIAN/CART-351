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

try{
    let res= await fetch(url);
    let resJSON= await res.json()
    console.log('server response:', resJSON);

        if (resJSON.success) {
            // Redirect to reading page with random card
            window.location.href = '/reading?card=' + randomIndex;
        } else {
            alert('Error saving reading. Please try again.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Error saving reading. Please try again.');
    }
});





