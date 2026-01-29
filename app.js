// app.js
// DOM Elements
const inputLang = document.getElementById("inputLang");
const outputLang = document.getElementById("outputLang");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const listenBtn = document.getElementById("listenTranslate");
const translateBtn = document.getElementById("translateText");
const copyBtn = document.getElementById("copyText");
const clearBtn = document.getElementById("clearText");
const shareBtn = document.getElementById("shareText");

// Populate languages
languages.forEach(lang => {
  let option1 = document.createElement("option");
  option1.value = lang;
  option1.textContent = lang;
  inputLang.appendChild(option1);

  let option2 = document.createElement("option");
  option2.value = lang;
  option2.textContent = lang;
  outputLang.appendChild(option2);
});

// Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

listenBtn.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = (event) => {
  let speech = event.results[0][0].transcript;
  inputText.value = speech;
  translateTextFunction();
}

// Translation Function
async function translateTextFunction() {
  let text = inputText.value.trim();
  if(!text) return;

  let targetLang = outputLang.value;

  // Use Google Translate API or OpenAI API in real project
  // For demo, mimic translation by adding language tag
  outputText.value = `[${targetLang}] ${text}`;

  // Text-to-Speech
  const utterance = new SpeechSynthesisUtterance(outputText.value);
  utterance.lang = 'en-US'; // Change dynamically if needed
  speechSynthesis.speak(utterance);
}

translateBtn.addEventListener("click", translateTextFunction);

// Copy
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(outputText.value);
});

// Clear
clearBtn.addEventListener("click", () => {
  inputText.value = "";
  outputText.value = "";
});

// Share
shareBtn.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Transworld AI Translation",
        text: outputText.value
      });
    } catch (err) {
      alert("Share failed: " + err.message);
    }
  } else {
    alert("Share not supported on this browser.");
  }
});
