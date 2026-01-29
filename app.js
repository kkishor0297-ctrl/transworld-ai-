alert("JS working");
const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

// Load languages
languages.forEach(lang => {
  const option1 = document.createElement("option");
  option1.value = lang.code;
  option1.textContent = lang.name;
  fromLang.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = lang.code;
  option2.textContent = lang.name;
  toLang.appendChild(option2);
});

// Default
fromLang.value = "hi";
toLang.value = "en";

// Translate Text (DEMO LOGIC)
function translateText() {
  const text = inputText.value.trim();
  if (!text) {
    alert("Please enter text");
    return;
  }

  const target = toLang.options[toLang.selectedIndex].text;
  outputText.value = `[${target}] ${text}`;
}

// Clear
function clearText() {
  inputText.value = "";
  outputText.value = "";
}

// Copy
function copyText() {
  navigator.clipboard.writeText(outputText.value);
  alert("Copied");
}

// Share
function shareText() {
  if (navigator.share) {
    navigator.share({
      text: outputText.value
    });
  } else {
    alert("Share not supported");
  }
}
document.addEventListener("DOMContentLoaded", function() {
    // पुरा app.js code यहाँ paste करो
});
