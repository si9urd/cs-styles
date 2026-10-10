# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

CS-Styles (`@oleh-ob/cs-styles`) is a CSS framework for semantic HTML: it targets HTML5 elements and ARIA attributes directly, using classes only where semantics can't cover it (utilities, theming, some components). Written in SCSS, built with Dart Sass + PostCSS + lightningcss.

## Architecture

Entry point is `scss/cs-styles.scss`. The structure is ITCSS: each directory under `scss/` is one layer, with an `_index.scss` that `@use`s its members. `scss/_index.scss` loads every CSS-emitting directory into its cascade layer via `meta.load-css` (order declared in `_layers.scss`: `tokens, generic, elements, objects, components, utilities`):

- `settings/` — config flags and design tokens (all `!default`), plus the generated palette `_themes_colors.scss` (`$theme-palette`, don't hand-edit) merged into `$theme-colors`; no CSS output
- `tools/` — functions, mixins, helpers, elevation/icon mixins; no CSS output
- `tokens/` — `--cs-*` custom properties on `:root`: base tokens, theme colors, elevation, icons
- `generic/` — reset, app-root isolation
- `elements/` — bare HTML elements and ARIA attributes: document, typography, aria, table, hr
- `objects/` — undecorated layout: grid, stack, layout
- `components/` — buttons, forms, inputs, menus, card, header, logo, scheme toggle, etc.
- `utilities/` — utility classes, one file per group (no `!important`: the last layer wins)
- `vendor/bootstrap/` — trimmed Bootstrap grid/rfs/utilities-API, kept isolated; `vendor/_index.scss` only forwards its API

Don't wrap partials in `@layer` themselves: `@extend` from inside a layer leaks the selector out of it. For the same reason keep `%placeholder`s in the layer of their users, not in `tools/`. A new partial goes into the directory of its layer and its `_index.scss`; the partial emits its own CSS, the `_index.scss` only `@use`s it.

Verify refactors with `npm run build && npm run check:diff` (diff of `dist/cs-styles.css` against `.baseline/cs-styles.css`, gitignored; refresh the baseline after intended output changes).

Design tokens flow one way: `settings/_index.scss` (all `!default`) → consumed by the other directories → overridable by consumers via the `with (...)` config block at `@use` time in `cs-styles.scss`. When adding a new visual value, add a token in `settings/` rather than hardcoding it in a component partial.

Theming: `--cs-*` CSS custom properties are the public runtime API for colors/tokens; `data-theme="dark"` is the public switch mechanism. Theme color palettes are generated from Material Design 3 theme JSON files (`material-theme*.json`) via `m3theme-loader.js` (`npm run theme`) and `m3theme-generator.js` (`npm run generate-theme`) — regenerate through those scripts, don't hand-edit `_themes_colors.scss`.

## Conventions (enforced by stylelint.config.mjs)

Reference `docs\scss-conventions.md` for detailed conventions.
