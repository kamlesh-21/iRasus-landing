// Main JavaScript for Preksha Demo Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const bookingForm = document.getElementById('demoBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('fullName').value,
                mobile: document.getElementById('mobile').value,
                email: document.getElementById('email').value,
                business: document.getElementById('businessType').value,
                batteries: document.getElementById('batteryCount').value,
                city: document.getElementById('city').value,
                challenge: document.getElementById('mainChallenge').value,
                timestamp: new Date().toISOString(),
                source: window.location.href,
                utm_source: getUTMParameter('utm_source'),
                utm_medium: getUTMParameter('utm_medium'),
                utm_campaign: getUTMParameter('utm_campaign')
            };
            
            // Validate mobile number
            if (!/^[0-9]{10}$/.test(formData.mobile)) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            // Show loading state
            const submitBtn = bookingForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            // Send data to backend (replace with your endpoint)
            sendFormData(formData)
                .then(response => {
                    // Redirect to thank you page
                    window.location.href = 'thank-you.html';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Something went wrong. Please try again or book via WhatsApp.');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // WhatsApp booking function
    window.bookWhatsAppDemo = function() {
        const name = document.getElementById('fullName')?.value || '';
        const mobile = document.getElementById('mobile')?.value || '';
        const business = document.getElementById('businessType')?.value || '';
        const batteries = document.getElementById('batteryCount')?.value || '';
        
        const message = `Hi iRasus, I want a Preksha demo.%0A%0A*Name:* ${name}%0A*Mobile:* ${mobile}%0A*Business:* ${business}%0A*Batteries:* ${batteries}`;
        
        window.open(`https://wa.me/919313940440?text=${message}`, '_blank');
    };
    
    // UTM Parameter helper
    function getUTMParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name) || '';
    }
    
    // Form data submission (replace with your actual endpoint)
    async function sendFormData(data) {
        // Replace this with your actual API endpoint
        const endpoint = 'https://your-backend.com/api/demo-request';
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response.json();
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.pain-card, .step, .trust-card, .form-container').forEach(el => {
        observer.observe(el);
    });
    
    // Mobile menu toggle (if needed later)
    // Add mobile menu functionality here if required
    
    // Phone number formatting
    const phoneInput = document.getElementById('mobile');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) value = value.slice(0, 10);
            e.target.value = value;
        });
    }
    
    // Track form views (for analytics)
    if (bookingForm) {
        // You can send this to your analytics platform
        console.log('Form viewed at:', new Date().toISOString());
    }
});