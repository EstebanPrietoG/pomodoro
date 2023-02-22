/**
Class of the dark mode of the webpage.
@constructor
@param {Element} element - The DOM element to which dark mode will be applied.
@param {string} darkColorClass - The CSS class to apply to the element in dark mode.
@param {string} lightColorClass - The CSS class to apply to the element in light mode.
*/
class DarkMode {
  constructor(element, darkColorClass, lightColorClass) {
    this.element = element;
    this.darkColorClass = darkColorClass;
    this.lightColorClass = lightColorClass;
  }
  /**
  Method that sets the element to light mode.
  */
  setLight() {
    this.element.classList.remove(this.darkColorClass);
    if (!this.element.classList.contains(this.lightColorClass)) {
      this.element.classList.add(this.lightColorClass);
    }
  }
  /**
  Method that sets the element to dark mode.
  */
  setDark() {
    this.element.classList.remove(this.lightColorClass);
    if (!this.element.classList.contains(this.darkColorClass)) {
      this.element.classList.add(this.darkColorClass);
    }
  }
}
