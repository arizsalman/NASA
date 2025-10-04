


// Next code 
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");

// Send message on button click
sendBtn.addEventListener("click", sendMessage);

// Send message on Enter key
userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function addMessage(sender, text, isHTML = false) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.className = sender;

  if (isHTML) {
    msg.innerHTML = (sender === "user" ? "🧑 You: " : "👨‍🚀 Astronaut says: ") + text;
  } else {
    msg.textContent = (sender === "user" ? "🧑 You: " : "👨‍🚀 Astronaut says: ") + text;
  }

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  const normalizedMsg = message.toLowerCase().replace(/['"]/g, "");
  addMessage("user", message);

  // Replace with your NASA API key
  let apiKey = "qzgmcOSL0mnZqi7pU5qBkzrgo6QCpuwywat5BuE7";
  let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  // Random picture
  if (normalizedMsg.includes("random")) {
    const start = new Date(1995, 5, 16);
    const end = new Date();
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const dateStr = randomDate.toISOString().split("T")[0];
    apiUrl += `&date=${dateStr}`;
  }

  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(data => handleAstronautResponse(normalizedMsg, data))
    .catch(err => {
      console.error(err);
      // Fallback data
      const fallbackData = {
        media_type: "image",
        url: "https://apod.nasa.gov/apod/image/2409/IC405_Abolfath_960.jpg",
        hdurl: "https://apod.nasa.gov/apod/image/2409/IC405_Abolfath_960.jpg",
        title: "Flaming Star Nebula",
        explanation: "Fallback image: This is a beautiful space nebula in case NASA API is unavailable."
      };
      handleAstronautResponse(normalizedMsg, fallbackData);
    });

  userInput.value = "";
}

function handleAstronautResponse(msg, data) {
  if (msg.includes("hi") || msg.includes("hello")) {
    addMessage("astro", "Hello 👋! I can show you NASA's Astronomy Picture of the Day, tell you its title, or explain it.");
  } else if (msg.includes("picture") || msg.includes("image") || msg.includes("photo") || msg.includes("astronomy")) {
    if (data.media_type === "image") {
      const imageHTML = `<a href="${data.hdurl || data.url}" target="_blank">
        <img src="${data.url}" alt="${data.title}" style="max-width:300px; cursor:pointer; border:2px solid #ccc; border-radius:8px;"/>
      </a>`;
      addMessage("astro", imageHTML, true);
      addMessage("astro", `This is the Astronomy Picture: "${data.title}"`);
    } else if (data.media_type === "video") {
      const videoHTML = `<a href="${data.url}" target="_blank">Watch the video here 🎥</a>`;
      addMessage("astro", videoHTML, true);
      addMessage("astro", `This is the Astronomy video: "${data.title}"`);
    }
  } else if (msg.includes("title")) {
    addMessage("astro", `The picture is titled: "${data.title}"`);
  } else if (msg.includes("explain") || msg.includes("about") || msg.includes("detail")) {
    addMessage("astro", data.explanation);
  } else {
    addMessage("astro", "I can answer about the picture, its title, or explain it. Try asking: 'Show me picture', 'Show me random picture', 'What is the title?', or 'Explain'.");
  }
}

