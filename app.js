document.addEventListener("DOMContentLoaded", function() {
    const langDropdown = document.getElementById("languageDropdown");
    const translateBtn = document.getElementById("translateBtn");
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");
    const speakBtn = document.getElementById("speakBtn");
    const micBtn = document.getElementById("micBtn");

    // Populate dropdown
    languages.forEach(lang => {
        const option = document.createElement("option");
        option.value = lang.code;
        option.text = lang.name;
        langDropdown.appendChild(option);
    });

    // Placeholder translation function
    function translate(text, targetLang) {
        return `[${targetLang}] ${text}`;
    }

    // Translate button
    translateBtn.addEventListener("click", function() {
        const text = inputText.value.trim();
        const lang = langDropdown.value;
        if(!text || !lang) {
            alert("Enter text and select language!");
            return;
        }
        outputText.value = translate(text, lang);
    });

    // Text-to-Speech
    speakBtn.addEventListener("click", function() {
        const msg = new SpeechSynthesisUtterance(outputText.value);
        window.speechSynthesis.speak(msg);
    });

    // Microphone input
    micBtn.addEventListener("click", function() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();
        recognition.onresult = function(event) {
            inputText.value = event.results[0][0].transcript;
        }
    });
});
