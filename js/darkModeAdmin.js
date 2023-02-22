const pageColor = document.getElementById("page-color");

const darkModeSwitch = document.getElementById("dark-mode-switch");
const autoModeSwitch = document.getElementById("auto");

const darkMode = new DarkMode(pageColor, "is-dark", "is-light");

const currentDate = new Date();

// Defines a function that determines the page mode based on the user or default settings
const darkModeAdministrator = () => {
  if (autoModeSwitch.checked) {
    const hour = currentDate.getHours();
    darkModeSwitch.disabled = true;
    if (hour >= 18 || hour < 5) {
      darkMode.setDark();
    } else {
      darkMode.setLight();
    }
  } else {
    darkModeSwitch.disabled = false;
    if (darkModeSwitch.checked) {
      darkMode.setDark();
    } else {
      darkMode.setLight();
    }
  }
};

darkModeSwitch.addEventListener("change", darkModeAdministrator);
autoModeSwitch.addEventListener("change", darkModeAdministrator);
window.addEventListener("load", darkModeAdministrator);
setInterval(darkModeAdministrator, 60000);
