const voiceBtn = document.getElementById('voiceBtn');
const translateBtn = document.querySelector('.translate-edited-btn'); // आपके UI के हिसाब से
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const sLang = document.getElementById('sourceLang');
const tLang = document.getElementById('targetLang');

// 🎤 1. आवाज़ से सुनना (Speech to Text)
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;

voiceBtn.onclick = () => {
    recognition.lang = sLang.value; // चुनी हुई भाषा में सुनना
    recognition.start();
    voiceBtn.classList.add('listening');
    voiceBtn.innerText = "Listening... 🎤";
};

recognition.onresult = (event) => {
    voiceBtn.classList.remove('listening');
    voiceBtn.innerText = "Start Voice 🎤";
    const transcript = event.results[0][0].transcript;
    inputText.value = transcript;
    runTranslation(transcript);
};

// ✍️ 2. एडिट किए हुए टेक्स्ट को ट्रांसलेट करना
if(translateBtn) {
    translateBtn.onclick = () => runTranslation(inputText.value);
}

// 🌍 3. असली अनुवाद और साउंड रिप्लाई
async function runTranslation(text) {
    if(!text) return;
    outputText.value = "Translating...";

    // API के लिए 2-letter कोड (hi-IN -> hi)
    const source = sLang.value.split('-')[0];
    const target = tLang.value.split('-')[0];

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const result = data.responseData.translatedText;
        
        outputText.value = result;

        // 🔊 अनुवाद को बोलकर सुनाना (Sound Reply)
        const speech = new SpeechSynthesisUtterance(result);
        speech.lang = tLang.value; // सही लहजे में बोलना
        window.speechSynthesis.speak(speech);

    } catch (err) {
        outputText.value = "Error: Please check connection.";
    }
}

// 🧹 Clear Function
document.getElementById('clearBtn').onclick = () => {
    inputText.value = "";
    outputText.value = "";
};
