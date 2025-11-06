// Store which emotion is selected
let selectedEmotion = null;

// Wait for page to load
window.onload = function() {
    
    // Get all circles
    var circles = document.querySelectorAll('.circle');
    
    // When you click a circle
    for (var i = 0; i < circles.length; i++) {
        circles[i].onclick = function() {
            
        
            for (var j = 0; j < circles.length; j++) {
                circles[j].classList.remove('selected');
            }
            
            // Add selected to this one
            this.classList.add('selected');
            
            // Save the emotion
            selectedEmotion = this.getAttribute('data-emotion');
            
            // Show slider
            document.getElementById('intensitySection').style.display = 'block';
        };
    }
    
    // When slider moves
    document.getElementById('intensitySlide').oninput = function() {
        document.getElementById('intensityValue').textContent = this.value;
    };
    
    // When submit button clicked
    document.getElementById('submitBtn').onclick = function() {
        
        var userName = document.getElementById('userName').value;
        var intensity = document.getElementById('intensitySlide').value;
        
        // Check name
        if (userName == '') {
            alert('Please enter your name');
            return;
        }
        
        // Check emotion
        if (selectedEmotion == null) {
            alert('Please select an emotion');
            return;
        }
        
        // Make data
        var data = {
            userName: userName,
            emotion: selectedEmotion,
            intensity: intensity
        };
        
        // Send to server
        fetch('/postDataFetch', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            // Show success
            document.getElementById('successTitle').textContent = result.status;
            document.getElementById('successMessage').innerHTML = result.message + '<br>' + result.details;
            document.getElementById('overlay').classList.add('active');
            document.getElementById('successModal').classList.add('active');
            
            // Clear form
            for (var k = 0; k < circles.length; k++) {
                circles[k].classList.remove('selected');
            }
            document.getElementById('intensitySection').style.display = 'none';
            document.getElementById('intensitySlide').value = 5;
            document.getElementById('intensityValue').textContent = '5';
            selectedEmotion = null;
        })
        .catch(function(error) {
            alert('Error: ' + error);
        });
    };
};

// Close 
function closeSuccessModal() {
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('successModal').classList.remove('active');
}