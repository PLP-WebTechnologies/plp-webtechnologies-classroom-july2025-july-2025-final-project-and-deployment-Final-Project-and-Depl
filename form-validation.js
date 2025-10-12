// =============================================
// EcoCharge Website - Form Validation
// Custom form validation with user-friendly feedback
// =============================================

/**
 * Contact Form Validation
 * @returns {boolean} - True if form is valid
 */
function validateContactForm() {
    const form = document.getElementById('contactForm');
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (!name.value.trim()) {
        showError(name, nameError, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, nameError, 'Name must be at least 2 characters');
        isValid = false;
    } else {
        showSuccess(name, nameError);
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.value.trim()) {
        showError(email, emailError, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, emailError, 'Please enter a valid email address');
        isValid = false;
    } else {
        showSuccess(email, emailError);
    }
    
    // Validate message
    const message = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    if (!message.value.trim()) {
        showError(message, messageError, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, messageError, 'Message must be at least 10 characters');
        isValid = false;
    } else {
        showSuccess(message, messageError);
    }
    
    return isValid;
}

/**
 * Show error state for form field
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} errorElement - The error message element
 * @param {string} message - The error message
 */
function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

/**
 * Show success state for form field
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} errorElement - The error message element
 */
function showSuccess(input, errorElement) {
    input.classList.add('success');
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

/**
 * Simulate form submission (replace with actual API call)
 */
function simulateFormSubmission() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset form (for demo purposes)
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Remove validation classes
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.classList.remove('success', 'error');
            });
        }, 5000); // Show success for 5 seconds
    }, 2000); // Simulate 2 second API call
}

/**
 * Real-time validation for form fields
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        // Real-time validation for name
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                validateNameField(this);
            });
        }
        
        // Real-time validation for email
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                validateEmailField(this);
            });
        }
        
        // Real-time validation for message
        const messageInput = document.getElementById('message');
        if (messageInput) {
            messageInput.addEventListener('blur', function() {
                validateMessageField(this);
            });
        }
    }
});

/**
 * Individual field validation functions
 */
function validateNameField(input) {
    const errorElement = document.getElementById('nameError');
    if (!input.value.trim()) {
        showError(input, errorElement, 'Name is required');
    } else if (input.value.trim().length < 2) {
        showError(input, errorElement, 'Name must be at least 2 characters');
    } else {
        showSuccess(input, errorElement);
    }
}

function validateEmailField(input) {
    const errorElement = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!input.value.trim()) {
        showError(input, errorElement, 'Email is required');
    } else if (!emailRegex.test(input.value)) {
        showError(input, errorElement, 'Please enter a valid email address');
    } else {
        showSuccess(input, errorElement);
    }
}

function validateMessageField(input) {
    const errorElement = document.getElementById('messageError');
    if (!input.value.trim()) {
        showError(input, errorElement, 'Message is required');
    } else if (input.value.trim().length < 10) {
        showError(input, errorElement, 'Message must be at least 10 characters');
    } else {
        showSuccess(input, errorElement);
    }
}

// Add CSS for validation states
const style = document.createElement('style');
style.textContent = `
    .success {
        border-color: var(--success-color) !important;
    }
    
    .error {
        border-color: var(--error-color) !important;
    }
`;
document.head.appendChild(style);