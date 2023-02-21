class DarkMode {
  constructor(element, darkColorClass, lightColorClass) {
    this.element = element;
    this.darkColorClass = darkColorClass;
    this.lightColorClass = lightColorClass;
  }
  setLight() {
    this.element.classList.remove(this.darkColorClass);
    if (!this.element.classList.contains(this.lightColorClass)) {
      this.element.classList.add(this.lightColorClass);
    }
  }
  setDark() {
    this.element.classList.remove(this.lightColorClass);
    if (!this.element.classList.contains(this.darkColorClass)) {
      this.element.classList.add(this.darkColorClass);
    }
  }
}
