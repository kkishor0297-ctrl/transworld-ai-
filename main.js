const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const listenBtn = document.getElementById('listenBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const shareBtn = document.getElementById('shareBtn');

let recognizing = false;
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = true;

// Start / Stop listening
listenBtn.addEventListener('click', () => {
  if (!recognizing) {
    recognition.start();
    recognizing = true;
    listenBtn.textContent = '🛑 Stop Listening';
  } else {
    recognition.stop();
    recognizing = false;
    listenBtn.textContent = '🎤 Listen & Translate';
  }
});

// On voice input
recognition.onresult = async (event) => {
  const speech = event.results[event.results.length-1][0].transcript;
  inputText.value = speech;

  const from = inputLang.value;
  const to = outputLang.value;

  // Call Translation function
  const translated = await translateAPI(speech, from, to);
  outputText.value = translated;

  // Speech output
  const utter = new SpeechSynthesisUtterance(translated);
  utter.lang = to;
  speechSynthesis.speak(utter);
};

// Copy Button
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(outputText.value);
});

// Clear Button
clearBtn.addEventListener('click', () => {
  inputText.value = '';
  outputText.value = '';
});

// Share Button
shareBtn.addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({ text: outputText.value });
  } else {
    alert('Sharing not supported');
  }
});

// Fake Translation API (replace with real one)
async function translateAPI(text, from, to) {
  // Real API: Google Translate, DeepL, or LibreTranslate
  return `[${to}] ${text}`;
}
