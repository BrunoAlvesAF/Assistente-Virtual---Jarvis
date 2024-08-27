const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12){
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour <17){
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () =>{
    speak("Initializing JARVIS...");

    wishMe();
});


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Ouvindo...";
    recognition.start();
})

function takeCommand(message){
    if (message.includes('Hey') || message.includes('Olá')){
        speak("Olá senhor(a), o que eu posso ajudar?");
    } else if (message.includes("Open google")) {
        window.open("https://google.com", "_blank");
        speak("Abrindo o Google...");
    } else if(message.includes("Open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Abrindo o  Youtube...");
    } else if(message.includes("open facebook")) {
        window.open("https://www.facebook.com/?locale=pt_BR", "_blank");
        speak("Abrindo o Facebook...");
    } else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open (`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Isso que eu encontrei no Google" + message;
        speak(finalText); 
    } else if (message.includes('Wikipedia')){
        window.open(`https://wikipedia.org/wiki/${message.replace(" ", + message)}`, "_blank");
        const finalText = "Isso é o que encontrei na wikipedia" + message;
        speak(finalText);
    }else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "Hora atual é" + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "A data de hoje é" + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Abrindo Calculator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "Encontrei algumas informações para" + message + "no Google";
        speak(finalText);
    }
    
}

