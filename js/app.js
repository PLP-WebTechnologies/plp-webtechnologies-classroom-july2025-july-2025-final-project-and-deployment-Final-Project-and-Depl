document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THEME TOGGLE (NEW) ---
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Function to apply the saved theme on load
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }
    }

    // Function to toggle the theme
    function toggleTheme() {
        body.classList.toggle('dark-mode');
        // Save the new theme preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }

    // Apply theme on load
    applySavedTheme();

    // Add click event to the toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }


    // --- 2. MOBILE NAVIGATION TOGGLE (No changes) ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }


    // --- 3. TYPING EFFECT (No changes) ---
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        // ... (typing effect code from before is unchanged) ...
        const words = ['Frontend Developer', 'Web Designer', 'Lifelong Learner'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; }
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentWord.length) { setTimeout(() => { isDeleting = true; }, 1500); }
            }
            const typeSpeed = isDeleting ? 100 : 150;
            setTimeout(type, typeSpeed);
        }
        type();
    }


    // --- 4. CONTACT FORM VALIDATION (No changes) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // ... (all form validation code from before is unchanged) ...
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const successMessage = document.getElementById('form-success');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();
            let isValid = true;

            if (name.value.trim() === '') { showError(name, 'Please enter your name.'); isValid = false; }
            if (email.value.trim() === '') { showError(email, 'Please enter your email.'); isValid = false; }
            else if (!isValidEmail(email.value)) { showError(email, 'Please enter a valid email address.'); isValid = false; }
            if (message.value.trim() === '') { showError(message, 'Please enter a message.'); isValid = false; }

            if (isValid) {
                console.log('Form submitted:', { name: name.value, email: email.value, message: message.value });
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
            }
        });
        function showError(input, message) { /* ... */ }
        function clearErrors() { /* ... */ }
        function isValidEmail(email) { /* ... */ }
    }


    // --- 5. SKILLS LIST ANIMATION ON SCROLL (NEW) ---
    const skillItems = document.querySelectorAll('.skill-item');

    if (skillItems.length > 0) {
        const observerOptions = {
            root: null, // use viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of the item is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add a staggered delay
                    entry.target.style.transitionDelay = `${index * 100}ms`;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        };

        const skillsObserver = new IntersectionObserver(observerCallback, observerOptions);

        skillItems.forEach(item => {
            skillsObserver.observe(item);
        });
    }

});