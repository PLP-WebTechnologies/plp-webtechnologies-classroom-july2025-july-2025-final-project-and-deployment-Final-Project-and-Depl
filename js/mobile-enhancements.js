/* =========================
   MOBILE ENHANCEMENTS
   Advanced mobile interactions and touch optimizations
========================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================
    // ENHANCED MOBILE NAVIGATION
    // Advanced mobile menu with touch gestures
    // =========================
    
    const mobileNav = {
        hamburger: document.querySelector('.hamburger'),
        navMenu: document.querySelector('.nav-menu'),
        navLinks: document.querySelectorAll('.nav-link'),
        overlay: null,
        
        init() {
            this.createOverlay();
            this.bindEvents();
            this.setupSwipeGestures();
        },
        
        createOverlay() {
            this.overlay = document.createElement('div');
            this.overlay.className = 'nav-overlay';
            document.body.appendChild(this.overlay);
        },
        
        bindEvents() {
            if (this.hamburger && this.navMenu) {
                this.hamburger.addEventListener('click', () => this.toggleMenu());
                this.overlay.addEventListener('click', () => this.closeMenu());
                
                // Close menu when clicking nav links
                this.navLinks.forEach(link => {
                    link.addEventListener('click', () => this.closeMenu());
                });
                
                // Close menu on escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                        this.closeMenu();
                    }
                });
            }
        },
        
        toggleMenu() {
            const isActive = this.navMenu.classList.contains('active');
            if (isActive) {
                this.closeMenu();
            } else {
                this.openMenu();
            }
        },
        
        openMenu() {
            this.hamburger.classList.add('active');
            this.navMenu.classList.add('active');
            this.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animate nav items with stagger effect
            this.navLinks.forEach((link, index) => {
                link.style.animation = `fadeInUp 0.3s ease-out ${index * 0.1}s both`;
            });
        },
        
        closeMenu() {
            this.hamburger.classList.remove('active');
            this.navMenu.classList.remove('active');
            this.overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset animations
            this.navLinks.forEach(link => {
                link.style.animation = '';
            });
        },
        
        setupSwipeGestures() {
            let startX = 0;
            let startY = 0;
            let endX = 0;
            let endY = 0;
            
            this.navMenu.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });
            
            this.navMenu.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                endY = e.changedTouches[0].clientY;
                this.handleSwipe();
            });
        },
        
        handleSwipe() {
            const deltaX = startX - endX;
            const deltaY = Math.abs(startY - endY);
            const swipeThreshold = 100;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaX) > deltaY) {
                if (deltaX > 0) { // Swipe left to close menu
                    this.closeMenu();
                }
            }
        }
    };
    
    // =========================
    // TOUCH INTERACTION ENHANCEMENTS
    // Improved touch feedback and interactions
    // =========================
    
    const touchEnhancements = {
        init() {
            this.addTouchFeedback();
            this.optimizeScrolling();
            this.handleOrientationChange();
        },
        
        addTouchFeedback() {
            // Add touch feedback to interactive elements
            const touchElements = document.querySelectorAll('.btn, .nav-link, .social-link, .dish-card');
            
            touchElements.forEach(element => {
                element.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                    this.style.transition = 'transform 0.1s ease';
                });
                
                element.addEventListener('touchend', function() {
                    this.style.transform = '';
                    this.style.transition = 'transform 0.3s ease';
                });
                
                element.addEventListener('touchcancel', function() {
                    this.style.transform = '';
                    this.style.transition = 'transform 0.3s ease';
                });
            });
        },
        
        optimizeScrolling() {
            // Smooth scrolling optimization for mobile
            let ticking = false;
            
            function updateScrollEffects() {
                const scrolled = window.pageYOffset;
                const header = document.querySelector('.header');
                
                // Header background opacity based on scroll
                if (header) {
                    const opacity = Math.min(scrolled / 100, 1);
                    header.style.backgroundColor = `rgba(255, 255, 255, ${0.95 + (opacity * 0.05)})`;
                }
                
                ticking = false;
            }
            
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    requestAnimationFrame(updateScrollEffects);
                    ticking = true;
                }
            });
        },
        
        handleOrientationChange() {
            window.addEventListener('orientationchange', function() {
                // Close mobile menu on orientation change
                if (mobileNav.navMenu.classList.contains('active')) {
                    mobileNav.closeMenu();
                }
                
                // Recalculate viewport height
                setTimeout(() => {
                    const vh = window.innerHeight * 0.01;
                    document.documentElement.style.setProperty('--vh', `${vh}px`);
                }, 100);
            });
        }
    };
    
    // =========================
    // MOBILE PERFORMANCE OPTIMIZATIONS
    // Lazy loading and performance enhancements
    // =========================
    
    const mobilePerformance = {
        init() {
            this.setupLazyLoading();
            this.optimizeImages();
            this.setupIntersectionObserver();
        },
        
        setupLazyLoading() {
            const images = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        },
        
        optimizeImages() {
            // Add loading="lazy" to images for native lazy loading
            const images = document.querySelectorAll('img:not([loading])');
            images.forEach(img => {
                img.setAttribute('loading', 'lazy');
            });
        },
        
        setupIntersectionObserver() {
            // Animate elements when they come into view
            const animatedElements = document.querySelectorAll('.dish-card, .about-content, .section-title');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInUp 0.6s ease-out both';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(el => observer.observe(el));
        }
    };
    
    // =========================
    // MOBILE ACCESSIBILITY ENHANCEMENTS
    // Improved accessibility for mobile devices
    // =========================
    
    const mobileAccessibility = {
        init() {
            this.setupFocusManagement();
            this.enhanceKeyboardNavigation();
            this.setupReducedMotion();
        },
        
        setupFocusManagement() {
            // Trap focus in mobile menu when open
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && mobileNav.navMenu.classList.contains('active')) {
                    const focusable = mobileNav.navMenu.querySelectorAll(focusableElements);
                    const firstFocusable = focusable[0];
                    const lastFocusable = focusable[focusable.length - 1];
                    
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            lastFocusable.focus();
                            e.preventDefault();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            firstFocusable.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
        },
        
        enhanceKeyboardNavigation() {
            // Add keyboard support for touch interactions
            const interactiveElements = document.querySelectorAll('.btn, .nav-link, .social-link');
            
            interactiveElements.forEach(element => {
                element.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        element.click();
                    }
                });
            });
        },
        
        setupReducedMotion() {
            // Respect user's motion preferences
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
                document.documentElement.style.setProperty('--transition-duration', '0.01ms');
            }
        }
    };
    
    // Initialize all mobile enhancements
    mobileNav.init();
    touchEnhancements.init();
    mobilePerformance.init();
    mobileAccessibility.init();
    
    // Set initial viewport height for mobile browsers
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});
