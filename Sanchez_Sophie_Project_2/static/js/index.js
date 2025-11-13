console.log('index.js loaded');

document.addEventListener('DOMContentLoaded',async function() {
    const readingsContainer = document.getElementById('readingsContainer');
    const readingsCount= document.getElementById('readingsCount');

try{
    const response = await fetch ('/getReadings');
    const data = await response.json();

    console.log('received data:', data);

    if (data.success && data.readings && data.readings.length > 0) {
        readingsCount.textContent = data.readings.length;

        readingsContainer.innerHTML= '';

        //display the readings
        data.readings.forEach(reading => {
            const readingCard = document.createElement('div');
            readingCard.className='reading-card';

            readingCard.innerHTML= `
            <h3> ${reading.name} </h3>
            <div class= "card-name"> ${reading.cardName} </div>
            <p class="question"><strong>Question:</strong> ${reading.question}</p>
            <p class="question"><strong>Birth Month:</strong> ${reading.month}</p>
        `;

        readingsContainer.appendChild(readingCard);

        });
    } else {
        readingsCount.textContent= '0';
        readingsContainer.innerHTML= readingsContainer.innerHTML = '<p style="color: rgba(212, 191, 255, 0.7); text-align: center; grid-column: 1/-1;">No readings. Be the first!</p>';
    }
} catch (error) {
    console.error('Error fetching readings:', error);
}
});