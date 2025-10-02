document.addEventListener('DOMContentLoaded', function() {
    // Image slider for Home page
    const sliderImages = [
        'images/gerd1.jpg',
        'images/gerd2.jpg',
        'images/gerd3.jpg'
    ];
    let currentImg = 0;
    const sliderImg = document.getElementById('slider-img');
    if (sliderImg) {
        setInterval(() => {
            currentImg = (currentImg + 1) % sliderImages.length;
            sliderImg.src = sliderImages[currentImg];
        }, 3000);
    }

    // Counter animation for About page
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            let count = +counter.innerText;
            const increment = target / 100;
            if(count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const formMsg = document.getElementById('formMsg');
            if (!name || !email || !message) {
                formMsg.textContent = 'Please fill in all fields.';
                formMsg.style.color = '#d32f2f';
                return;
            }
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                formMsg.textContent = 'Please enter a valid email address.';
                formMsg.style.color = '#d32f2f';
                return;
            }
            formMsg.textContent = 'Thank you for contacting us!';
            formMsg.style.color = '#43a047';
            contactForm.reset();
        });
    }
});
// Circular carousel for timeline images
const carouselImgs = document.querySelectorAll('.carousel-img');
let carouselIndex = 0;
function rotateCarousel() {
    carouselImgs.forEach((img, idx) => {
        img.classList.remove('active');
        if(idx === carouselIndex) img.classList.add('active');
    });
    carouselIndex = (carouselIndex + 1) % carouselImgs.length;
}
if(carouselImgs.length) {
    setInterval(rotateCarousel, 2000);
    rotateCarousel();
}

// Confetti and light effect for 2025 timeline
function throwConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100vw';
    confettiContainer.style.height = '100vh';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    for(let i=0; i<120; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random()*360},80%,60%)`;
        confetti.style.top = Math.random()*100 + 'vh';
        confetti.style.left = Math.random()*100 + 'vw';
        confetti.style.borderRadius = '50%';
        confetti.style.opacity = '0.8';
        confetti.style.transform = `scale(${Math.random()+0.5})`;
        confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
    // Light works
    for(let i=0; i<10; i++) {
        const light = document.createElement('div');
        light.style.position = 'absolute';
        light.style.width = '80px';
        light.style.height = '8px';
        light.style.background = `linear-gradient(90deg, #fff, hsl(${Math.random()*360},80%,60%))`;
        light.style.top = Math.random()*100 + 'vh';
        light.style.left = Math.random()*100 + 'vw';
        light.style.opacity = '0.7';
        light.style.transform = `rotate(${Math.random()*360}deg)`;
        confettiContainer.appendChild(light);
        setTimeout(() => light.remove(), 3000);
    }
    setTimeout(() => confettiContainer.remove(), 3200);
}
const timeline2025 = document.getElementById('timeline-2025');
if(timeline2025) {
    timeline2025.addEventListener('mouseenter', throwConfetti);
}
// Timeline sync rotation
const timelineEvents = document.querySelectorAll('.timeline-event');
let timelineIdx = 0;
function focusTimelineEvent(idx) {
    timelineEvents.forEach((event, i) => {
        event.classList.toggle('active', i === idx);
    });
}
if(timelineEvents.length) {
    setInterval(() => {
        focusTimelineEvent(timelineIdx);
        timelineIdx = (timelineIdx + 1) % timelineEvents.length;
    }, 2500);
    focusTimelineEvent(timelineIdx);
}
// Remove confetti and celebratory animation code
function throwConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100vw';
    confettiContainer.style.height = '100vh';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);
    for(let i=0; i<120; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random()*360},80%,60%)`;
        confetti.style.top = Math.random()*100 + 'vh';
        confetti.style.left = Math.random()*100 + 'vw';
        confetti.style.borderRadius = '50%';
        confetti.style.opacity = '0.8';
        confetti.style.transform = `scale(${Math.random()+0.5})`;
        confettiContainer.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
    // Light works
    for(let i=0; i<10; i++) {
        const light = document.createElement('div');
        light.style.position = 'absolute';
        light.style.width = '80px';
        light.style.height = '8px';
        light.style.background = `linear-gradient(90deg, #fff, hsl(${Math.random()*360},80%,60%))`;
        light.style.top = Math.random()*100 + 'vh';
        light.style.left = Math.random()*100 + 'vw';
        light.style.opacity = '0.7';
        light.style.transform = `rotate(${Math.random()*360}deg)`;
        confettiContainer.appendChild(light);
        setTimeout(() => light.remove(), 3000);
    }
    setTimeout(() => confettiContainer.remove(), 3200);
}
