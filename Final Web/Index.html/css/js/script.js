// Toggle mobile menu (example interactive element)
const navLinks = document.querySelectorAll('header nav a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    alert(`Navigating to ${link.textContent} page!`);
  });
});

// Simple form validation
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if(!name || !email || !message){
    alert("Please fill in all fields.");
    return false;
  }
  alert("Message sent successfully!");
  return true;
}