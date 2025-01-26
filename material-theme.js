/**
 * Generate colors mixin using json file exported from Material Theme Build
 * @see {@link https://material-foundation.github.io/material-theme-builder/}
 * @version 0.1.0
 */

import fs from 'node:fs'
import { EOL } from "node:os"

const args = process.argv.slice(2)
const params = args.reduce((m, v) => {
  const [key, value] = v.split('=')
  m[key] = value
  return m
}, {})

let lightScheme = 'light'
let darkScheme = 'dark'

if(params.contrast) { // undefined | 'high' | 'medium'
  lightScheme = `light-${params.contrast}-contrast`
  darkScheme = `dark-${params.contrast}-contrast`
}

const camelCaseToKebabCase = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g,
  ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

function generateCssVars(themes) {
  const lightTheme = themes.schemes[lightScheme]
  const darkTheme = themes.schemes[darkScheme]
  const r = []

  r.push('$theme-colors: map-merge((')

  for(const [key, value] of Object.entries(lightTheme)) {
    r.push(`\t'light-${camelCaseToKebabCase(key)}': ${value},`)
  }
  for(const [key, value] of Object.entries(darkTheme)) {
    r.push(`\t'dark-${camelCaseToKebabCase(key)}': ${value},`)
  }

  r.push('), $theme-colors);')

  return r
}

function generateMixin(themes) {
  const lightTheme = themes.schemes[lightScheme]
  const darkTheme = themes.schemes[darkScheme]
  const result = []

  result.push('@use "../variables" as *;')
  result.push('')
  result.push(...generateCssVars(themes))
  result.push('')
  result.push('@mixin themes-colors() {')
  result.push('\t&:not([data-theme="dark"]) {')
  result.push(...generateMixinVars(lightTheme, 'light'))
  result.push('\t}')
  result.push('')
  result.push('\t&[data-theme="dark"] {')
  result.push(...generateMixinVars(darkTheme, 'dark'))
  result.push('\t}')
  result.push('}')

  return result.join(EOL)
}

function generateMixinVars(theme, themeName) {
  const r = []
  for(const [key, value] of Object.entries(theme)) {
    const strKey = camelCaseToKebabCase(key)
    r.push(`\t\t--#{$prefix}-${strKey}: #{map-get($theme-colors, ${themeName}-${strKey})};`)
  }
  return r
}

function writeFile(fileName, content) {
  fs.writeFile(fileName, content, (err) => {
    if (err) throw err;
    console.log(`${fileName} was succesfully saved with UTF-8!`);
  })
}

fs.readFile(params.src, 'utf8', (error, data) => {
  if (error) {
    console.error(error);
    return
  }

  writeFile(params.scss, generateMixin(JSON.parse(data)))
})
