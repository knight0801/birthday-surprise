const name = "Alexa my baby"; 

document.getElementById("person-name").textContent = name;

const terminalLines = [
  "> sudo birthday --initialize",
  "> Checking friendship.exe ............ OK",
  "> Loading memories ................... OK",
  "> Scanning happiness levels .......... 100%",
  "> Warning: too much awesomeness detected!",
  "> Compiling wishes ................... DONE",
  "> Deploying birthday.exe ............. DONE",
  "",
  "> ACCESS GRANTED.",
  "> Welcome to a very special birthday."
];

const output = document.getElementById("terminal-output");
let lineIndex = 0, charIndex = 0;

function typeTerminal(){
  if(lineIndex >= terminalLines.length){
    setTimeout(startLoading,900);
    return;
  }
  const line = terminalLines[lineIndex];
  if(charIndex < line.length){
    output.innerHTML += line[charIndex++];
    setTimeout(typeTerminal, 28);
  }else{
    output.innerHTML += "<br>";
    lineIndex++; charIndex=0;
    setTimeout(typeTerminal, 230);
  }
}

function startLoading(){
  show("loading-screen");
  let progress=0;
  const messages=[
    "Initializing happiness modules...",
    "Compiling beautiful memories...",
    "Installing good vibes...",
    "Removing bad days...",
    "Deploying birthday wishes..."
  ];
  const bar=document.getElementById("progress-bar");
  const percent=document.getElementById("percent");
  const txt=document.getElementById("loading-text");
  const timer=setInterval(()=>{
    progress+=1;
    bar.style.width=progress+"%";
    percent.textContent=progress+"%";
    if(progress%20===0) txt.textContent=messages[Math.min(progress/20-1,4)];
    if(progress>=100){
      clearInterval(timer);
      setTimeout(()=>show("birthday-screen"),700);
    }
  },28);
}

function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0,0);
}

document.getElementById("open-btn").onclick=()=>show("memories-screen");
document.getElementById("replay-btn").onclick=()=>{
  output.innerHTML="";
  lineIndex=0; charIndex=0;
  show("terminal-screen");
  setTimeout(typeTerminal,500);
};

setTimeout(typeTerminal,700);
