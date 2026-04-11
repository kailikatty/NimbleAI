// ===== EMAIL =====
async function generateSummary() {
  const input = document.getElementById("emailInput").value;
  const output = document.getElementById("emailOutput");

  if (!input) {
    output.innerHTML = "<p class='empty'>Please enter email</p>";
    return;
  }

  output.innerHTML = "Loading...";

  try {
    const res = await fetch("http://127.0.0.1:8000/email/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();

    output.innerHTML = `<p>${data.summary}</p>`;
  } catch (err) {
    output.innerHTML = "<p class='empty'>Error occurred</p>";
  }
}


// ===== OPTIONAL CHAT STYLE =====
async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;

  if (!message) return;

  addMessage(message, "user");

  const res = await fetch("http://127.0.0.1:8000/email/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: message }),
  });

  const data = await res.json();

  addMessage(data.summary, "bot");

  input.value = "";
}

function addMessage(text, sender) {
  const chatBox = document.getElementById("chatBox");

  const msg = document.createElement("div");
  msg.className = sender === "user" ? "user-msg" : "bot-msg";
  msg.innerText = text;

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.style.display = 'none';
  });

  document.getElementById(pageId).style.display = 'block';

  document.querySelectorAll('.sidebar li').forEach(li => {
    li.classList.remove('active');
  });

  event.target.classList.add('active');
}

// default หน้าแรก
window.onload = function () {
  showPage('overview');
};
