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
        bottom: 24px;
        right: 24px;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 12px 30px rgba(37, 99, 235, 0.35);
        z-index: 999999;
        transition: all 0.3s ease;
        backdrop-filter: blur(8px);
      }

      .cb-btn:hover {
        transform: translateY(-4px) scale(1.05);
        box-shadow: 0 18px 38px rgba(37, 99, 235, 0.45);
      }

      .cb-window {
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 380px;
        height: 520px;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 22px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.18);
        display: none;
        flex-direction: column;
        overflow: hidden;
        z-index: 999999;
        font-family: Inter, Arial, sans-serif;
        backdrop-filter: blur(14px);
        border: 1px solid rgba(255,255,255,0.6);
        animation: cbFadeUp 0.25s ease;
      }

      @keyframes cbFadeUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .cb-header {
        background: linear-gradient(135deg, #2563eb, #1e40af);
        color: white;
        padding: 16px 18px;
        font-weight: 600;
        font-size: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        letter-spacing: 0.2px;
      }

      .cb-close {
        cursor: pointer;
        font-size: 18px;
        opacity: 0.9;
        transition: opacity 0.2s ease;
      }

      .cb-close:hover {
        opacity: 1;
      }

      .cb-app-container {
        flex: 1;
        background: #f8fafc;
        padding: 0;
      }

      .cb-app-container iframe {
        width: 100%;
        height: 100%;
        border: none;
        background: white;
      }

      @media (max-width: 480px) {
        .cb-window {
          width: calc(100vw - 20px);
          height: 70vh;
          right: 10px;
          bottom: 85px;
        }

        .cb-btn {
          right: 16px;
          bottom: 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function initChatbot() {
    const botId = getScriptId();

    if (!botId || !VALID_IDS.includes(botId)) {
      console.error("Chatbot Widget: Invalid or missing chatbot ID.");
      return;
    }

    injectStyles();

    const btn = document.createElement("div");
    btn.className = "cb-btn";
    btn.innerHTML = "💬";

    const win = document.createElement("div");
    win.className = "cb-window";

    win.innerHTML = `
      <div class="cb-header">
        <span>Chat Assistant</span>
        <span class="cb-close">&times;</span>
      </div>

      <div class="cb-app-container">
        <iframe src="http://localhost:3001/analytics/dashboard"></iframe>
      </div>
    `;

    const closeBtn = win.querySelector(".cb-close");

    btn.addEventListener("click", () => {
      win.style.display = win.style.display === "flex" ? "none" : "flex";
    });

    closeBtn.addEventListener("click", () => {
      win.style.display = "none";
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