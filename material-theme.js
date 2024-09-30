/**
 * Generate colors mixin using json file exported from Material Theme Build
 * @see {@link https://material-foundation.github.io/material-theme-builder/}
 * @version 0.0.5
 */

import fs from 'node:fs'
import { EOL } from "node:os"

const args = process.argv.slice(2)
const params = args.reduce((m, v) => {
  const [key, value] = v.split('=')
  m[key] = value
  return m
}, {})

const prefix = params.prefix

const camelCaseToKebabCase = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g,
  ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

function generateScss(themes) {
  const lightTheme = themes.schemes.light
  const darkTheme = themes.schemes.dark
  const result = []

  result.push('@mixin themes-colors() {')
  result.push('\t&:not([data-theme="dark"]) {')
  result.push(...generateVars(lightTheme))
  result.push('\t}')
  result.push('')
  result.push('\t&[data-theme="dark"] {')
  result.push(...generateVars(darkTheme))
  result.push('\t}')
  result.push('}')

  return result.join(EOL)
}

function generateVars(theme) {
  const r = []
  for(const [key, value] of Object.entries(theme)) {
    r.push(`\t\t--${prefix}-${camelCaseToKebabCase(key)}: ${value};`)
  }
  return r
}

function writeFile(fileName, content) {
  fs.writeFile(fileName, content, (err) => {
    if (err) throw err;
    console.log(`${fileName} was succesfully saved with UTF-8!`);
  })
}

fs.readFile('./material-theme.json', 'utf8', (error, data) => {
  if (error) {
    console.error(error);
    return
  }

  writeFile(params.file, generateScss(JSON.parse(data)))
})
