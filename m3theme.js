import {
  argbFromHex,
  hexFromArgb
} from './node_modules/@material/material-color-utilities/utils/string_utils.js'
import {
  themeFromSourceColor
} from './node_modules/@material/material-color-utilities/utils/theme_utils.js'
import ThemeColorsGenerator from './themeColorsGenerator.js'
import fs from 'node:fs'

const args = process.argv.slice(2)
// const param = args[0] && args[0].at(0) !== '#' ? `#${args[0]}` : args[0]
const param = args[0]
const baseColor = param || '#096d8c'

/**
 * Generates Material Design 3 tokens from a single HEX color.
 * @param {string} sourceHex - Color in #RRGGBB format
 * @returns {Object} Object with tokens for light and dark themes
 */
export function generateM3Tokens (sourceHex) {
  const sourceColorArgb = argbFromHex(sourceHex)
  const theme = themeFromSourceColor(sourceColorArgb)

  const extractTokens = (scheme) => {
    const json = scheme.toJSON()
    const tokens = {}

    for (const [key, value] of Object.entries(json)) {
      tokens[key] = hexFromArgb(value)
    }

    return tokens
  }

  return {
    light: extractTokens(theme.schemes.light),
    dark: extractTokens(theme.schemes.dark)
  }
}

const myTokens = generateM3Tokens(baseColor)

function writeFile (fileName, content) {
  fs.writeFile(fileName, content, (err) => {
    if (err) throw err
    console.log(`${fileName} was succesfully saved with UTF-8!`)
  })
}

const generator = new ThemeColorsGenerator({
  lightScheme: 'light',
  darkScheme: 'dark',
  extendedColors: {
    lightSuccess: '#279977',
    darkSuccess: '#16896a',
    lightBase: '#fff',
    darkBase: '#000'
  },
  colors: { schemes: myTokens }
})

const fileName = 'scss/themes/_themes_colors.scss'
writeFile(fileName, generator.generateContent())
