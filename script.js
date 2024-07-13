let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let reset = false;
let lapCount = 0;

const display = document.querySelector('.display');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapsList = document.getElementById('lapsList');

startStopButton.addEventListener('click', startStop);
lapButton.addEventListener('click', recordLap);
resetButton.addEventListener('click', resetWatch);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        startStopButton.innerHTML = "Stop";
        running = true;
        reset = false;
    } else {
        clearInterval(tInterval);
        startStopButton.innerHTML = "Start";
        running = false;
    }
}

function resetWatch() {
    clearInterval(tInterval);
    reset = true;
    running = false;
    startStopButton.innerHTML = "Start";
    display.innerHTML = "00:00:00.000";
    difference = 0;
    lapCount = 0;
    lapsList.innerHTML = '';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;

    display.innerHTML = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = display.innerHTML;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(li);
    }
}
