
let allAnswers = [];

const STARTING_PHYSICAL = 80;
const STARTING_MENTAL = 80;

let currentPhysical = STARTING_PHYSICAL;
let currentMental = STARTING_MENTAL;

const questionCards = document.querySelectorAll('.question-card');

function getBackgroundColor(physical, mental) {
    const avg = (physical + mental) / 2;

    if (avg >= 70) {
        return 'linear-gradient(135deg, #d6a3ff 0%, #cca2f8 100%)'; 
    } else if (avg >= 50) {
        return 'linear-gradient(135deg, #8dadff 0%, #5577ff 100%)'; 
    } else if (avg >= 30) {
        return 'linear-gradient(135deg, #ff9d6e 0%, #ff7d37 100%)'; 
    } else {
        return 'linear-gradient(135deg, #ff6b6b 0%, #ff3939 100%)'; 
    }
}

function updateBackground() {
    document.body.style.background = getBackgroundColor(currentPhysical, currentMental);
    document.body.style.transition = 'background 1.5s ease';
}

function calculateProjectedHealth() {
    let projectedPhysical = STARTING_PHYSICAL; 
    let projectedMental = STARTING_MENTAL;
    
    allAnswers.forEach(answer => {
        projectedPhysical += answer.physical;
        projectedMental += answer.mental;
    });
    
    projectedPhysical = Math.max(0, Math.min(100, projectedPhysical));
    projectedMental = Math.max(0, Math.min(100, projectedMental));
    
    return { physical: projectedPhysical, mental: projectedMental };
}

questionCards.forEach((card, questionIndex) => {
    const buttons = card.querySelectorAll('.option-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('selected'));
            
            this.classList.add('selected');
            
            const physical = parseInt(this.dataset.physical);
            const mental = parseInt(this.dataset.mental);
            
            const existingIndex = allAnswers.findIndex(a => a.questionIndex === questionIndex);
            if (existingIndex >= 0) {
                allAnswers[existingIndex] = {
                    questionIndex: questionIndex,
                    physical: physical,
                    mental: mental
                };
            } else {
                allAnswers.push({
                    questionIndex: questionIndex,
                    physical: physical,
                    mental: mental
                });
            }
            
            const projected = calculateProjectedHealth();
            currentPhysical = projected.physical;
            currentMental = projected.mental;
            updateBackground();
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            checkIfComplete();
        });
    });
});

function checkIfComplete() {
    const totalQuestions = questionCards.length;
    const submitBtn = document.getElementById('submitAll');
    
    if (allAnswers.length === totalQuestions) {
        submitBtn.disabled = false;
        submitBtn.classList.add('ready');
        
        const hint = document.querySelector('.submit-hint');
        if (hint) {
            hint.textContent = ` Ready to submit!  ${Math.round(currentPhysical)} | 🧠 ${Math.round(currentMental)}`;
            hint.style.color = 'rgb(0, 60, 116)';
            hint.style.fontWeight = 'bold';
            hint.style.fontSize = '1.1rem';
        }
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('ready');
        
        const remaining = totalQuestions - allAnswers.length;
        const hint = document.querySelector('.submit-hint');
        if (hint) {
            hint.textContent = `Answer ${remaining} more question${remaining === 1 ? '' : 's'} to continue`;
            hint.style.color = 'rgb(0, 60, 116)';
            hint.style.fontWeight = 'normal';
            hint.style.fontSize = '0.9rem';
        }
    }
}

document.getElementById('submitAll').addEventListener('click', async function() {
    this.disabled = true;
    this.textContent = 'Calculating results...';
    
    try {
        const response = await fetch('/submit_answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: allAnswers })
        });
        
        const data = await response.json();
        
        if (data.success) {
            this.textContent = 'Complete! Redirecting...';
            
            setTimeout(() => {
                window.location.href = '/end';
            }, 500);
        }
    } catch (error) {
        console.error('Error submitting answers:', error);
        alert('Something went wrong. Please try again.');
        this.disabled = false;
        this.textContent = 'Submit All Answers';
    }
});

updateBackground();
checkIfComplete();