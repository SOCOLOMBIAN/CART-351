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
if (!name) {
    showMessage('Please enter your name! ✨', 'error');
    return;
        }
        
if (!month) {
    showMessage('Please select your birth month! 🌙', 'error');
        return;
        }
        
 if (!question) {
    showMessage('Please ask a question! 🔮', 'error');
    return;
        }

    const userData= {
        name:name,
        month:month,
        question:question
    };

    console.log('user data saving', userData);


    showMessage('Information saved! Preparing your cards... 🌟', 'success');

});

// function message display 
function showMessage(text, type) {
    messageDiv.textContent=text;
    messageDiv.className='message' +type;
    messageDiv.classList.remove('hidden');

    console.log('message: ${text} (${type})');
}

});
