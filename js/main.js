// =========================
// MAIN JAVASCRIPT FILE
// Handles navigation, animations, and interactions with accessibility & performance enhancements
// =========================

// Accessibility utilities
const AccessibilityUtils = {
    // Announce to screen readers
    announce: function(message, priority = 'polite') {
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', priority);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.textContent = message;
        document.body.appendChild(announcer);
        setTimeout(() => document.body.removeChild(announcer), 1000);
    },

    // Trap focus within element
    trapFocus: function(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    },

    // Handle keyboard navigation
    handleKeyboardNav: function(element, callback) {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                callback();
            }
        });
    }
};

// Performance utilities
const PerformanceUtils = {
    // Lazy load images
    lazyLoadImages: function() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-load');
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.classList.add('lazy-load');
            imageObserver.observe(img);
        });
    },

    // Preload critical resources
    preloadCriticalResources: function() {
        const criticalImages = [
            'images/hero/hero.webp',
            'images/hero/hero2.webp'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {

    // Initialize performance optimizations
    PerformanceUtils.lazyLoadImages();
    PerformanceUtils.preloadCriticalResources();

    // =========================
    // HERO CAROUSEL FUNCTIONALITY
    // Professional carousel with auto-play and navigation
    // =========================

    const carousel = {
        slides: document.querySelectorAll('.carousel-slide'),
        indicators: document.querySelectorAll('.indicator'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        currentSlide: 0,
        autoPlayInterval: null,
        autoPlayDelay: 5000,

        init() {
            if (this.slides.length === 0) return;

            this.setupEventListeners();
            this.startAutoPlay();
            this.setupTouchEvents();
        },

        setupEventListeners() {
            // Navigation buttons
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
            }

            // Indicator buttons
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            });

            // Pause auto-play on hover
            const carouselContainer = document.querySelector('.carousel-container');
            if (carouselContainer) {
                carouselContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
                carouselContainer.addEventListener('mouseleave', () => this.startAutoPlay());
            }
        },

        setupTouchEvents() {
            let startX = 0;
            let endX = 0;
            const carouselContainer = document.querySelector('.carousel-container');

            if (!carouselContainer) return;

            carouselContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            carouselContainer.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                this.handleSwipe();
            });

            carouselContainer.addEventListener('touchmove', (e) => {
                e.preventDefault(); // Prevent scrolling while swiping
            });
        },

        handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        },

        goToSlide(index) {
            // Remove active classes
            this.slides[this.currentSlide].classList.remove('active');
            this.indicators[this.currentSlide].classList.remove('active');

            // Update current slide
            this.currentSlide = index;

            // Add active classes
            this.slides[this.currentSlide].classList.add('active');
            this.indicators[this.currentSlide].classList.add('active');

            // Restart auto-play
            this.restartAutoPlay();
        },

        nextSlide() {
            const nextIndex = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(nextIndex);
        },

        prevSlide() {
            const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.goToSlide(prevIndex);
        },

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayDelay);
        },

        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        },

        restartAutoPlay() {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    };

    // Initialize carousel
    carousel.init();

    // =========================
    // MOBILE NAVIGATION TOGGLE
    // Opens and closes hamburger menu
    // =========================
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // =========================
    // HEADER SCROLL EFFECT
    // Changes header appearance on scroll
    // =========================
    
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // =========================
    // SMOOTH SCROLLING
    // Smooth scroll for anchor links
    // =========================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =========================
    // SCROLL ANIMATIONS
    // Animate elements when they come into view
    // =========================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.dish-card, .about-text, .about-image, .section-header');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        // Stagger animations
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // =========================
    // LOADING ANIMATIONS
    // Add loading states for images
    // =========================

    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
        });

        // Error handling for images
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            this.style.opacity = '0.5';
            this.alt = 'Image not available';
        });

        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

        // If image is already loaded (cached)
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
            img.classList.add('loaded');
        }
    });
    
    // =========================
    // BUTTON HOVER EFFECTS
    // Enhanced button interactions
    // =========================
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    // =========================
    // LAZY LOADING FOR IMAGES
    // Improve performance with lazy loading
    // =========================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // =========================
    // PERFORMANCE OPTIMIZATIONS
    // Throttle scroll events
    // =========================
    
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(function() {
        // Any scroll-based animations or effects can be added here
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-image');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // =========================
    // ACCESSIBILITY ENHANCEMENTS
    // Keyboard navigation and screen reader support
    // =========================
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-gold);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if it doesn't exist
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
    
    // =========================
    // ERROR HANDLING
    // Graceful degradation for older browsers
    // =========================
    
    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        document.body.classList.add('no-grid');
        console.warn('CSS Grid not supported. Falling back to flexbox layout.');
    }
    
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
        console.warn('IntersectionObserver not supported. Animations disabled.');
    }
    
    // =========================
    // CONSOLE WELCOME MESSAGE
    // Developer-friendly console message
    // =========================
    
    console.log(`
    🍴 Welcome to BistroDelight!

    This website was built with:
    • Semantic HTML5
    • Modern CSS3 (Grid, Flexbox, Custom Properties)
    • Vanilla JavaScript (ES6+)
    • Font Awesome Icons
    • Mobile-first responsive design
    • Accessibility best practices

    Built with ❤️ for culinary excellence.
    `);
    
});

// =========================
// UTILITY FUNCTIONS
// Reusable helper functions
// =========================

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function scrollToElement(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// =========================
// ABOUT PAGE SCROLL ANIMATIONS
// Animate elements on scroll for better UX
// =========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Add staggered animation for grid items
            if (entry.target.classList.contains('values-grid')) {
                const cards = entry.target.querySelectorAll('.value-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.8s ease-out forwards`;
                    }, index * 200);
                });
            }

            if (entry.target.classList.contains('chef-achievements')) {
                const achievements = entry.target.querySelectorAll('.achievement');
                achievements.forEach((achievement, index) => {
                    setTimeout(() => {
                        achievement.style.animation = `slideInLeft 0.8s ease-out forwards`;
                    }, index * 150);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(el => observer.observe(el));

// Observe specific sections
const sectionsToAnimate = document.querySelectorAll('.values-grid, .chef-achievements, .story-highlights');
sectionsToAnimate.forEach(section => observer.observe(section));

// =========================
// PARALLAX EFFECT FOR ABOUT HERO
// Subtle parallax scrolling effect
// =========================

const aboutHero = document.querySelector('.about-hero .hero-background');
if (aboutHero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        aboutHero.style.transform = `translateY(${rate}px)`;
    });
}

// =========================
// COUNTER ANIMATION FOR STATS
// Animate numbers when they come into view
// =========================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observe hero stats for counter animation
const heroStats = document.querySelectorAll('.hero-stat .stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            const number = parseInt(text.replace('+', ''));
            animateCounter(entry.target, number);
        }
    });
}, { threshold: 0.5 });

heroStats.forEach(stat => statsObserver.observe(stat));

// =========================
// MENU FILTERING FUNCTIONALITY
// Filter menu items by category
// =========================

const menuFilters = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

if (menuFilters.length > 0 && menuItems.length > 0) {
    menuFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Remove active class from all filters
            menuFilters.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked filter
            this.classList.add('active');

            // Filter menu items
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });

            // Update grid layout after filtering
            setTimeout(() => {
                const menuGrid = document.querySelector('.menu-grid');
                if (menuGrid) {
                    menuGrid.style.display = 'grid';
                }
            }, 100);
        });
    });
}

// =========================
// MENU ITEM ANIMATIONS
// Add hover effects and animations
// =========================

if (menuItems.length > 0) {
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
}
