import App from "./app.js";

//text color stuff
function hexToRgb(hex) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');
  // Parse the r, g, b values
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r, g, b];
}

function linearize(colorComponent) {
  // Normalize the RGB value to the range [0, 1]
  let normComponent = colorComponent / 255;
  // Linearize the component
  return (normComponent <= 0.04045) ? 
    normComponent / 12.92 : 
    Math.pow((normComponent + 0.055) / 1.055, 2.4);
}

function calculateLuminance(r, g, b) {
  // Linearize each component
  let rLin = linearize(r);
  let gLin = linearize(g);
  let bLin = linearize(b);
  // Calculate the luminance
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

function getContrastColor(hexColor) {
  let [r, g, b] = hexToRgb(hexColor);
  let luminance = calculateLuminance(r, g, b);
  return luminance > 0.45 ? '#000000' : '#FFFFFF'; // Use black for light backgrounds and white for dark backgrounds
}

/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }
  if (systemSettingDark.matches) {
    return "dark";
  }
  return "light";
}

function updateButton({ buttonEl, isDark }) {
  // Get the sun and moon icons
  const sunIcon = '<img src="icons/sun.svg" alt="Sun">';
  const moonIcon = '<img src="icons/moon.svg" alt="Moon">';
  // Determine which icon to display based on the current theme
  const iconHtml = isDark ? sunIcon : moonIcon;
  // Set the button's HTML content to the appropriate icon
  buttonEl.innerHTML = iconHtml;
  // Update the aria-label to indicate the theme change
  const newAriaLabel = isDark ? "Change to light theme" : "Change to dark theme";
  buttonEl.setAttribute("aria-label", newAriaLabel);
}
/**
* Utility function to update the theme setting on the html tag
*/
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}
/**
* On page load:
*/

/**
* 1. Grab what we need from the DOM and system settings on page load
*/
const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

/**
* 2. Work out the current site settings
*/
let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

/**
* 3. Update the theme setting and button text accoridng to current settings
*/
updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

/**
* 4. Add an event listener to toggle the theme
*/
button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
}); 

const main = () => {
  let app = new App();

  document.addEventListener("DOMContentLoaded", () => {
    app.insertNotes();
    // Get the form element
    const form = document.getElementById("addCard");

    // Add event listener for form submission
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission from refreshing the page

      // Get values from form inputs
      const title = document.getElementById("cardTitle").value;
      const colorPicker = document.getElementById("cardColorPicker");
      const color = colorPicker.value; //gets the selected color from input
      
      //textColor calculation
      let [r, g, b] = hexToRgb(color);
      let luminance = calculateLuminance(r, g, b);
      let textColor = getContrastColor(color);

      // Add new card to the "todo" column
      app.addCard("todo", title, color, textColor);

      // Clear form inputs
      document.getElementById("cardTitle").value = "";
      colorPicker.value = "#000000";
    });
  });
  window.addEventListener("beforeunload", (event) => {
    localStorage.removeItem('notes');
    app.storeNotes();
  });
};
main();
    /* You can add cards to the board here so you don't have to type them all in every time the page refreshes. Here are a few examples: */
    // app.addCard("doing", "Write Card class", "lightblue", "white");
    // app.addCard("todo", "Write App class", "khaki", "Black");
    // let card = app.addCard("todo", "Test everything!", "pink", "black");
    // card.setDescription("Hopefully we've been testing throughout the process...");