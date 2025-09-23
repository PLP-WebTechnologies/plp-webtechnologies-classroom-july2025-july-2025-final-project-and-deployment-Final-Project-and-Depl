// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Contact Form Validation + Success Toast
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showToast("Please fill in all fields.", "error");
        return false;
    }

    // Very basic email check
    if (!email.includes('@')) {
        showToast("Please enter a valid email.", "error");
        return false;
    }

    // If everything is good, show success message
    showToast("✅ Thank you, " + name + "! Your message has been sent.", "success");

    // Reset the form fields
    document.querySelector('.contact-form').reset();

    return false; // Prevents actual form submission (no page reload)
}

// Toast Notification Function
function showToast(message, type) {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }

    // Create toast message
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerText = message;

    toastContainer.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
