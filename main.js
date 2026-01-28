const startBtn = document.getElementById('startBtn');
const translateBtn = document.getElementById('translateBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');

const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');

const inputSelect = document.getElementById('inputLang');
const outputSelect = document.getElementById('outputLang');

// Voice Input
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = false;

startBtn.addEventListener('click', ()=>{
  recognition.lang = inputSelect.value || 'en-US';
  recognition.start();
});

recognition.onresult = (event)=>{
  const transcript = event.results[event.results.length-1][0].transcript;
  inputText.value += transcript + ' ';
};

// Translate & Voice Output
translateBtn.addEventListener('click', async ()=>{
  const text = inputText.value.trim();
  const sourceLang = inputSelect.value;
  const targetLang = outputSelect.value;

  if(!text) return alert('Please enter text!');

  // Dummy translation (replace with real API)
  const translated = `(${targetLang}) ${text}`;
  outputText.textContent = translated;

  // Voice output
  const utter = new SpeechSynthesisUtterance(translated);
  utter.lang = targetLang || 'en-US';
  utter.rate = 1; // normal speed
  utter.pitch = 1; // normal pitch
  speechSynthesis.speak(utter);
});

// Clear
clearBtn.addEventListener('click', ()=>{
  inputText.value=''; outputText.textContent='';
});

// Copy
copyBtn.addEventListener('click', ()=>{
  navigator.clipboard.writeText(outputText.textContent);
  alert('Copied!');
});

// Share
shareBtn.addEventListener('click', ()=>{
  if(navigator.share){
    navigator.share({ text: outputText.textContent }).catch(err=>console.log(err));
  } else alert('Share not supported.');
});
