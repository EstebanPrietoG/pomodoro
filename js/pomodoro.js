const dotInterval = document.getElementById("dot-interval");
const timerText = document.getElementById("timer-text");
const timerName = document.getElementById("timer-name");
const progressBar = document.getElementById("progress-bar");

const startPauseButton = document.getElementById("start-pause-button");
const resetButton = document.getElementById("reset-button");
const hardResetButton = document.getElementById("hard-reset-button");

const pomodoroCounter = document.getElementById("pomodoro-counter");
const shortBreakCounter = document.getElementById("short-break-counter");
const longBreakCounter = document.getElementById("long-break-counter");
const breakInterval = document.getElementById("break-interval");

const pomodoroDefaultTime = 25;
const shortBreakDefaultTime = 5;
const longBreakDefaultTime = 15;
const defaultLongInterval = 4;

let pomodoroState = 1;
let longBreakInterval = defaultLongInterval;
let intervalCount = 0;

let startPauseButtonState = false;

const pomodoro = new Timer(pomodoroDefaultTime, timerText);
const shortBreak = new Timer(shortBreakDefaultTime, timerText);
const longBreak = new Timer(longBreakDefaultTime, timerText);

const pomodoroTimers = {
  1: pomodoro,
  3: longBreak,
  2: shortBreak,
};

const pomodoroTimerNames = {
  1: "Pomodoro",
  3: "Long Break",
  2: "Short Break",
};

const createDotInterval = () => {
  while (dotInterval.firstChild) {
    dotInterval.removeChild(dotInterval.firstChild);
  }
  const firstDot = document.createElement("div");
  firstDot.classList.add("is-filled-circle");
  dotInterval.appendChild(firstDot);
  for (let i = 0; i < longBreakInterval - 1; i++) {
    const dot = document.createElement("div");
    dot.classList.add("is-unfilled-circle");
    dotInterval.appendChild(dot);
  }
};

const progressTime = () => {
  let time = pomodoroTimers[pomodoroState].getTime();
  let currentTime = pomodoroTimers[pomodoroState].getCurrentTime();
  return 100 - (currentTime / time) * 100;
};

const adminDotInterval = (counter) => {
  dotInterval.children[counter].classList.add("is-filled-circle");
  dotInterval.children[counter].classList.remove("is-unfilled-circle");
  if (counter == 0) {
    dotInterval.children[longBreakInterval - 1].classList.add(
      "is-unfilled-circle"
    );
    dotInterval.children[longBreakInterval - 1].classList.remove(
      "is-filled-circle"
    );
  } else {
    dotInterval.children[counter - 1].classList.add("is-unfilled-circle");
    dotInterval.children[counter - 1].classList.remove("is-filled-circle");
  }
};

const setResetState = () => {
  pomodoro.reset();
  longBreak.reset();
  shortBreak.reset();
  startPauseButtonState = false;
  startPauseButton.innerHTML = "Start";
  pomodoroState = 1;
  dotInterval.children[intervalCount].classList.add("is-unfilled-circle");
  dotInterval.children[intervalCount].classList.remove("is-filled-circle");
  intervalCount = 0;
  adminDotInterval(intervalCount);
  timerName.innerHTML = pomodoroTimerNames[pomodoroState];
};

const inspectValueInput = (element, min, max) => {
  element.addEventListener("input", () => {
    if (element.value != "") {
      let value = parseInt(element.value);
      value = value < min ? min : value;
      value = value > max ? max : value;
      element.value = value;
    }
  });
};

const setTimeTimers = (element, timer, defaultValue) => {
  element.addEventListener("blur", () => {
    setResetState();
    if (element.value != "") {
      let value = parseInt(element.value);
      timer.setTime(value);
      timer.reset();
    } else {
      element.value = defaultValue;
      timer.setTime(defaultValue);
      timer.reset();
    }
    pomodoro.renderTime();
  });
};

setInterval(() => {
  progressBar.value = progressTime();
  if (timerText.innerHTML == "00:00") {
    let audio = new Audio("sounds/bell.mp3");
    audio.play();
    pomodoroTimers[pomodoroState].reset();
    startPauseButtonState = false;
    startPauseButton.innerHTML = "Start";
    if (pomodoroState == 1) {
      intervalCount++;
      if (intervalCount == longBreakInterval) {
        intervalCount = 0;
        pomodoroState = 3;
      } else {
        pomodoroState = 2;
      }
    } else {
      adminDotInterval(intervalCount);
      pomodoroState = 1;
    }
    timerName.innerHTML = pomodoroTimerNames[pomodoroState];
    pomodoroTimers[pomodoroState].renderTime();
  }
}, 50);

startPauseButton.addEventListener("click", () => {
  startPauseButtonState = !startPauseButtonState;
  startPauseButton.innerHTML = startPauseButtonState ? "Pause" : "Start";
  if (startPauseButtonState) {
    pomodoroTimers[pomodoroState].start();
  } else {
    pomodoroTimers[pomodoroState].pause();
  }
});

resetButton.addEventListener("click", () => {
  pomodoroTimers[pomodoroState].reset();
  startPauseButtonState = false;
  startPauseButton.innerHTML = "Start";
});

hardResetButton.addEventListener("click", () => {
  setResetState();
  pomodoro.renderTime();
});

breakInterval.addEventListener("blur", () => {
  setResetState();
  if (breakInterval.value != "") {
    let value = parseInt(breakInterval.value);
    longBreakInterval = value;
  } else {
    longBreakInterval = defaultLongInterval;
  }
  createDotInterval();
  pomodoro.renderTime();
});

createDotInterval();

pomodoro.renderTime();

inspectValueInput(pomodoroCounter, 1, 99);
inspectValueInput(shortBreakCounter, 1, 99);
inspectValueInput(longBreakCounter, 1, 99);
inspectValueInput(breakInterval, 2, 10);

setTimeTimers(pomodoroCounter, pomodoro, pomodoroDefaultTime);
setTimeTimers(shortBreakCounter, shortBreak, shortBreakDefaultTime);
setTimeTimers(longBreakCounter, longBreak, longBreakDefaultTime);
