let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let statusimg= document.querySelector("#image");

function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        setTimeout(populateVoiceList, 100); 
        return;
    }
    voiceSelect.innerHTML = ''; 
    voices.forEach((voice, i) => {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
    });
    speech.voice = voices[0];
}

window.speechSynthesis.onvoiceschanged = populateVoiceList;

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);

    statusimg.src = "listen2.png";
    statusimg.style.width = "16px";
    statusimg.style.marginRight="10px";
    statusimg.style.color = "white";

    speech.onend = () => {
        statusimg.src = "play.png";
    }
});

populateVoiceList();
