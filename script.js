// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Form validation
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('form-message');

    if (!name || !email || !message) {
        formMessage.textContent = 'All fields are required!';
        formMessage.style.color = 'red';
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMessage.textContent = 'Please enter a valid email!';
        formMessage.style.color = 'red';
        return false;
    }

    formMessage.textContent = 'Message sent successfully!';
    formMessage.style.color = 'green';
    return true;
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate="fade-in"]');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            element.style.animationDelay = '0.2s';
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize menu toggle
    document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);

    // Initialize scroll animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger on load
});
