// this is the tarot card data for the messages

console.log('cards.js loaded');

const tarotCards=[

    { name: "Mystic Moon", messsage:  "Trust your intuition. The answers you search are within you, illuminated by the moon's gentle light."},

    { name: "Cosmic Star", messsage:"Hope and renewal, Believe in the possibilities. "},

    { name: "Special Sun", messsage:"Clarity and success await you. The warmth of the sun reveals the truth you need to see. "},

    { name: "Ancient Tree", messsage:" Growth comes from patience and nurturing."},

    { name: "Moving River", messsage:" Go with the flow. The universe is guiding you on a journey of transformation. "},
    
    { name: " continuos Flame", messsage:" something special will rise. Embrace change with courage. "},

];
document.addEventListener('DOMContentLoaded',function() {
    const cardContainer = document.getElementById('cardContainer');

//get the user data from the session storage 
    const userData = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    if (!userData.name) return console.error('No user data found!');

    if (userData.name) {
        userName.textContent = `Hello, ${userData.name}! `;
    }

//function get a random card 
function getRandomCard() {
    const randomIndex=Math.floor(Math.random() * tarotCards.length);
    return tarotCards[randomIndex];
    }

//display the card
function displayCard() {
    cardContainer.innerHTML= '';

    const card = getRandomCard();

    const cardElement= document.createElement('div');
    cardElement.className= 'tarot-card selected';
    cardElement.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <h2>${card.name}</h2>
                <p>${card.message}</p>
                </div>
            </div>
        `;
        cardContainer,appendChild(cardElement);

        const readingData = {
            name: userData.name,
            month:userData.month,
            question:userData.question,
            selectedCard:card.name,
            cardMessage:card.message

        };

            // Send to server
        fetch('/postDataFetch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(readingData)
        })
        .then(res => res.json())
        .then(result => console.log('Server response:', result))
        .catch(err => console.error('Error sending data:', err));
    }

    displayCard();

// Draw another card
    const drawButton = document.getElementById('drawCard');
    if (drawButton) drawButton.addEventListener('click', displayCard);
});





