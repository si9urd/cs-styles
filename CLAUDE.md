# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

CS-Styles (`@oleh-ob/cs-styles`) is a CSS framework for semantic HTML: it targets HTML5 elements and ARIA attributes directly, using classes only where semantics can't cover it (utilities, theming, some components). Written in SCSS, built with Dart Sass + PostCSS + lightningcss.

Goal: make markup and library usage as simple as possible. Plain semantic HTML should look right with no classes or config; every class, `data-*` attribute, `$enable-*` flag, setting or custom property the consumer has to know is a cost. Prefer fewer knobs, one way to do a thing, and less SCSS for the same output.

The compiled and minified output (`dist/cs-styles.css`, `dist/cs-styles.min.css`) must be as small as possible without losing functionality: no dead or duplicated rules, no declarations the browser or an earlier layer already provides, no selector lists multiplied by `@extend` or long `:is()` repeats when a shorter form gives the same result. Check the size of `dist/` after output-affecting changes.

## Architecture

Entry point is `scss/cs-styles.scss`. The structure is ITCSS: each directory under `scss/` is one layer, with an `_index.scss` that `@use`s its members. `scss/_index.scss` loads every CSS-emitting directory into its cascade layer via `meta.load-css` (order declared in `_layers.scss`: `tokens, generic, elements, objects, components, utilities`):

- `settings/` — config flags and design tokens (all `!default`), plus the generated palette `_themes_colors.scss` (`$theme-palette`, don't hand-edit) merged into `$theme-colors`; no CSS output
- `tools/` — functions, mixins, elevation/icon mixins; no CSS output
- `tokens/` — `--cs-*` custom properties on `:root`: base tokens, theme colors, elevation, icons
- `generic/` — reset, app-root isolation
- `elements/` — bare HTML elements and ARIA attributes: document, typography, aria, table, hr
- `objects/` — undecorated layout: grid, stack, layout
- `components/` — buttons, forms, inputs, menus, card, header, logo, scheme toggle, etc.
- `utilities/` — utility classes, one file per group (no `!important`: the last layer wins)
- `vendor/bootstrap/` — trimmed Bootstrap grid/rfs/utilities-API, kept isolated; `vendor/_index.scss` only forwards its API

Don't wrap partials in `@layer` themselves: `@extend` from inside a layer leaks the selector out of it. For the same reason keep `%placeholder`s in the layer of their users, not in `tools/`. A new partial goes into the directory of its layer and its `_index.scss`; the partial emits its own CSS, the `_index.scss` only `@use`s it.

Verify refactors with `npm run build && npm run check:diff` (diff of `dist/cs-styles.css` against `.baseline/cs-styles.css`, gitignored; refresh the baseline after intended output changes).

Design tokens flow one way: `settings/_index.scss` (all `!default`) → consumed by the other directories → overridable by consumers via the `with (...)` config block at `@use` time in `cs-styles.scss`. A new visual value shared across modules (or a core design value) goes into `settings/` as a token rather than being hardcoded. A value used by a single module stays local to that module: don't create a new variable in `settings/` or a `--cs-*` property on `:root` in `tokens/_base.scss` for it. `_base.scss` holds only shared or core values.

Classless first: style through elements, ARIA roles/attributes and structural selectors. Add a class only when there is no other alternative (utilities, theming, a component no element or role can express). Before introducing a class, check whether an element, `role`, `aria-*` or context selector already covers it.

State goes on ARIA attributes, not `data-*`: prefer an `aria-*` whenever the role supports it (`[aria-pressed="true"]` for toggle buttons, `aria-checked`/`aria-selected` for menu items). `data-*` only where ARIA has no equivalent: `data-hovered`/`data-focused` for headless UI libs, `data-theme`, `data-theme-toggle`, `data-btn` (button variants).

Theming: `--cs-*` CSS custom properties are the public runtime API for colors/tokens; `data-theme="dark"` is the public switch mechanism. Theme color palettes are generated from Material Design 3 theme JSON files (`material-theme*.json`) via `m3theme-loader.js` (`npm run theme`) and `m3theme-generator.js` (`npm run generate-theme`) — regenerate through those scripts, don't hand-edit `_themes_colors.scss`.
Only palette roles listed in `$roles` (`tokens/_colors.scss`) are emitted: using a new role in a component means adding it there. Built-in icons (`settings/_icons.scss`) hold only the ones the library uses; the rest live in the opt-in `settings/_icons-extra.scss`.

## Conventions (enforced by stylelint.config.mjs)

Reference `docs\scss-conventions.md` for detailed conventions.
