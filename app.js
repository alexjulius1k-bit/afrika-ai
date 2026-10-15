const messages = document.getElementById("messages");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

const contentPanel = document.getElementById("content");
const contentTitle = document.getElementById("content-title");
const contentDescription = document.getElementById("content-description");
const backHomeButton = document.getElementById("back-home");
const chatSection = document.getElementById("chat");
const profileButton = document.getElementById("profile-button");

const pages = {
  learn: {
    title: "📚 Learn with AFRICA AI",
    description:
      "Build your knowledge, practise English, learn technology and discover useful skills. Ask AFRIKA AI a question to get started."
  },

  business: {
    title: "💼 Business with AFRICA AI",
    description:
      "Explore business ideas, learn marketing, improve customer service and discover ways to solve real problems."
  },

  writing: {
    title: "✍️ Writing with AFRICA AI",
    description:
      "Get help drafting messages, letters, stories, business descriptions and other written content."
  },

  ai: {
    title: "🤖 Your AI Assistant",
    description:
      "Use the chat below to ask questions and explore what an AI assistant can do."
  }
};

function showMessage(sender, text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}-message`;

  const name = document.createElement("strong");
  name.textContent = sender;

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  message.append(name, paragraph);
  messages.appendChild(message);

  message.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });

  return message;
}

function openPage(pageName) {
  const page = pages[pageName];

  if (!page) return;

  contentTitle.textContent = page.title;
  contentDescription.textContent = page.description;

  contentPanel.hidden = false;
  chatSection.hidden = pageName !== "ai";

  contentPanel.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    openPage(button.dataset.page);
  });
});

backHomeButton.addEventListener("click", () => {
  contentPanel.hidden = true;
  chatSection.hidden = false;

  chatSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

document.querySelectorAll('.bottom-nav a[href="#home"]').forEach((link) => {
  link.addEventListener("click", () => {
    contentPanel.hidden = true;
    chatSection.hidden = false;
  });
});

document.querySelectorAll('.bottom-nav a[href="#explore"]').forEach((link) => {
  link.addEventListener("click", () => {
    contentPanel.hidden = false;
    chatSection.hidden = true;

    contentTitle.textContent = "🔎 Explore AFRICA AI";
    contentDescription.textContent =
      "Discover learning resources, business ideas, writing help and new ways to use artificial intelligence.";

    contentPanel.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

profileButton.addEventListener("click", () => {
  contentPanel.hidden = false;
  chatSection.hidden = true;

  contentTitle.textContent = "👤 Your Profile";
  contentDescription.textContent =
    "Welcome to AFRICA AI! Profile accounts and personal settings are not available yet.";

  contentPanel.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = userInput.value.trim();

  if (!question) return;

  showMessage("You", question, "user");

  showMessage(
    "AFRICA AI",
    "Your message has been received by this demo interface. The AI service is not connected yet. We'll connect it through a secure backend in the next stage.",
    "assistant"
  );

  userInput.value = "";
  userInput.focus();
});

console.log("AFRICA AI interface loaded successfully.");
