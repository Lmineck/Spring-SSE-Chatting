let username = decodeURI(location.href.split("?")[1]);
let roomNum = location.href.split("?")[2];

document.querySelector("#username").innerHTML = username;

const eventSource = new EventSource(
  `http://localhost:8080/chat/roomNum/${roomNum}`
);

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.sender === username) {
    initMyMessage(data);
  } else {
    initYourMessage(data);
  }
};

function getSendMsgBox(data) {
  let md = data.createdAt.substring(5, 10);
  let tm = data.createdAt.substring(11, 16);
  convertTime = tm + " | " + md;

  return `<div class="sent_msg">
    <p> ${data.message} </p>
    <span class="time_date"> ${convertTime} / <b>${data.sender}</b> </span>
  </div>`;
}

function getReceiveMsgBox(data) {
  let md = data.createdAt.substring(5, 10);
  let tm = data.createdAt.substring(11, 16);
  convertTime = tm + " | " + md;

  return `<div class="received_withd_msg">
    <p> ${data.message} </p>
    <span class="time_date"> ${convertTime} / <b>${data.sender}</b> </span>
  </div>`;
}

function initMyMessage(data) {
  let chatBox = document.querySelector("#chat-box");

  let chatOutgoingBox = document.createElement("div");
  chatOutgoingBox.className = "outgoing_msg";

  chatOutgoingBox.innerHTML = getSendMsgBox(data);
  chatBox.append(chatOutgoingBox);

  document.documentElement.scrollTop = document.body.scrollHeight;
}

function initYourMessage(data) {
  let chatBox = document.querySelector("#chat-box");

  let chatIncommingBox = document.createElement("div");
  chatIncommingBox.className = "received_msg";

  chatIncommingBox.innerHTML = getReceiveMsgBox(data);
  chatBox.append(chatIncommingBox);

  document.documentElement.scrollTop = document.body.scrollHeight;
}

//AJAX
async function addMessage() {
  let msgInput = document.querySelector("#chat-outgoing-msg");

  let chat = {
    sender: username,
    roomNum: roomNum,
    message: msgInput.value,
  };

  fetch("http://localhost:8080/chat", {
    method: "post",
    body: JSON.stringify(chat),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  msgInput.value = "";
}

document.querySelector("#chat-send").addEventListener("click", () => {
  addMessage();
});

document
  .querySelector("#chat-outgoing-msg")
  .addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      addMessage();
    }
  });
