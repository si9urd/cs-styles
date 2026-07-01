/**
 * Generate colors mixin using json file exported from Material Theme Build
 * @see {@link https://material-foundation.github.io/material-theme-builder/}
 * @version 0.1.0
 */

import fs from 'node:fs'
import ThemeColorsGenerator from './themeColorsGenerator.js'
const args = process.argv.slice(2)
const params = args.reduce((m, v) => {
  const [key, value] = v.split('=')
  m[key] = value
  return m
}, {})

let lightScheme = 'light'
let darkScheme = 'dark'

if (params.contrast) { // undefined | 'high' | 'medium'
  lightScheme = `light-${params.contrast}-contrast`
  darkScheme = `dark-${params.contrast}-contrast`
}

const extendedColors = {
  lightSuccess: '#279977',
  darkSuccess: '#16896a',
  lightBase: '#fff',
  darkBase: '#000'
}

function writeFile (fileName, content) {
  fs.writeFile(fileName, content, (err) => {
    if (err) throw err
    console.log(`${fileName} was succesfully saved with UTF-8!`)
  })
}

fs.readFile(params.src, 'utf8', (error, data) => {
  if (error) {
    console.error(error)
    return
  }
  const generator = new ThemeColorsGenerator({
    lightScheme,
    darkScheme,
    extendedColors,
    colors: JSON.parse(data)
  })
  writeFile(params.scss, generator.generateContent())
})
