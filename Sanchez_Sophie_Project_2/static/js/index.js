console.log('index.js loaded');

document.addEventListener('DOMContentLoaded',async function() {
    const readingsContainer = document.getElementById('readingsContainer');
    const readingsCount= this.documentElement('readingsCount');

try{
    const response = await fetch ('/getReadings');
    const data = await response.json();

    console.log('received data:', data);

    if (data.success && data.readings && data.readings.length > 0) {
        readingsCount.textContent = data.readings.length;

        readingsContainer.innerHTML= '';
    }

}






}
)