// ===== CONFIG =====
const API_BASE = "https://nimbleai.onrender.com";


// ===== EMAIL =====
async function generateSummary() {
  const input = document.getElementById("emailInput").value;
  const output = document.getElementById("emailOutput");
  const card = document.getElementById("emailResultCard");

  if (!input) {
    output.innerHTML = "<p class='empty'>Please enter email</p>";
    return;
  }

  card.classList.remove("hidden");
  output.innerHTML = "<p class='empty'>Generating...</p>";

  await callAPI("email", input, output);
}


// ===== TASK =====
async function generateTasks() {
  const input = document.getElementById("taskInput").value;
  const output = document.getElementById("taskOutput");
  const card = document.getElementById("taskResultCard");

  if (!input) {
    output.innerHTML = "<p class='empty'>Please enter task</p>";
    return;
  }

  card.classList.remove("hidden");
  output.innerHTML = "<p class='empty'>Generating tasks...</p>";

  await callAPI("task", input, output);
}


// ===== REPLY =====
async function generateReply() {
  const input = document.getElementById("msgInput").value;
  const output = document.getElementById("replyOutput");
  const card = document.getElementById("replyResultCard");

  if (!input) {
    output.innerHTML = "<p class='empty'>Please enter message</p>";
    return;
  }

  card.classList.remove("hidden");
  output.innerHTML = "<p class='empty'>Generating reply...</p>";

  await callAPI("reply", input, output);
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

  // ใช้ชื่อไฟล์เป็น input ก่อน
  await callAPI("file", file.name, output);
}


// ===== CORE API FUNCTION =====
async function callAPI(type, input, output) {
  let endpoint = "";

  if (type === "email") endpoint = "/email/email/summarize";
  else if (type === "task") endpoint = "/task/task/generate";
  else if (type === "reply") endpoint = "/reply/reply/generate";
  else if (type === "file") endpoint = "/file/file/analyze";

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: input })
    });

    // 🔥 เช็ค status กันพัง
    if (!res.ok) {
      throw new Error("API error");
    }

    const data = await res.json();
    console.log("API response:", data); // debug

    const result =
      data.summary ||
      data.tasks ||
      data.reply ||
      data.result ||
      data.message ||
      "No result";

    output.innerHTML = `<p>${result}</p>`;
  } catch (err) {
    output.innerHTML = "<p class='empty'>Error occurred</p>";
    console.error("API ERROR:", err);
  }
}


// ===== NAVIGATION =====
function showPage(pageId, el) {
  document.querySelectorAll('.page').forEach(p => {
    p.style.display = 'none';
  });

  document.getElementById(pageId).style.display = 'block';

  document.querySelectorAll('.sidebar li').forEach(li => {
    li.classList.remove('active');
  });

  if (el) el.classList.add('active');
}


// ===== OPTIONAL CHAT =====
async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;

  if (!message) return;

  addMessage(message, "user");

  try {
    const res = await fetch(`${API_BASE}/email/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });

    const data = await res.json();

    addMessage(data.summary || "No response", "bot");
  } catch (err) {
    addMessage("Error occurred", "bot");
  }

  input.value = "";
}


// ===== CHAT UI =====
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
