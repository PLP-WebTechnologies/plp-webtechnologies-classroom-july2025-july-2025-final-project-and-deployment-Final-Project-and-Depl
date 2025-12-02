// Example: Button triggers alert or scroll
const learnMoreBtn = document.getElementById('learnMoreBtn');
learnMoreBtn.addEventListener('click', () => {
    alert("Scroll down to explore projects!");
});

// Reusable function example
function highlightElement(id) {
    const el = document.getElementById(id);
    el.style.backgroundColor = "#f0f8ff";
    setTimeout(() => el.style.backgroundColor = "", 1000);
}
