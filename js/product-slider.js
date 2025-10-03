// Product Slider with Auto-Scrolling Images
document.addEventListener('DOMContentLoaded', function() {
    // Initialize product cards with auto-scrolling images
    initProductCards();
    
    // Initialize horizontal slider for product categories
    initHorizontalSlider();
});

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
        
        // Set scroll amount (width of one product card + margin)
        const scrollAmount = 320; // Adjust based on your card width + margin
        
        // Scroll to previous set of products
        prevBtn.addEventListener('click', () => {
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Scroll to next set of products
        nextBtn.addEventListener('click', () => {
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    });
}