class Timer {
  constructor(minutes, element) {
    this.time = minutes * 60;
    this.currentTime = this.time;

    this.element = element;

    this.interval = null;
  }

  format(timeSeconds) {
    const minutes = Math.floor(timeSeconds / 60);
    const seconds = timeSeconds % 60;
    const minutesFormat = minutes.toString().padStart(2, "0");
    const secondsFormat = seconds.toString().padStart(2, "0");

    return `${minutesFormat}:${secondsFormat}`;
  }

  start() {
    this.interval = setInterval(() => {
      this.currentTime--;

      this.element.innerHTML = this.format(this.currentTime);
      if (this.currentTime == 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  pause() {
    clearInterval(this.interval);
  }

  reset() {
    clearInterval(this.interval);
    this.currentTime = this.time;
    this.element.innerHTML = this.format(this.currentTime);
  }

  setTime(minutes) {
    clearInterval(this.interval);
    this.time = minutes * 60;
    this.currentTime = this.time;
    this.element.innerHTML = this.format(this.currentTime);
  }

  getTime() {
    return this.time;
  }

  getCurrentTime() {
    return this.currentTime;
  }

  renderTime() {
    this.element.innerHTML = this.format(this.time);
  }
}
