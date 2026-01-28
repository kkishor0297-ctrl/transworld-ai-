const startBtn=document.getElementById("startBtn");
const stopBtn=document.getElementById("stopBtn");
const copyBtn=document.getElementById("copyBtn");
const clearBtn=document.getElementById("clearBtn");

const inputText=document.getElementById("inputText");
const outputText=document.getElementById("outputText");

const inputLang=document.getElementById("inputLang");
const outputLang=document.getElementById("outputLang");

const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
const recognition=new SpeechRecognition();

recognition.continuous=true;
recognition.interimResults=false;

startBtn.onclick=()=>{
 recognition.lang=inputLang.value;
 recognition.start();
 startBtn.classList.add("active"); // GREEN
};

stopBtn.onclick=()=>{
 recognition.stop();
 startBtn.classList.remove("active");
};

recognition.onresult=e=>{
 const text=e.results[e.results.length-1][0].transcript;
 inputText.value+=text+" ";
 speak(text);
};

function speak(text){
 outputText.textContent=text;
 speechSynthesis.cancel(); // FIX sound issue
 const u=new SpeechSynthesisUtterance(text);
 u.lang=outputLang.value;
 u.rate=1;
 u.pitch=1;
 speechSynthesis.speak(u);
}

inputText.onchange=()=>{
 speak(inputText.value);
};

copyBtn.onclick=()=>{
 navigator.clipboard.writeText(outputText.textContent);
 alert("Copied");
};

clearBtn.onclick=()=>{
 inputText.value="";
 outputText.textContent="";
 speechSynthesis.cancel();
};
