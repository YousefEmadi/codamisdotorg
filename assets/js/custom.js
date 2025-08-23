document.getElementById('free_session_request_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission

    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    // Replace with your Formspree endpoint
    const formUrl = 'https://formspree.io/f/myzprzjo';

    fetch(formUrl, {
        method: 'POST',
        body: JSON.stringify({ email: email }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Thank you! Your email has been sent.');
            emailInput.value = ''; // Clear the input field
        } else {
            alert('Oops! There was a problem. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});