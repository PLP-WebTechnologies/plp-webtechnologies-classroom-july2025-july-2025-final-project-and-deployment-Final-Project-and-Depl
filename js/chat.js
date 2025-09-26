document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userMessage = input.value.trim();
    if (!userMessage) return;

    appendMessage("user", userMessage);
    input.value = "";

    // Simulated bot reply (replace with real chatbot integration later)
    setTimeout(() => {
      const botReply = getBotReply(userMessage);
      appendMessage("bot", botReply);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
  });

  function appendMessage(sender, message) {
    const div = document.createElement("div");
    div.classList.add(sender === "user" ? "user-message" : "bot-message");
    div.textContent = message;
    chatBox.appendChild(div);
  }

  function getBotReply(message) {
    const msg = message.toLowerCase();
    if (msg.includes("balance")) return "To check your M‑Pesa balance, dial *234# or use your Safaricom app.";
    if (msg.includes("send money")) return "To send money, go to M‑Pesa > Send Money, enter number, amount, and PIN.";
    if (msg.includes("reverse")) return "To reverse a wrong transaction, send the M‑Pesa message to 456 immediately.";
    if (msg.includes("charges")) return "M‑Pesa transaction charges vary. Visit: https://www.safaricom.co.ke/m-pesa-tariffs";
    return "Sorry, I didn't quite get that. Please rephrase or ask something else.";
  }
});
