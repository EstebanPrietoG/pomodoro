// Get DOM elements
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

// Set default timer values
const pomodoroDefaultTime = 25;
const shortBreakDefaultTime = 5;
const longBreakDefaultTime = 15;
const defaultLongInterval = 4;

// Set initial state variables
let pomodoroState = 1;
let longBreakInterval = defaultLongInterval;
let intervalCount = 0;

let startPauseButtonState = false;

// Create Timer objects
const pomodoro = new Timer(pomodoroDefaultTime, timerText);
const shortBreak = new Timer(shortBreakDefaultTime, timerText);
const longBreak = new Timer(longBreakDefaultTime, timerText);

// Set up object and tittle mappings
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

/**
 * Function to create the dot interval indicator
 */
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

/**
 *Function to calculate progress bar value
 * @returns {number} progress bar value
 */
const progressTime = () => {
  let time = pomodoroTimers[pomodoroState].getTime();
  let currentTime = pomodoroTimers[pomodoroState].getCurrentTime();
  return 100 - (currentTime / time) * 100;
};

/**
 *Function to update dot interval indicator
 * @param {number} counter value
 */
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

/**
 *Function to reset the state of the app
 */
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

/**
 * Inspect the value of an input element and restrict it to a range.
 *
 * @param {HTMLInputElement} element - The input element to inspect.
 * @param {number} min - The minimum value allowed for the input element.
 * @param {number} max - The maximum value allowed for the input element.
 */
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

/**
 * Set the time for a timer and update the UI when the element loses focus.
 *
 * @param {HTMLInputElement} element - The input element that contains the time value.
 * @param {Timer} timer - The timer object to set the time for.
 * @param {number} defaultValue - The default time value to use if the input element is empty.
 */
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

// Update the progress bar and play a sound when the timer reaches 00:00.
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
}, 500);

// Start or pause the timer when the start/pause button is clicked.
startPauseButton.addEventListener("click", () => {
  startPauseButtonState = !startPauseButtonState;
  startPauseButton.innerHTML = startPauseButtonState ? "Pause" : "Start";
  if (startPauseButtonState) {
    pomodoroTimers[pomodoroState].start();
  } else {
    pomodoroTimers[pomodoroState].pause();
  }
});

// Reset the timer and UI when the reset button is clicked.
resetButton.addEventListener("click", () => {
  pomodoroTimers[pomodoroState].reset();
  startPauseButtonState = false;
  startPauseButton.innerHTML = "Start";
});

// Reset the timer and UI to their default state when the hard reset button is clicked.
hardResetButton.addEventListener("click", () => {
  setResetState();
  pomodoro.renderTime();
});

// Update the long break interval and UI when the break interval input element loses focus.
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
