const input = document.querySelector(".chat input");
const sendButton = document.querySelector(".chat button");
const chat = document.querySelector(".chat");

sendButton.addEventListener("click", function () {
  const question = input.value.trim();

  if (question === "") {
    alert("Please type a question first.");
    return;
  }

  const message = document.createElement("p");

  message.innerHTML =
    "<strong>You:</strong> " + question;

  chat.appendChild(message);

  input.value = "";

  const reply = document.createElement("p");

  reply.innerHTML =
    "<strong>AFRIKA AI:</strong> Thanks for your question! I'm still learning. 🤖🌍";

  chat.appendChild(reply);
});
