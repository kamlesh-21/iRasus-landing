// Form handler specific functions

// Google Sheets integration example
const SHEET_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

async function submitToGoogleSheets(formData) {
    try {
        const response = await fetch(SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData).toString()
        });
        
        return true;
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        return false;
    }
}

// Email notification function
async function sendEmailNotification(formData) {
    // Implement email notification using your email service
    // Example with EmailJS, SendGrid, or your own backend
}

// WhatsApp notification to your team
function notifyTeamOnWhatsApp(formData) {
    const teamMessage = `📱 New Demo Request!%0A%0A*Name:* ${formData.name}%0A*Mobile:* ${formData.mobile}%0A*Business:* ${formData.business}%0A*City:* ${formData.city}%0A*Batteries:* ${formData.batteries}%0A*Source:* ${formData.source}`;
    
    // This would open WhatsApp with pre-filled message for your team
    // window.open(`https://wa.me/YOUR_TEAM_NUMBER?text=${teamMessage}`, '_blank');
}

// Form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.length < 2) {
        errors.push('Please enter your full name');
    }
    
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
        errors.push('Please enter a valid 10-digit mobile number');
    }
    
    if (!formData.business) {
        errors.push('Please select your business type');
    }
    
    if (!formData.batteries) {
        errors.push('Please select battery count range');
    }
    
    if (!formData.city || formData.city.length < 2) {
        errors.push('Please enter your city');
    }
    
    return errors;
}

// Store in localStorage as backup
function backupFormData(formData) {
    try {
        const backups = JSON.parse(localStorage.getItem('demoRequests') || '[]');
        backups.push({
            ...formData,
            backupTime: new Date().toISOString()
        });
        localStorage.setItem('demoRequests', JSON.stringify(backups.slice(-10))); // Keep last 10
    } catch (error) {
        console.error('Error backing up form data:', error);
    }
}

// Load saved form data (if page reloaded)
function loadSavedFormData() {
    try {
        const lastSubmission = localStorage.getItem('lastDemoRequest');
        if (lastSubmission) {
            const data = JSON.parse(lastSubmission);
            Object.keys(data).forEach(key => {
                const element = document.getElementById(key);
                if (element && data[key]) {
                    element.value = data[key];
                }
            });
        }
    } catch (error) {
        console.error('Error loading saved form data:', error);
    }
}

// Initialize form handler
document.addEventListener('DOMContentLoaded', function() {
    loadSavedFormData();
    
    // Auto-save form data on change
    const form = document.getElementById('demoBookingForm');
    if (form) {
        form.addEventListener('input', function(e) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            localStorage.setItem('lastDemoRequest', JSON.stringify(data));
        });
    }
});