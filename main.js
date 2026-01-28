const voiceBtn = document.getElementById('voiceBtn');
const translateBtn = document.getElementById('translateBtn');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const sLang = document.getElementById('sourceLang');
const tLang = document.getElementById('targetLang');

// 1. 🎤 आवाज़ रिकॉर्ड करना (Speech to Text)
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'hi-IN'; // शुरुआत में हिंदी

voiceBtn.onclick = () => {
    recognition.start();
    voiceBtn.classList.add('listening'); // बटन लाल हो जाएगा
    voiceBtn.innerText = "Listening... 🎤";
};

recognition.onresult = async (event) => {
    voiceBtn.classList.remove('listening');
    voiceBtn.innerText = "Start Voice 🎤";
    const text = event.results[0][0].transcript;
    inputText.value = text;
    processTranslation(text);
};

// 2. ✍️ एडिट किए हुए टेक्स्ट को ट्रांसलेट करना
translateBtn.onclick = () => {
    processTranslation(inputText.value);
};

// 3. 🌍 असली अनुवाद और आवाज़ (Translation & Sound)
async function processTranslation(text) {
    if(!text) return;
    outputText.value = "Translating...";
    
    // API के लिए 2-letter कोड लेना (जैसे hi-IN से hi)
    const source = sLang.value.split('-')[0];
    const target = tLang.value.split('-')[0];
    
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const result = data.responseData.translatedText;
        
        outputText.value = result;
        
        // 🔊 अनुवाद को बोलकर सुनाना
        const speech = new SpeechSynthesisUtterance(result);
        speech.lang = tLang.value; // जो भाषा चुनी है उसी के लहजे में बोलेगा
        window.speechSynthesis.speak(speech);
        
    } catch (err) {
        outputText.value = "Error: Check Connection";
    }
}
