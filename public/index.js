const socket = io();

let myName;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".chats");
do {
  myName = prompt("Please enter your name: ");
} while (!myName);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.target.value !== "" && sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: myName,
    message: message.trim(),
  };
  //Append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  //Send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
    <h6>${msg.user}</h6>
    <p>${msg.message}</p>
  `;

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//Receive

socket.on("message", (payload) => {
  appendMessage(payload, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
