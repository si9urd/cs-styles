/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss'],
  plugins: [
    'stylelint-scss'
  ],
  customSyntax: 'postcss-scss',
  // Вендорный слой и генерируемый файл тем живут по своим правилам
  ignoreFiles: [
    'scss/vendor/**/*.scss',
    'scss/themes/_themes_colors.scss'
  ],
  rules: {
    // Запрещает использование @import в пользу @use и @forward
    'scss/partial-no-import': true,

    // Запрещает использование глобальных функций Sass (например, rgb(), scale-color(), list.nth)
    // и требует использования пространств имен (например, color.rgb(), map.get())
    'scss/no-global-function-names': true,

    // Дополнительные правила для верных имен пространств
    'scss/load-no-partial-leading-underscore': true,

    // Префиксы в reset/range/form стоят осознанно: autoprefixer их не восстановит,
    // а --fix ломает семантику (-webkit-appearance: button -> appearance: auto)
    'property-no-vendor-prefix': null,

    // Пустые // внутри закомментированных блоков кода - не ошибка
    'scss/comment-no-empty': null,

    // clip нужен для sr-only: замены пока не дают того же поведения во всех браузерах
    'property-no-deprecated': null
  }
}
