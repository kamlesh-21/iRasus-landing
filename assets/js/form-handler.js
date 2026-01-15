// assets/js/form-handler.js
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form[action="https://api.web3forms.com/submit"]');
  const resultDiv = document.getElementById('form-result');

  if (!form) {
    console.error('Form not found!');
    return;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Show loading message
    if (resultDiv) {
      resultDiv.style.color = '#0A1E5E';
      resultDiv.innerHTML = 'Submitting... Please wait...';
    }

    // Collect form data
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const data = await response.json();

      if (data.success) {
        // Success → Redirect to your thank-you page
        window.location.href = '/thank-you.html';
        // You can also show a message instead:
        // resultDiv.innerHTML = 'Thank you! Redirecting...';
      } else {
        // Error from Web3Forms
        resultDiv.style.color = '#FF6B35';
        resultDiv.innerHTML = data.message || 'Something went wrong. Please try again.';
      }
    } catch (error) {
      // Network or other error
      console.error('Submission error:', error);
      resultDiv.style.color = '#FF6B35';
      resultDiv.innerHTML = 'Error: Could not connect. Please check your internet.';
    }
  });
});