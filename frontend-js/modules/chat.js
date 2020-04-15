import DOMPurify from "dompurify";

class Chat {
  constructor() {
    this.openedYet = false;
    this.chatWrapper = document.querySelector("#chat-wrapper");
    this.openIcon = document.querySelector(".header-chat-icon");
    this.injectHTML();
    this.closeIcon = document.querySelector(".chat-title-bar-close");
    this.chatField = document.querySelector("#chatField");
    this.chatForm = document.querySelector("#chatForm");
    this.chatLog = document.querySelector("#chat");
    this.events();
  }
  // Events
  events() {
    this.openIcon.addEventListener("click", () => this.showChat());
    this.closeIcon.addEventListener("click", () => this.hideChat());
    this.chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.sendMessageToServer();
    });
  }
  // Methods
  showChat() {
    if (!this.openedYet) {
      this.openConnection();
    }
    this.openedYet = true;
    this.chatWrapper.classList.add("chat--visible");
    this.chatField.focus();
  }

  hideChat() {
    this.chatWrapper.classList.remove("chat--visible");
  }

  openConnection() {
    this.socket = io();
    this.socket.on("welcome", (data) => {
      this.username = data.username;
      this.avatar = data.avatar;
    });
    this.socket.on("chatMessageFromServer", (data) => {
      this.displayMessageFromServer(data);
    });
  }

  sendMessageToServer() {
    this.socket.emit("chatMessageFromBrowser", {
      message: this.chatField.value,
    });
    this.chatLog.insertAdjacentHTML(
      "beforeend",
      DOMPurify.sanitize(`
      <div class="chat-self">
      <div class="chat-message">
        <div class="chat-message-inner">
          ${this.chatField.value}
        </div>
      </div>
      <img class="chat-avatar avatar-tiny" src="${this.avatar}">
    </div>
      `)
    );
    this.chatLog.scrollTop = this.chatLog.scrollHeight;
    this.chatField.value = "";
    this.chatField.focus();
  }

  displayMessageFromServer(data) {
    this.chatLog.insertAdjacentHTML(
      "beforeend",
      DOMPurify.sanitize(`
      <div class="chat-other">
          <a href="/profile/${data.username}"><img class="avatar-tiny" src="${data.avatar}"></a>
          <div class="chat-message"><div class="chat-message-inner">
            <a href="/profile/${data.username}"><strong>${data.username}:</strong></a>
            ${data.message}
          </div></div>
        </div>
      `)
    );
    this.chatLog.scrollTop = this.chatLog.scrollHeight;
  }

  injectHTML() {
    this.chatWrapper.innerHTML = `
      <div class="chat-title-bar">Chat <span class="chat-title-bar-close"><i class="fas fa-times-circle"></i></span></div>
      <div id="chat" class="chat-log"></div>
      <form id="chatForm" class="chat-form border-top">
      <input type="text" class="chat-field" id="chatField" placeholder="Type a message…" autocomplete="off">
    </form>
      `;
  }
}

export default Chat;
