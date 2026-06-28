/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss'],
  plugins: [
    'stylelint-scss'
  ],
  customSyntax: 'postcss-scss',
  rules: {
    // Запрещает использование @import в пользу @use и @forward
    'scss/partial-no-import': true,

    // Запрещает использование глобальных функций Sass (например, rgb(), scale-color(), list.nth)
    // и требует использования пространств имен (например, color.rgb(), map.get())
    'scss/no-global-function-names': true,

    // Дополнительные правила для верных имен пространств
    'scss/load-no-partial-leading-underscore': true
  }
}
