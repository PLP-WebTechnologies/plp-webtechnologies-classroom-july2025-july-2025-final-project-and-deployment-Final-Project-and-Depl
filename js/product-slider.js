// Initialize product cards with auto-scrolling images
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const imageContainer = card.querySelector('.product-images');
        if (!imageContainer) return;
        
        const images = imageContainer.querySelectorAll('img');
        if (images.length <= 1) return;
        
        let currentIndex = 0;
        
        // Hide all images except the first one
        images.forEach((img, index) => {
            if (index !== 0) {
                img.style.opacity = '0';
                img.style.position = 'absolute';
                img.style.top = '0';
                img.style.left = '0';
            } else {
                img.style.opacity = '1';
                img.style.position = 'relative';
            }
        });
        
        // Function to show next image with fade effect
        function showNextImage() {
            // Fade out current image
            images[currentIndex].style.opacity = '0';
            images[currentIndex].style.position = 'absolute';
            
            // Calculate next index
            currentIndex = (currentIndex + 1) % images.length;
            
            // Fade in next image
            images[currentIndex].style.opacity = '1';
            images[currentIndex].style.position = 'relative';
        }
        
        // Set interval for automatic image rotation (every 3 seconds)
        setInterval(showNextImage, 3000);
    });
}

// Initialize horizontal slider for product categories
function initHorizontalSlider() {
    const sliders = document.querySelectorAll('.products-slider');
    
    sliders.forEach(slider => {
        const container = slider.querySelector('.products-container');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        
        if (!container || !prevBtn || !nextBtn) return;
        
        const scrollAmount = 320; // Adjust based on your card width + margin
        let autoScrollInterval;

        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                // If we've scrolled to the end, scroll back to the beginning
                if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 3000); // Scroll every 3 seconds
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        // Start auto-scrolling by default
        startAutoScroll();

        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoScroll);
        slider.addEventListener('mouseleave', startAutoScroll);
        
        // Manual controls
        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    });
}