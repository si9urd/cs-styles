/*
<head>
...
  <script>
    // Инициализация темы, до загрузки страницы
    document.documentElement.dataset.theme =
    localStorage.getItem('theme') ??
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  </script>
</head>
*/

// тема по умолчанию
function setDefaultTheme () {
  document.documentElement.dataset.theme = localStorage.getItem('theme') ??
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

// переключение темы
function toggleTheme () {
  const newTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = newTheme
  localStorage.setItem('theme', newTheme)
}
