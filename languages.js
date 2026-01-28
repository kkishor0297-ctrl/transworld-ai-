const languages = [
  // World Top 20
  "English", "Spanish", "Chinese", "French", "Arabic",
  "Russian", "Portuguese", "Japanese", "German", "Korean",
  "Italian", "Turkish", "Dutch", "Polish", "Swedish",
  "Norwegian", "Thai", "Vietnamese", "Indonesian", "Greek",
  // India Top 6
  "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Gujarati"
];

const inputLangSelect = document.getElementById('inputLang');
const outputLangSelect = document.getElementById('outputLang');

languages.forEach(lang => {
  const option1 = document.createElement('option');
  option1.value = lang;
  option1.text = lang;
  inputLangSelect.appendChild(option1);

  const option2 = document.createElement('option');
  option2.value = lang;
  option2.text = lang;
  outputLangSelect.appendChild(option2);
});
