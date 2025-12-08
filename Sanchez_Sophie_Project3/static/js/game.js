// Track all answers
let allAnswers = [];

// Starting health values 
const STARTING_PHYSICAL = 80;
const STARTING_MENTAL = 80;

// Current projected values
let currentPhysical = STARTING_PHYSICAL;
let currentMental = STARTING_MENTAL;


const questionCards = document.querySelectorAll('.question-card');

// Background color based on health with gradient transitions
function getBackgroundColor(physical, mental) {
    const avg = (physical + mental) / 2;

    if (avg >= 70) {
        return 'linear-gradient(135deg, #d6a3ffff 0%, #cca2f8ff 100%)'; 
    } else if (avg >= 50) {
        return 'linear-gradient(135deg, #8dadffff 0%, #1111f9ff 100%)'; 
    } else if (avg >= 30) {
        return 'linear-gradient(135deg, #ff7d37ff 0%, #a54d00ff 100%)'; 
    } else {
        return 'linear-gradient(135deg, #ff3939ff 0%, #ff3c3cff 100%)'; 
    }
}

function updateBackground() {
    document.body.style.background = getBackgroundColor(currentPhysical, currentMental);
    document.body.style.transition = 'background 1.5s ease';
}

// Calculate projected health based on answers so far
function calculateProjectedHealth() {
    let projectedPhysical = STARTING_PHYSICAL; 
    let projectedMental = STARTING_MENTAL;
    
    // Add up all the health changes from answers
    allAnswers.forEach(answer => {
        projectedPhysical += answer.physical;
        projectedMental += answer.mental;
    });
    
    // Keep between 0 and 100
    projectedPhysical = Math.max(0, Math.min(100, projectedPhysical));
    projectedMental = Math.max(0, Math.min(100, projectedMental));
    
    return { physical: projectedPhysical, mental: projectedMental };
}

// Add click handlers to all option buttons
questionCards.forEach((card, questionIndex) => {
    const buttons = card.querySelectorAll('.option-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all buttons in this question
            buttons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Store the answer
            const physical = parseInt(this.dataset.physical);
            const mental = parseInt(this.dataset.mental);
            
            // Update or add answer for this question
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
            
            // Update projected health and background color
            const projected = calculateProjectedHealth();
            currentPhysical = projected.physical;
            currentMental = projected.mental;
            updateBackground();
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Check if all questions are answered
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
        
        // Update hint text
        const hint = document.querySelector('.submit-hint');
        if (hint) {
            hint.textContent = `✓ Ready to submit! Your projected health: ❤️ ${Math.round(currentPhysical)} | 🧠 ${Math.round(currentMental)}`;
            hint.style.color = 'white';
            hint.style.fontWeight = 'bold';
            hint.style.fontSize = '1.1rem';
        }
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('ready');
        
        // Show how many questions left
        const remaining = totalQuestions - allAnswers.length;
        const hint = document.querySelector('.submit-hint');
        if (hint) {
            hint.textContent = `Answer ${remaining} more question${remaining === 1 ? '' : 's'} to continue`;
            hint.style.color = 'rgba(255, 255, 255, 0.9)';
            hint.style.fontWeight = 'normal';
            hint.style.fontSize = '0.9rem';
        }
    }
}

// Submit all answers
document.getElementById('submitAll').addEventListener('click', async function() {
    this.disabled = true;
    this.textContent = 'Calculating neural pathways...';
    
    try {
        const response = await fetch('/submit_answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: allAnswers })
        });
        
        const data = await response.json();
        
        if (data.success) {
            this.textContent = 'Complete! Redirecting...';
            
            // Redirect to end page
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

// Initialize - set starting background color
updateBackground();
checkIfComplete();