// ===== CONFIG =====
const API_BASE = "https://nimbleai.onrender.com";


function formatEmail(text) {
  return text
    .replace(/\*/g, "")
    .replace(/\n/g, "<br>")
    .replace(
      /(Main Purpose:|Key Points:|Important Details:|Suggested Action:)/g,
      "<br><strong>$1</strong>"
    );
}

function formatTask(text) {
  return text
    .replace(/\*/g, "")
    .replace(/\n/g, "<br>")
    .replace(/(\d+\.\s*Step:)/g, "<strong>$1</strong>");
}

function formatReply(text) {
  return text
    .replace(/\*/g, "")
    .replace(/\n/g, "<br>");
}

function analyzeFile() {
  console.log("CLICKED");
}


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

console.log("JS LOADED");
// ===== FILE =====

async function analyzeFile() {
  console.log("CLICKED");
  const file = document.getElementById("fileInput").files[0];
  const output = document.getElementById("fileOutput");
  const card = document.getElementById("fileResultCard");

  if (!file) {
    output.innerHTML = "Please upload a file";
    return;
  }
  
  card.classList.remove("hidden");
  output.innerHTML = "Analyzing...";

  const formData = new FormData();
  formData.append("upload_file", file);

  try {
    const res = await fetch(`${API_BASE}/file/analyze`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    console.log("RESPONSE:", data); // 👈 debug

    
  let text = data.result || JSON.stringify(data);

  // ❌ ลบ markdown ที่ไม่สวย
  text = text.replace(/#{1,6}\s*/g, "");   // ลบ ## ###
  text = text.replace(/\*\*/g, "");        // ลบ **

  // ✅ เว้นบรรทัดใหม่
  text = text.replace(/\n/g, "<br>");

  // ✅ ทำ list (1. 2. 3.)
  text = text.replace(/(\d+\.\s)/g, "<br>$1");

  // ✅ ทำหัวข้อ
  text = text.replace(
    /(Article:|Summary:|Main Points:|Key Points:|Key Takeaways:|Key Insights:|Important Details:|Conclusion:)/g,
    "<strong>$1</strong>"
  );

// ✅ แสดงผล
output.innerHTML = `
  <div style="line-height:1.8; font-size:15px;">
    ${text}
  </div>
`;
    
  } catch (err) {
    console.error(err);
    output.innerHTML = "Error analyzing file";
  }
}

// ===== CORE API FUNCTION =====
async function callAPI(type, input, output) {
  let endpoint = "";

  if (type === "email") endpoint = "/email/email/summarize";
  else if (type === "task") endpoint = "/task/task"; 
  else if (type === "reply") endpoint = "/reply/reply/generate";
  else if (type === "file") endpoint = "/file/analyze";

  const url = `${API_BASE}${endpoint}`;
  console.log("CALLING:", url);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: input })
    });

    // เช็ค error จาก backend
    if (!res.ok) {
      const text = await res.text();
      if (text.includes("503")) {
        output.innerHTML = "<p class='empty'>Server busy, try again in a few seconds</p>";
      } else {
        output.innerHTML = `<p class='empty'>${text}</p>`;
      }
      return;
    }
  
    const data = await res.json();
    console.log("DATA:", data);

    const result =
      data.summary ||
      data.tasks ||
      data.task ||
      data.reply ||
      data.result ||
      data.output ||
      data ||
      "No result";


    

    let formatted = result
      .replace(/\*/g, "")
      .replace(/\n/g, "<br>");

    if (type === "email") {
      formatted = formatted.replace(
        /(Main Purpose:|Key Points:|Important Details:|Suggested Action:)/g,
        "<br><strong>$1</strong>"
      );
    }

    if (type === "task") {
      formatted = formatted.replace(
        /(\d+\.\s*Step:)/g,
        "<br><strong>$1</strong>"
      );
    }

    output.innerHTML = `
      <div style="line-height:1.8;">
        ${formatted}
      </div>
    `;
    
  } catch (err) {
    console.error("FETCH ERROR:", err);
    output.innerHTML = "<p class='empty'>Server busy, try again in a few seconds</p>";  
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
    const res = await fetch(`${API_BASE}/email/email/summarize`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });

    const data = await res.json();
    console.log("API response:", data);

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

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#file button");

  if (btn) {
    btn.addEventListener("click", analyzeFile);
    console.log("Button connected");
  } else {
    console.log("Button NOT found");
  }
});
