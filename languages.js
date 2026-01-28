const langs = [
 {c:"en-US",n:"English"},
 {c:"hi-IN",n:"Hindi"},
 {c:"bn-IN",n:"Bengali"},
 {c:"ta-IN",n:"Tamil"},
 {c:"te-IN",n:"Telugu"},
 {c:"mr-IN",n:"Marathi"},
 {c:"gu-IN",n:"Gujarati"},
 {c:"pa-IN",n:"Punjabi"},
 {c:"ur-PK",n:"Urdu"},
 {c:"fr-FR",n:"French"},
 {c:"de-DE",n:"German"},
 {c:"es-ES",n:"Spanish"},
 {c:"pt-PT",n:"Portuguese"},
 {c:"ru-RU",n:"Russian"},
 {c:"ja-JP",n:"Japanese"},
 {c:"ko-KR",n:"Korean"},
 {c:"zh-CN",n:"Chinese"},
 {c:"ar-SA",n:"Arabic"},
 {c:"it-IT",n:"Italian"},
 {c:"tr-TR",n:"Turkish"},
 {c:"vi-VN",n:"Vietnamese"},
 {c:"id-ID",n:"Indonesian"},
 {c:"th-TH",n:"Thai"},
 {c:"nl-NL",n:"Dutch"},
 {c:"pl-PL",n:"Polish"},
 {c:"uk-UA",n:"Ukrainian"}
];

const inSel=document.getElementById("inputLang");
const outSel=document.getElementById("outputLang");

langs.forEach(l=>{
  let o1=document.createElement("option");
  o1.value=l.c; o1.textContent=l.n;
  inSel.appendChild(o1);

  let o2=document.createElement("option");
  o2.value=l.c; o2.textContent=l.n;
  outSel.appendChild(o2);
});

inSel.value="hi-IN";
outSel.value="en-US";
