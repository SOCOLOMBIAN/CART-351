// Track all answers
let allAnswers = [];

// Starting health values
let currentPhysical = 80;
let currentMental = 80;

// Initialize - questions are already loaded from the template
const questionCards = document.querySelectorAll('.question-card');

// Background color based on health
function getBackgroundColor(physical, mental) {
    const avg = (physical + mental) / 2;

    if (avg >= 70) {
        return 'rgba(205, 233, 255, 1)'; // Light blue - healthy
    } else if (avg >= 50) {
        return 'rgba(255, 229, 159, 1)'; // Yellow - okay
    } else if (avg >= 30) {
        return 'rgba(255, 175, 128, 1)'; // Orange - struggling
    } else {
        return 'rgba(255, 151, 151, 1)'; // Red - critical
    }
}

function updateBackground() {
    document.body.style.backgroundColor = getBackgroundColor(currentPhysical, currentMental);
    document.body.style.transition = 'background-color 1s ease';
}

// Calculate projected health based on answers so far
function calculateProjectedHealth() {
    let projectedPhysical = 80; 
    let projectedMental = 80;    // Starting value
    
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
            hint.textContent = 'Ready to submit! Click the button above';
            hint.style.color = 'rgb(0, 60, 116)';
            hint.style.fontWeight = 'bold';
        }
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('ready');
        
        // Show how many questions left
        const remaining = totalQuestions - allAnswers.length;
        const hint = document.querySelector('.submit-hint');
        if (hint) {
            hint.textContent = `Answer ${remaining} more question${remaining === 1 ? '' : 's'} to continue`;
            hint.style.color = 'rgb(0, 60, 116)';
            hint.style.fontWeight = 'normal';
        }
    }
}

// Submit all answers
document.getElementById('submitAll').addEventListener('click', async function() {
    this.disabled = true;
    this.textContent = 'Calculating results...';
    
    try {
        const response = await fetch('/submit_answers', {
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