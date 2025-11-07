console.log('register.js loaded');

document.addEventListener('DOMContentLoaded', function() {

//get form and the message elements 
const userForm= document.getElementById('userForm');
const messageDiv= document.getElementById('message');

userForm.form.addEventListener('submit',function(e) {
    e.preventDefault();


//get the form information 
const name= document.getElementById('name').value;
const month= document.getElementById('month').value;
const question= document.getElementById('question').value.trim();

        // Validation
if (!name) return showMessage('Please enter your name! ✨', 'error');
if (!month) return showMessage('Please select your birth month! 🌙', 'error');
if (!question) return showMessage('Please ask a question! 🔮', 'error');

const userData= {
        name:name,
        month:month,
        question:question
    };

    console.log('user data saving', userData);

    showMessage('Information saved! Preparing your cards... 🌟', 'success');
    //pass userData to card 
    displayCard(userData);

});

// function message display 
function showMessage(text, type) {
    messageDiv.textContent=text;
    messageDiv.className='message' +type;
    messageDiv.classList.remove('hidden');

    console.log('message: ${text} (${type})');
}

});
