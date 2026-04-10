async function generateSummary() {
  alert("Working!");
  const text = document.querySelector("textarea").value;
  console.log(text);

  const res = await fetch("http://127.0.0.1:8000/email/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  const data = await res.json();
  document.querySelector(".output").innerText = data.summary;
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;

  if (!message) return;

  // แสดงข้อความ user
  addMessage(message, "user");

  // เรียก API FastAPI
  const res = await fetch("http://127.0.0.1:8000/email/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: message,
    }),
  });

  const data = await res.json();

  // แสดงผลลัพธ์
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
