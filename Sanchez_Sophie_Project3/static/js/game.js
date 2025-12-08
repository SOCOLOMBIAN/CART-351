
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Health values
let currentPhysical = parseInt(document.getElementById('physicalBar').style.width);
let currentMental = parseInt(document.getElementById('mentalBar').style.width);

//background color depending on the bars 

function getBackgroundColor(physical,mental) {
    const avg = (physical + mental) /2

//setting the conditonals for the colors

if (avg >= 70) {
    return 'rgba(205, 233, 255, 1)';
 } else if (avg >= 50) {
    return 'rgba(255, 229, 159, 1)'; 
} else if (avg >= 30) {
    return 'rgba(255, 175, 128, 1)'; 
} else {
    return 'rgba(255, 151, 151, 1)'; 
    }
}

function updateBackground() {
    document.body.style.backgroundColor = getBackgroundColor(currentPhysical,currentMental);
    document.body.style.transition= 'background-color 1s ease'; // this part was a suggestion that i have for the transition of the background 
}

