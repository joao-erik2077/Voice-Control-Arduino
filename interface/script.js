const urlAPI = 'http://localhost:3000';

const led = (color) => {
    const url = `${urlAPI}/led/switch/${color}`;

    fetch(url, {mode: 'no-cors', method: 'POST'}).then(response => console.log(response));
};

const onled = (color) => {
  const url = `${urlAPI}/led/on/${color}`;

  fetch(url, {mode: 'no-cors', method: 'POST'}).then(response => console.log(response));
};

const offled = (color) => {
  const url = `${urlAPI}/led/off/${color}`;

  fetch(url, {mode: 'no-cors', method: 'POST'}).then(response => console.log(response));
};

const commands = {
    ACENDER_LED_VERMELHO: color => onled('red'),
    ACENDER_LUZ_VERMELHA: color => onled('red'),
    ACENDER_LED_AMARELO: color => onled('yellow'),
    ACENDER_LUZ_AMARELA: color => onled('yellow'),
    ACENDER_LED_VERDE: color => onled('green'),
    ACENDER_LUZ_VERDE: color => onled('green'),

    APAGAR_LED_VERMELHO: color => offled('red'),
    APAGAR_LUZ_VERMELHA: color => offled('red'),
    APAGAR_LED_AMARELO: color => offled('yellow'),
    APAGAR_LUZ_AMARELA: color => offled('yellow'),
    APAGAR_LED_VERDE: color => offled('green'),
    APAGAR_LUZ_VERDE: color => offled('green'),

    TROCAR_LED_VERMELHO: color => led('red'),
    TROCAR_LUZ_VERMELHA: color => led('red'),
    TROCAR_LED_AMARELO: color => led('yellow'),
    TROCAR_LUZ_AMARELA: color => led('yellow'),
    TROCAR_LED_VERDE: color => led('green'),
    TROCAR_LUZ_VERDE: color => led('green'),

    ACENDER_LUZES: () => {onled('red'); onled('yellow'); onled('green')},
    APAGAR_LUZES: () => {offled('red'); offled('yellow'); offled('green')},
    TROCAR_LUZES: () => {led('red'); led('yellow'); led('green')},
};

const recordingButton = document.getElementById('recordingBtn');
const recordingBtn = recording => recordingButton.classList.replace(`${recording ? 'btn-outline-danger' : 'btn-danger'}`, `${recording ? 'btn-danger' : 'btn-outline-danger'}`);
let recording = false;
const output = document.querySelector('#output');

const recognition = new webkitSpeechRecognition();
recognition.interimResults = true;
recognition.lang = "pt-BR";
recognition.continuous = true;
recognition.onend = () => {
  recording = false;
  recordingBtn(false)
};

const startRecognition = () => {
  recording = true;
  recordingBtn(recording);
    recognition.start();
    // This event happens when you talk in the microphone
    recognition.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          // Here you can get the string of what you told
          const content = event.results[i][0].transcript.trim();
          output.textContent = content;

          command = content.toUpperCase().replaceAll(' ', "_");

          //console.log(commands.hasOwnProperty(content), commands[content], led())
          if (commands.hasOwnProperty(command)) {
            commands[command].call();
          }
        }
      }
      
    };
    
};

const endRecognition = () => recognition.abort();

const switchRecognition = () => recording ? endRecognition() : startRecognition();