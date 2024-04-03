/**
 * Sets the default theme for the webpage.
 */
function setDefaultTheme() {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  if (darkThemeMq.matches) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

// document.addEventListener('DOMContentLoaded', function () {
//   setDefaultTheme()
// })

setDefaultTheme()