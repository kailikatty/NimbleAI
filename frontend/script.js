// ===== EMAIL =====
async function generateSummary() {
  const input = document.getElementById("emailInput").value;
  const output = document.getElementById("emailOutput");
  const card = document.getElementById("emailResultCard");

  if (!input) {
    output.innerHTML = "<p class='empty'>Please enter email</p>";
    return;
  }

  // show card
  card.classList.remove("hidden");

  output.innerHTML = "<p class='empty'>Generating...</p>";

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


// ===== TASK =====
async function generateTasks() {
  const input = document.getElementById("taskInput").value;
  const output = document.getElementById("taskOutput");
  const card = document.getElementById("taskResultCard");

  if (!input) return;

  card.classList.remove("hidden");
  output.innerHTML = "<p class='empty'>Generating tasks...</p>";

  // mock ก่อน (ยังไม่ต้อง AI)
  setTimeout(() => {
    output.innerHTML = `
      <ul>
        <li>Break down the task</li>
        <li>Set priorities</li>
        <li>Start execution</li>
      </ul>
    `;
  }, 500);
}


// ===== REPLY =====
async function generateReply() {
  const input = document.getElementById("msgInput").value;
  const output = document.getElementById("replyOutput");
  const card = document.getElementById("replyResultCard");

  if (!input) return;

  card.classList.remove("hidden");
  output.innerHTML = "<p class='empty'>Generating reply...</p>";

  setTimeout(() => {
    output.innerHTML = "<p>Thanks for your message. I’ll get back to you shortly.</p>";
  }, 500);
}


// ===== FILE =====
async function analyzeFile() {
  const file = document.getElementById("fileInput").files[0];
  const output = document.getElementById("fileOutput");
  const card = document.getElementById("fileResultCard");

  if (!file) {
    output.innerHTML = "<p class='empty'>Please upload a file</p>";
    return;
  }

  card.classList.remove("hidden");
  output.innerHTML = "<p class='empty'>Analyzing file...</p>";

  setTimeout(() => {
    output.innerHTML = `<p>File "${file.name}" analyzed successfully.</p>`;
  }, 800);
}


// ===== NAVIGATION =====
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


// ===== OPTIONAL CHAT =====
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


// ===== DEFAULT PAGE =====
window.onload = function () {
  showPage('overview');
};
