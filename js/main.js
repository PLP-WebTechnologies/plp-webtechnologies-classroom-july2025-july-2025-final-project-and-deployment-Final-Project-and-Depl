// js/main.js
// Main JavaScript file for FlavorFusion website

// Wait for the DOM to fully load before running scripts

document.addEventListener('DOMContentLoaded', () => {
    // Console log to confirm the JS file is linked and loaded correctly.
    console.log('FlavorFusion website is fully loaded and ready!');

    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Prevent actual form submission for this demo
            e.preventDefault(); 
            
            // Simple success message
            alert('Thank you for your inquiry! We will get back to you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }

    //  Active Nav Link Highlighter (for clarity) ---
    const currentPath = window.location.pathname.split('/').pop();
    console.log(currentPath); // For debugging: check the current path
    const navLinks = document.querySelectorAll('.main-nav li a');

    navLinks.forEach(link => {
        // Compare the link's href (e.g., 'index.html') to the current file name
        if (link.getAttribute('href') === currentPath || (currentPath === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});