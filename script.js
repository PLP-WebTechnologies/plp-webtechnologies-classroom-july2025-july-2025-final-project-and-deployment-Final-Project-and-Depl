function animateWelcome() {
  alert("Welcome to Levites Farm! Explore our healthy ducks and services.");
}

function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const feedback = document.getElementById('feedback');

  if (!name || !email || !message) {
    feedback.textContent = "Please fill in all fields.";
    feedback.style.color = "red";
    return false;
  }

  feedback.textContent = "Thank you! Your message has been sent.";
  feedback.style.color = "green";
  return false;
}
