(function () {
  const VALID_IDS = ["SITE_12345", "CLIENT_98765"];

  function getScriptId() {
    const scripts = document.getElementsByTagName("script");

    for (let script of scripts) {
      if (script.getAttribute("data-chatbot-id")) {
        return script.getAttribute("data-chatbot-id");
      }
    }
    return null;
  }

  function injectStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
      .cb-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        cursor: pointer;
        box-shadow: 0 10px 25px rgba(0,0,0,0.25);
        z-index: 999999;
        transition: transform 0.2s ease;
      }

      .cb-btn:hover {
        transform: scale(1.08);
      }

      .cb-window {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 340px;
        height: 450px;
        background: white;
        border-radius: 14px;
        box-shadow: 0 15px 40px rgba(0,0,0,0.25);
        display: none;
        flex-direction: column;
        overflow: hidden;
        z-index: 999999;
        font-family: Arial, sans-serif;
      }

      .cb-header {
        background: #2563eb;
        color: white;
        padding: 12px;
        font-weight: bold;
        font-size: 14px;
      }

      .cb-messages {
        flex: 1;
        padding: 12px;
        overflow-y: auto;
        font-size: 14px;
        background: #f9fafb;
      }

      .cb-input-area {
        display: flex;
        border-top: 1px solid #e5e7eb;
        padding: 8px;
        background: white;
      }

      .cb-input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 8px;
        outline: none;
      }

      .cb-send {
        margin-left: 8px;
        padding: 8px 12px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }

      .cb-msg {
        margin: 6px 0;
        padding: 8px 10px;
        border-radius: 8px;
        max-width: 80%;
      }

      .cb-user {
        background: #dbeafe;
        align-self: flex-end;
      }

      .cb-bot {
        background: #e5e7eb;
        align-self: flex-start;
      }
    `;
    document.head.appendChild(style);
  }

  // function initChatbot() {
  //   const botId = getScriptId();

  //   if (!botId || !VALID_IDS.includes(botId)) {
  //     console.error("Chatbot Widget: Invalid or missing chatbot ID.");
  //     return;
  //   }

  //   injectStyles();

  //   // Button
  //   const btn = document.createElement("div");
  //   btn.className = "cb-btn";
  //   btn.innerHTML = "💬";

  //   // Window
  //   const win = document.createElement("div");
  //   win.className = "cb-window";

  //   win.innerHTML = `
  //     <div class="cb-header">Chat Assistant</div>
  //     <div class="cb-messages"></div>
  //     <div class="cb-input-area">
  //       <input class="cb-input" type="text" placeholder="Type a message..." />
  //       <button class="cb-send">Send</button>
  //     </div>
  //   `;

  //   const messages = win.querySelector(".cb-messages");
  //   const input = win.querySelector(".cb-input");
  //   const sendBtn = win.querySelector(".cb-send");

  //   function addMessage(text, type) {
  //     const msg = document.createElement("div");
  //     msg.className = `cb-msg ${type}`;
  //     msg.textContent = text;
  //     messages.appendChild(msg);
  //     messages.scrollTop = messages.scrollHeight;
  //   }

  //   btn.addEventListener("click", () => {
  //     win.style.display = win.style.display === "flex" ? "none" : "flex";
  //     if (win.style.display === "flex") {
  //       input.focus();
  //     }
  //   });

  //   sendBtn.addEventListener("click", sendMessage);
  //   input.addEventListener("keypress", (e) => {
  //     if (e.key === "Enter") sendMessage();
  //   });

  //   function sendMessage() {
  //     const text = input.value.trim();
  //     if (!text) return;

  //     addMessage(text, "cb-user");
  //     input.value = "";

  //     setTimeout(() => {
  //       addMessage("This is a demo response 👋", "cb-bot");
  //     }, 500);
  //   }

  //   document.body.appendChild(btn);
  //   document.body.appendChild(win);

  //   console.log("Chatbot Widget Loaded for ID:", botId);
  // }

  function initChatbot() {
    const botId = getScriptId();

    if (!botId || !VALID_IDS.includes(botId)) {
      console.error("Chatbot Widget: Invalid or missing chatbot ID.");
      return;
    }

    injectStyles();

    // Floating button
    const btn = document.createElement("div");
    btn.className = "cb-btn";
    btn.innerHTML = "💬";

    // Chat window
    const win = document.createElement("div");
    win.className = "cb-window";

    win.innerHTML = `
    <div class="cb-header">Chat Assistant</div>

    <!-- IFRAME APP CONTAINER -->
    <div class="cb-app-container" style="flex:1;">
      <iframe
        src="https://nextjsredisvectordatabasesearch.vercel.app/analytics/dashboard"
        style="
          width:100%;
          height:100%;
          border:none;
        "
      ></iframe>
    </div>
  `;

    btn.addEventListener("click", () => {
      win.style.display = win.style.display === "flex" ? "none" : "flex";
    });

    document.body.appendChild(btn);
    document.body.appendChild(win);

    console.log("Chatbot Widget Loaded for ID:", botId);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
