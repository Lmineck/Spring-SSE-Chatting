let username = document.querySelector("#username");
let roomNum = document.querySelector("#roomNum");

function hrefLink(username, roomNum) {
  location.href = `chat.html?${username.value}?${roomNum.value}`;
}

document.querySelector("#inButton").addEventListener("click", () => {
  hrefLink(username, roomNum);
});
