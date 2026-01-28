const voiceBtn = document.getElementById('voiceBtn');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const sourceLang = document.getElementById('sourceLang');
const targetLang = document.getElementById('targetLang');

// 1. असली अनुवाद (Real Translation) फंक्शन
async function translateText(text) {
    const s = sourceLang.value;
    const t = targetLang.value;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${s}|${t}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        return "Translation Error! Check Internet.";
    }
}

// 2. आवाज़ से बोलना (Text to Speech)
function speak(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
}

// 3. लिसनिंग बटन और वॉइस रिकग्निशन
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.lang = 'hi-IN'; // डिफ़ॉल्ट हिंदी

voiceBtn.onclick = () => {
    recognition.start();
    voiceBtn.classList.add('listening'); // यहाँ से बटन लाल होगा
    voiceBtn.innerText = "Listening... 🎤";
};

recognition.onresult = async (event) => {
    voiceBtn.classList.remove('listening');
    voiceBtn.innerText = "Start Voice 🎤";
    
    const transcript = event.results[0][0].transcript;
    inputText.value = transcript;
    
    // अनुवाद शुरू करें
    outputText.value = "Translating...";
    const result = await translateText(transcript);
    outputText.value = result;
    
    // अनुवाद सुनने के लिए
    speak(result, targetLang.value);
};

recognition.onerror = () => {
    voiceBtn.classList.remove('listening');
    voiceBtn.innerText = "Start Voice 🎤";
};
