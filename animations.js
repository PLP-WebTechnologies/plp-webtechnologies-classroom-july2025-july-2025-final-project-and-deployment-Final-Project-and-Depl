// =============================================
// EcoCharge Website - Advanced Animations
// JavaScript-controlled animations and interactions
// =============================================

/**
 * Advanced animation controller
 */
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
    }
    
    /**
     * Register animation with controller
     * @param {string} name - Animation name
     * @param {Function} animationFn - Animation function
     */
    registerAnimation(name, animationFn) {
        this.animations.set(name, animationFn);
    }
    
    /**
     * Play registered animation
     * @param {string} name - Animation name
     * @param {HTMLElement} element - Target element
     * @param {Object} options - Animation options
     */
    playAnimation(name, element, options = {}) {
        const animationFn = this.animations.get(name);
        if (animationFn) {
            animationFn(element, options);
        }
    }
    
    /**
     * Create intersection observer for scroll animations
     * @param {string} observerName - Observer identifier
     * @param {Function} callback - Callback function
     * @param {Object} options - IntersectionObserver options
     */
    createObserver(observerName, callback, options = {}) {
        const observer = new IntersectionObserver(callback, options);
        this.observers.set(observerName, observer);
        return observer;
    }
    
    /**
     * Observe element with specified observer
     * @param {string} observerName - Observer identifier
     * @param {HTMLElement} element - Element to observe
     */
    observeElement(observerName, element) {
        const observer = this.observers.get(observerName);
        if (observer) {
            observer.observe(element);
        }
    }
}

// Create global animation controller
const animController = new AnimationController();

/**
 * Initialize advanced animations
 */
function initializeAdvancedAnimations() {
    // Register animations
    animController.registerAnimation('fadeInUp', fadeInUpAnimation);
    animController.registerAnimation('slideInLeft', slideInLeftAnimation);
    animController.registerAnimation('staggerChildren', staggerChildrenAnimation);
    animController.registerAnimation('parallax', parallaxAnimation);
    
    // Set up scroll observers
    setupScrollAnimations();
    setupParallaxEffects();
    setupProgressAnimations();
}

/**
 * Fade in up animation
 */
function fadeInUpAnimation(element, options = {}) {
    const duration = options.duration || 800;
    const delay = options.delay || 0;
    
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `all ${duration}ms ease ${delay}ms`;
    
    // Trigger animation
    requestAnimationFrame(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
}

/**
 * Slide in from left animation
 */
function slideInLeftAnimation(element, options = {}) {
    const duration = options.duration || 800;
    const delay = options.delay || 0;
    
    element.style.opacity = '0';
    element.style.transform = 'translateX(-50px)';
    element.style.transition = `all ${duration}ms ease ${delay}ms`;
    
    requestAnimationFrame(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    });
}

/**
 * Stagger children animation
 */
function staggerChildrenAnimation(container, options = {}) {
    const children = container.children;
    const staggerDelay = options.staggerDelay || 100;
    const animation = options.animation || 'fadeInUp';
    
    Array.from(children).forEach((child, index) => {
        const delay = index * staggerDelay;
        animController.playAnimation(animation, child, { delay });
    });
}

/**
 * Parallax scrolling effect
 */
function parallaxAnimation(element, options = {}) {
    const speed = options.speed || 0.5;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        element.style.transform = `translateY(${rate}px)`;
    }
    
    window.addEventListener('scroll', updateParallax);
    updateParallax(); // Initial position
}

/**
 * Set up scroll-triggered animations
 */
function setupScrollAnimations() {
    const scrollObserver = animController.createObserver(
        'scrollAnimations',
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animation;
                    const delay = parseInt(element.dataset.delay) || 0;
                    
                    if (animationType && animController.animations.has(animationType)) {
                        animController.playAnimation(animationType, element, { delay });
                    }
                    
                    // Stop observing after animation
                    scrollObserver.unobserve(element);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );
    
    // Observe elements with data-animation attribute
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(element => {
        animController.observeElement('scrollAnimations', element);
    });
}

/**
 * Set up parallax effects
 */
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
        animController.playAnimation('parallax', element, { speed });
    });
}

/**
 * Set up progress animations
 */
function setupProgressAnimations() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = animController.createObserver(
        'progressAnimations',
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.dataset.progress || '100%';
                    
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1.5s ease-in-out';
                        progressBar.style.width = targetWidth;
                    }, 100);
                    
                    progressObserver.unobserve(progressBar);
                }
            });
        },
        { threshold: 0.5 }
    );
    
    progressBars.forEach(bar => {
        animController.observeElement('progressAnimations', bar);
    });
}

/**
 * Interactive charging animation
 */
function createInteractiveCharging() {
    const chargingDemo = document.getElementById('chargingDemo');
    
    if (chargingDemo) {
        let animationFrame;
        let progress = 0;
        
        function animateCharging() {
            const energyWaves = chargingDemo.querySelector('.energy-waves');
            const car = chargingDemo.querySelector('.car');
            
            if (energyWaves && car) {
                progress += 0.02;
                if (progress > 1) progress = 0;
                
                // Animate energy waves
                const waveOpacity = Math.sin(progress * Math.PI);
                energyWaves.style.opacity = waveOpacity.toString();
                
                // Add subtle car animation
                car.style.transform = `translateX(-50%) translateY(${Math.sin(progress * 4) * 2}px)`;
                
                animationFrame = requestAnimationFrame(animateCharging);
            }
        }
        
        // Start animation when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCharging();
                } else {
                    cancelAnimationFrame(animationFrame);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(chargingDemo);
    }
}

/**
 * Page transition animations
 */
function setupPageTransitions() {
    // Add loading animation for page transitions
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        
        if (link && link.href && link.href.includes('.html')) {
            e.preventDefault();
            
            // Add fade out animation
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        }
    });
    
    // Fade in on page load
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeAdvancedAnimations();
    createInteractiveCharging();
    setupPageTransitions();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationController,
        initializeAdvancedAnimations,
        createInteractiveCharging,
        setupPageTransitions
    };
}