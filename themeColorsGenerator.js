import { EOL } from 'node:os'

const camelCaseToKebabCase = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g,
  ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())

class ThemeColorsGenerator {
  constructor (options) {
    this.options = options
  }

  generateCssVars (themes) {
    const lightTheme = themes.schemes[this.options.lightScheme]
    const darkTheme = themes.schemes[this.options.darkScheme]
    const r = []

    r.push('$theme-colors: map.merge((')

    for (const [key, value] of Object.entries(lightTheme)) {
      r.push(`\t'light-${camelCaseToKebabCase(key)}': ${value},`)
    }
    for (const [key, value] of Object.entries(darkTheme)) {
      r.push(`\t'dark-${camelCaseToKebabCase(key)}': ${value},`)
    }

    // extended colors
    for (const [key, value] of Object.entries(this.options.extendedColors)) {
      r.push(`\t'${camelCaseToKebabCase(key)}': ${value},`)
    }

    r.push('), $theme-colors);')

    return r
  }

  generateContent () {
    const result = []

    result.push('@use "sass:map" as map;')
    result.push('@use "../variables" as *;')
    result.push('')
    result.push(...this.generateCssVars(this.options.colors))
    result.push('')

    result.push('$theme-colors: map.merge($theme-colors, (')
    result.push('\t\'light-icon-color\': map.get($theme-colors, \'light-on-surface\'),')
    result.push('\t\'dark-icon-color\': map.get($theme-colors, \'dark-on-surface\'),')
    result.push('\t\'light-icon-error\': map.get($theme-colors, \'light-error\'),')
    result.push('\t\'dark-icon-error\': map.get($theme-colors, \'dark-error\'),')
    result.push('\t\'light-icon-success\': map.get($theme-colors, \'light-success\'),')
    result.push('\t\'dark-icon-success\': map.get($theme-colors, \'dark-success\')')
    result.push(')) !global;')

    return result.join(EOL)
  }
}

export default ThemeColorsGenerator
