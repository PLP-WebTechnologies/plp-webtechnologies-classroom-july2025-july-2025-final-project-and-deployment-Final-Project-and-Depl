// Contact Form Validation
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields.");
    return false;
  }
  alert("Thank you for contacting us, " + name + "!");
  return true;
}

// Scroll animations
const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

function checkAnimations() {
  const triggerBottom = window.innerHeight * 0.85;

  animatedElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.style.animationPlayState = 'running';
    }
  });
}

window.addEventListener('scroll', checkAnimations);
checkAnimations();

//dark them set up
// Dark theme toggle (id="theme-toggle")
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  // initialize from saved preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = '☀️';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = '🌙';
    }
  });
}

// Mobile nav toggle (button with class .menu-toggle)
function toggleMenu(){
  const nav = document.querySelector('.nav-links');
  if (nav) nav.classList.toggle('show');
}

