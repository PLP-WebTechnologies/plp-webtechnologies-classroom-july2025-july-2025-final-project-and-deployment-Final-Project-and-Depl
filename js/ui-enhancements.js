// =========================
// UI/UX ENHANCEMENTS
// Advanced animations, micro-interactions, and visual effects
// =========================

document.addEventListener('DOMContentLoaded', function() {
    
    const UIEnhancements = {
        
        // Initialize all UI enhancements
        init: function() {
            this.setupScrollAnimations();
            this.setupParallaxEffects();
            this.setupTextRevealAnimations();
            this.setupAdvancedHoverEffects();
            this.setupProgressBars();
            this.setupRippleEffects();
            this.setupSmoothScrolling();
            this.setupIntersectionObserver();
            this.setupAdvancedNavigation();
            this.setupFloatingActionButton();
        },
        
        // Scroll-triggered animations
        setupScrollAnimations: function() {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const animationType = element.dataset.animation || 'fadeInUp';
                        const delay = element.dataset.delay || 0;
                        
                        setTimeout(() => {
                            element.classList.add(`animate-${animationType}`);
                        }, delay);
                        
                        observer.unobserve(element);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(element => {
                observer.observe(element);
            });
        },
        
        // Parallax scrolling effects
        setupParallaxEffects: function() {
            const parallaxElements = document.querySelectorAll('.parallax-element');
            
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            });
        },
        
        // Text reveal animations
        setupTextRevealAnimations: function() {
            const textElements = document.querySelectorAll('.text-reveal');
            
            textElements.forEach(element => {
                const text = element.textContent;
                element.innerHTML = '';
                
                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.transitionDelay = `${index * 0.05}s`;
                    element.appendChild(span);
                });
            });
            
            // Trigger animation when in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            textElements.forEach(element => {
                observer.observe(element);
            });
        },
        
        // Advanced hover effects
        setupAdvancedHoverEffects: function() {
            const cards = document.querySelectorAll('.card-interactive');
            
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                });
            });
        },
        
        // Animated progress bars
        setupProgressBars: function() {
            const progressBars = document.querySelectorAll('.progress-bar');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressFill = entry.target.querySelector('.progress-fill');
                        const targetWidth = progressFill.dataset.width || '100%';
                        
                        setTimeout(() => {
                            progressFill.style.width = targetWidth;
                        }, 200);
                        
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            progressBars.forEach(bar => {
                observer.observe(bar);
            });
        },
        
        // Ripple effects for buttons
        setupRippleEffects: function() {
            const rippleButtons = document.querySelectorAll('.btn-ripple');
            
            rippleButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    const ripple = document.createElement('span');
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple-animation 0.6s linear;
                        pointer-events: none;
                    `;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
            
            // Add CSS for ripple animation
            if (!document.getElementById('ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        },
        
        // Smooth scrolling for anchor links
        setupSmoothScrolling: function() {
            const anchorLinks = document.querySelectorAll('a[href^="#"]');
            
            anchorLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        },
        
        // Enhanced intersection observer for various animations
        setupIntersectionObserver: function() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        
                        // Add staggered animation delays for child elements
                        const children = element.querySelectorAll('.stagger-animation');
                        children.forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('animate-fade-in-up');
                            }, index * 100);
                        });
                        
                        observer.unobserve(element);
                    }
                });
            }, observerOptions);
            
            const staggerContainers = document.querySelectorAll('.stagger-container');
            staggerContainers.forEach(container => {
                observer.observe(container);
            });
        },
        
        // Advanced navigation enhancements
        setupAdvancedNavigation: function() {
            const navbar = document.querySelector('.navbar');
            let lastScrollTop = 0;
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Hide/show navbar on scroll
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                
                // Add background blur when scrolled
                if (scrollTop > 50) {
                    navbar.classList.add('navbar-enhanced');
                } else {
                    navbar.classList.remove('navbar-enhanced');
                }
                
                lastScrollTop = scrollTop;
            });
        },
        
        // Floating Action Button
        setupFloatingActionButton: function() {
            // Create FAB if it doesn't exist
            if (!document.querySelector('.fab')) {
                const fab = document.createElement('a');
                fab.href = '#top';
                fab.className = 'fab tooltip';
                fab.setAttribute('data-tooltip', 'Back to Top');
                fab.innerHTML = '<i class="fas fa-arrow-up"></i>';
                fab.style.opacity = '0';
                fab.style.visibility = 'hidden';
                document.body.appendChild(fab);
                
                // Show/hide FAB based on scroll position
                window.addEventListener('scroll', () => {
                    if (window.pageYOffset > 300) {
                        fab.style.opacity = '1';
                        fab.style.visibility = 'visible';
                    } else {
                        fab.style.opacity = '0';
                        fab.style.visibility = 'hidden';
                    }
                });
                
                // Smooth scroll to top
                fab.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        }
    };
    
    // Initialize all UI enhancements
    UIEnhancements.init();
    
    // Export for global access
    window.UIEnhancements = UIEnhancements;
});
