// this is the tarot card data for the messages

console.log('cards.js loaded');

// tarot card data
const tarotCards = [
    { name: "Mystic Moon", message: "Trust your intuition. The answers you search are within you, illuminated by the moon's gentle light." },
    { name: "Cosmic Star", message: "Hope and renewal. Believe in the possibilities." },
    { name: "Special Sun", message: "Clarity and success await you. The warmth of the sun reveals the truth you need to see." },
    { name: "Ancient Tree", message: "Growth comes from patience and nurturing." },
    { name: "Moving River", message: "Go with the flow. The universe is guiding you on a journey of transformation." },
    { name: "Continuous Flame", message: "Something special will rise. Embrace change with courage." },
    { name: "sparkling Heart", message: "Follow what makes you happy, don't overthink." }
];

document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.getElementById('cardContainer');


    tarotCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className= 'tarot-card';
        cardElement.dataset.index = index;

        cardElement.innerHTML = `
        <div class= "card-inner">
            <div class="card-in">?</div>
        
        `;
    
        cardElement.addEventListener('click', function() {
            selectCard(index);
        });

        cardContainer.appendChild(cardElement);
    });
});

// query to get the cards
async function selectCard(cardIndex) {
    const selectCard= tarotCards[cardIndex];

    console.log('selected card', selectCard);

    const params = {
        cardName: selectCard.name,
        cardMessage: selectCard.message,
    };

    const queryParams = new URLSearchParams(params).toString();
    const url= `/saveCardData?${queryParams}`;

    console.log('sending', url);

    try{
        let res= await fetch(url);
        let resJSON = await res.json();
        console.log('response', resJSON);

        if (resJSON.success) { 
            window.location.href = '/reading?card=' + cardIndex;
        } else { 
            console.error('error saving reading, try again');
        }
} catch (err) {
    console.error('failed', err)
}
}