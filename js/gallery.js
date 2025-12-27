// Gallery functionality for category cards
document.addEventListener('DOMContentLoaded', function() {
    const categoryGalleries = document.querySelectorAll('.category-gallery');
    
    categoryGalleries.forEach(gallery => {
        const images = gallery.querySelectorAll('img');
        let currentIndex = 0;
        
        // Function to show next image
        function showNextImage() {
            // Hide current image
            images[currentIndex].classList.remove('active');
            
            // Calculate next index
            currentIndex = (currentIndex + 1) % images.length;
            
            // Show next image
            images[currentIndex].classList.add('active');
        }
        
        // Set interval for automatic image rotation
        setInterval(showNextImage, 3000);
    });
});