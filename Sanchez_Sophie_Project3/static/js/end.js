const submitBtn = document.getElementById('submitReflection');
const reflectionText = document.getElementById('reflectionText');

submitBtn.addEventListener('click', async () => {
    const reflection = reflectionText.value.trim();
    
    if (!reflection) {
        alert('Please write something about your experience!');
        return;
    }
    
    //main logic to submit the personal reflections after finish the game 
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sharing...';
        
        const response = await fetch('/submit_reflection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reflection })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Thank you for sharing your story ☺︎');
            window.location.href = '/reflections';
        }
    } catch (error) {
        console.error('Error submitting reflection:', error);
        alert('Please try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Share My Story';
    }
});