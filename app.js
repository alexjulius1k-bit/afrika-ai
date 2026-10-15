chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const question = userInput.value.trim();

  if (!question) return;

  showMessage("You", question, "user");

  userInput.value = "";
  userInput.disabled = true;
  sendButton.disabled = true;

  const loadingMessage = showMessage(
    "AFRICA AI ",
    "Thinking... Please wait.",
    "assistant"
  );

  try {
    const response = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: question
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "The AI service is unavailable.");
    }

    loadingMessage.querySelector("p").textContent =
      data.reply || "Sorry, I couldn't generate a response.";
  } catch (error) {
    loadingMessage.querySelector("p").textContent =
      "Sorry, I couldn't connect to AFRIKA AI. Please try again.";
    console.error("Chat error:", error);
  } finally {
    userInput.disabled = false;
    sendButton.disabled = false;
    userInput.focus();
  }
});

console.log("AFRICA AI  chat connection loaded.");
