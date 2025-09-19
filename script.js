document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
      button.classList.toggle('open');
  });
});

// Initialize Swiper
const swiper = new Swiper('.trending-swiper', {
  slidesPerView: 'auto',
  loop: false,
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  }
});