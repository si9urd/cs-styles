/** Только для lint:sort-scss — dist/ обрабатывает lightningcss. */
export default {
  syntax: 'postcss-scss',
  plugins: { 'css-declaration-sorter': { order: 'smacss' } }
}
