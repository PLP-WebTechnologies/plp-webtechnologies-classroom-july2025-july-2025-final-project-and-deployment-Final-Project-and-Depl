document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('#main-nav');
    
    // Get the contact form element (will only be found on contact.html)
    const contactForm = document.getElementById('contact-form'); 

    // =============================================================
    // 1. Mobile Hamburger Menu Toggle
    // =============================================================
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Toggles the 'active' class used for CSS transitions and transforms
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // =============================================================
    // 2. Form Validation Function (contact.html)
    // =============================================================
    function validateContactForm(event) {
        // Prevent default submission initially to control the flow
        event.preventDefault(); 
        
        const form = document.getElementById('contact-form');
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const messageInput = document.getElementById('contact-message');
        
        let isValid = true;
        
        // Helper function to show/hide visual error feedback
        const setError = (inputElement, message) => {
            const formGroup = inputElement.closest('.form-group');
            let errorText = formGroup.querySelector('.error-message');

            // --- Reset previous state ---
            formGroup.classList.remove('error');
            if (errorText) errorText.remove(); 
            
            if (message) {
                // --- Set new error state ---
                formGroup.classList.add('error');
                errorText = document.createElement('p');
                errorText.className = 'error-message';
                errorText.textContent = message;
                formGroup.appendChild(errorText);
                isValid = false;
            }
        };

        // --- Validation Checks ---
        // 1. Name Check
        if (nameInput.value.trim() === "") {
            setError(nameInput, "Name is required.");
        } else {
            setError(nameInput, null); // Clear error
        }

        // 2. Email Check (Required & Format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === "") {
            setError(emailInput, "Email is required.");
        } else if (!emailRegex.test(emailInput.value.trim())) {
            setError(emailInput, "Please enter a valid email address.");
        } else {
            setError(emailInput, null); // Clear error
        }

        // 3. Message Check
        if (messageInput.value.trim() === "") {
            setError(messageInput, "Message is required.");
        } else {
            setError(messageInput, null); // Clear error
        }

        // --- Final Submission ---
        if (isValid) {
            // If ALL fields are valid, show success message and submit the form.
            alert("Success! Form is valid and submitted.");
            form.submit(); 
        }
    }

    // ATTACH THE VALIDATION FUNCTION TO THE FORM SUBMISSION EVENT
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
});