// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    // Initialize slider
    function initSlider() {
        // Set first slide as active
        showSlide(currentSlide);
        // Start automatic slideshow
        startSlideshow();
        // Add event listeners
        setupEventListeners();
    }

    // Show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }

    // Go to next slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }

    // Go to previous slide
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev);
    }

    // Start automatic slideshow
    function startSlideshow() {
        // Clear any existing interval
        clearInterval(slideInterval);
        // Set new interval
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Pause slideshow
    function pauseSlideshow() {
        clearInterval(slideInterval);
    }

    // Setup event listeners
    function setupEventListeners() {
        // Previous button click
        prevBtn.addEventListener('click', function() {
            prevSlide();
            // Restart slideshow after manual navigation
            startSlideshow();
        });

        // Next button click
        nextBtn.addEventListener('click', function() {
            nextSlide();
            // Restart slideshow after manual navigation
            startSlideshow();
        });

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                // Restart slideshow after manual navigation
                startSlideshow();
            });
        });

        // Pause slideshow on hover
        document.querySelector('.hero-slider').addEventListener('mouseenter', pauseSlideshow);
        document.querySelector('.hero-slider').addEventListener('mouseleave', startSlideshow);
    }

    // Initialize the slider
    initSlider();
});