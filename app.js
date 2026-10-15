// AFRICA AI  - Chat Application

const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const messages = document.getElementById("messages");

function showMessage(name, text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}-message`;

  const title = document.createElement("strong");
  title.textContent = name;

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  message.appendChild(title);
  message.appendChild(paragraph);
  messages.appendChild(message);

  message.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });

  return message;
}

// Send a message to AFRICA AI 
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
    const response = await fetch(
      "/.netlify/functions/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "The AI service is unavailable."
      );
    }

    loadingMessage.querySelector("p").textContent =
      data.reply || "Please try asking me again.";

  } catch (error) {
    console.error("AFRICA AI  error:", error);

    loadingMessage.querySelector("p").textContent =
      "Sorry, I couldn't get a reply. Please try again.";

  } finally {
    userInput.disabled = false;
    sendButton.disabled = false;
    userInput.focus();
  }
});

console.log("AFRICA AI  chat is ready!");
