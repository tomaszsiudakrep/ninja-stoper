let timerInterval;
let elapsedTime = 0;
let countdownInterval;
let savedTimes = []; // Tablica do przechowywania zapisanych czasów

// Elementy przycisków
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const saveButton = document.getElementById('saveButton');
const resetButton = document.getElementById('resetButton');

// Dodawanie event listenerów do przycisków
startButton.addEventListener('click', startCountdown);
stopButton.addEventListener('click', stopTimer);
saveButton.addEventListener('click', saveTime);
resetButton.addEventListener('click', resetTimer);

function startCountdown() {
    let countdown = 3;
    const countdownElement = document.getElementById('countdown');
    countdownElement.textContent = countdown;
    countdownElement.style.display = 'block';
    playBeep();

    // Wyłączenie przycisku "Start" po jego kliknięciu
    startButton.disabled = true;

    countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none';
            startTimer();
        }
        playBeep();
    }, 1000);
}

function playBeep() {
    const beep = document.getElementById('beepSound');
    beep.play();
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    const startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timerElement.textContent = formatTime(elapsedTime);
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
    clearInterval(countdownInterval);
}

function formatTime(time) {
    const milliseconds = parseInt((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function saveTime() {
    const savedTime = elapsedTime;
    const name = prompt('Podaj nazwę dla tego czasu:');
    
    if (name) {
        savedTimes.push({ name: name, time: savedTime });
        sortAndDisplayTimes();
    }
}

function sortAndDisplayTimes() {
    // Sortowanie czasów od najmniejszego do największego
    savedTimes.sort((a, b) => a.time - b.time);
    
    // Wyświetlanie zapisanych czasów
    const timeListElement = document.getElementById('timeList');
    timeListElement.innerHTML = ''; // Czyści listę przed dodaniem posortowanych czasów

    savedTimes.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.name}: ${formatTime(entry.time)}`;
        timeListElement.appendChild(listItem);
    });
}

function resetTimer() {
    clearInterval(timerInterval);
    clearInterval(countdownInterval);
    elapsedTime = 0;
    document.getElementById('timer').textContent = '00:00:00:00';
    document.getElementById('countdown').style.display = 'none';

    // Odblokowanie przycisku "Start" po zresetowaniu
    startButton.disabled = false;
}

