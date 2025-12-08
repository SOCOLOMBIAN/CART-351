
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Health values
let currentPhysical = parseInt(document.getElementById('physicalBar').style.width);
let currentMental = parseInt(document.getElementById('mentalBar').style.width);

//background color depending on the bars 

function getBackgroundColor(physical,mental) {
    const avg = (physical + mental) /2

//setting the conditonals for the colors

if { (avg >= 70) {
    return 'rgb(200, 230, 255)';
    } else if (avg >= 50) {
        return 'rgb(255, 240, 200)'; // Warm yellow
    } else if (avg >= 30) {
        return 'rgb(255, 220, 200)'; // Orange
    } else {
        return 'rgb(220, 200, 200)'; // Muted red
    }
}

}