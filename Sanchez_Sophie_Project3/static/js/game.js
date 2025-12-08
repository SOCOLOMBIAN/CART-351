
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

async function loadQuestion() {
    try {
        const response = await fetch('/get_question');
        const data = await response.json();
        
        if (data.game_over) {
            window.location.href = '/end';
            return;
        }
        
        if (data.week_complete) {
            showWeekComplete(data.week);
            return;
        }
        
        displayQuestion(data);
    } catch (error) {
        console.error('Error loading question:', error);
    }
}

function displayQuestion(data) {
    document.getElementById('weekNum').textContent = data.week;
    document.getElementById('questionText').textContent = data.question.q;
    
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    data.question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.text;
        btn.onclick = () => submitAnswer(option);
        container.appendChild(btn);
    });
}

async function submitAnswer(option) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    try {
        const response = await fetch('/answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ option })
        });
        
        const data = await response.json();
        
        currentPhysical = data.physical_health;
        currentMental = data.mental_health;
        
        updateHealthBars(data.physical_health, data.mental_health);
        updateBackground();
        
        setTimeout(loadQuestion, 1500);
    } catch (error) {
        console.error('Error submitting answer:', error);
    }
}

function updateHealthBars(physical, mental) {
    const physicalBar = document.getElementById('physicalBar');
    const mentalBar = document.getElementById('mentalBar');
    const physicalText = document.getElementById('physicalText');
    const mentalText = document.getElementById('mentalText');
    
    physicalBar.style.width = physical + '%';
    mentalBar.style.width = mental + '%';
    physicalText.textContent = Math.round(physical);
    mentalText.textContent = Math.round(mental);
}

function showWeekComplete(week) {
    document.getElementById('questionText').textContent = `Week ${week} Complete! Moving to next week...`;
    document.getElementById('optionsContainer').innerHTML = '';
    setTimeout(loadQuestion, 2000);
}

// Initialize
updateBackground();
loadQuestion();