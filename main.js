const translateBtn = document.getElementById('translateBtn');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const languageSelect = document.getElementById('language');

translateBtn.addEventListener('click', () => {
    const text = inputText.value.trim();
    const lang = languageSelect.value;
    if(!text) return alert('Please enter text!');
    
    // Dummy translation for demo (replace with API later)
    outputText.textContent = `Translated (${lang}): ${text}`;
});
