/**
 * The Timer class is used to create a timer with the functionality
 *  to start, pause, reset, and set a custom time in minutes.
 */
/**
 * Creates a new instance of Timer.
 * @param {number} minutes - The initial time for the timer in minutes.
 * @param {object} element - The HTML element where the remaining time for the timer will be displayed.
 */
class Timer {
  constructor(minutes, element) {
    this.time = minutes * 60;
    this.currentTime = this.time;

    this.element = element;

    this.interval = null;
  }

  /**
   * Takes a value in seconds and returns a formatted time string (mm:ss).
   * @param {number} timeSeconds - The value in seconds to be formatted.
   * @returns {string} The time string formatted as mm:ss.
   */
  format(timeSeconds) {
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = timeSeconds % 60;
    const minutesFormat = minutes.toString().padStart(2, "0");
    const secondsFormat = seconds.toString().padStart(2, "0");

    return `${minutesFormat}:${secondsFormat}`;
  }

  /**
   * Starts the timer by decrementing the currentTime value by one second every 1000 milliseconds.
   * Updates the HTML element with the remaining time using the format() method.
   * If the currentTime value reaches zero, stops the interval using clearInterval().
   */
  start() {
    this.interval = setInterval(() => {
      this.currentTime--;

      this.element.innerHTML = this.format(this.currentTime);
      if (this.currentTime == 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  /**
   * Pauses the timer by stopping the interval using clearInterval().
   */
  pause() {
    clearInterval(this.interval);
  }

  /**
   * Stops the timer by stopping the interval using clearInterval(),
   * sets the currentTime value equal to the time value,
   * and updates the HTML element using the format() method.
   */
  reset() {
    clearInterval(this.interval);
    this.currentTime = this.time;
    this.element.innerHTML = this.format(this.currentTime);
  }

  /**
   * Stops the timer by stopping the interval using clearInterval(), sets
   * the time value to the provided value in minutes, sets the currentTime value equal
   * to the time value, and updates the HTML element using the format() method.
   * @param {number} minutes - The time in minutes to be set.
   */
  setTime(minutes) {
    clearInterval(this.interval);
    this.time = minutes * 60;
    this.currentTime = this.time;
    this.element.innerHTML = this.format(this.currentTime);
  }

  /**
   * Returns the initial time in seconds (time).
   * @returns {number} The initial time in seconds.
   */
  getTime() {
    return this.time;
  }

  /**
   * Returns the current time in seconds (currentTime).
   * @returns {number} The current time in seconds.
   */
  getCurrentTime() {
    return this.currentTime;
  }

  /**
   * Updates the HTML element with the initial time using the format() method.
   */
  renderTime() {
    this.element.innerHTML = this.format(this.time);
  }
}
