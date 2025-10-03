// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Dropdown toggle for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        });
    }
    
    // Add to cart functionality for demo products
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // For demo purposes, we'll create a sample product
            // In a real implementation, this data would come from the product
            const productElement = this.closest('.category-card');
            const productName = productElement.querySelector('h3').textContent;
            const productImage = productElement.querySelector('img.active').src;
            
            const product = {
                id: Math.random().toString(36).substr(2, 9), // Generate random ID
                name: productName,
                price: 29.99, // Demo price
                image: productImage
            };
            
            // Add to cart
            window.addToCart(product);
            
            // Show success message
            showNotification(`${productName} ajouté au panier !`);
        });
    });
    
    // Notification function
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add CSS for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: -100px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--old-rose);
            color: white;
            padding: 12px 25px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transition: bottom 0.3s ease;
        }
        
        .notification.show {
            bottom: 30px;
        }
    `;
    document.head.appendChild(style);
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .feature');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});