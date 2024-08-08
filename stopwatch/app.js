// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const recordButton= document.getElementById('record');
const lapsList = document.getElementById('lapsList');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
recordButton.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopButton.innerHTML = "Pause";
    } else {
        clearInterval(tInterval);
        running = false;
        startStopButton.innerHTML = "ReStart";
        // recordLap();
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    startStopButton.innerHTML = "Start";
    lapsList.innerHTML = '';
    lapCounter = 1;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" + 
                        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
                        (seconds < 10 ? "0" + seconds : seconds);
}

function recordLap() {
    let lapTime = display.innerHTML;
    let lapItem = document.createElement('li');
    lapItem.innerHTML = `Lap ${lapCounter++}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}
