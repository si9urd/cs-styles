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

function setDefaultTheme () {
  document.documentElement.dataset.theme = localStorage.getItem('theme') ??
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}
