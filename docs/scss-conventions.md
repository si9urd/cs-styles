# Code style & conventions

Enforced by `stylelint.config.mjs` + `postcss.config.js`; run `npm run lint`
(`lint:sort-scss` → `lint:stylelint --fix`).

## Methodology

A deliberate hybrid, not one canonical method:

- **Semantic-first / classless.** Style elements and ARIA attributes, not classes:
  `:is(button, [type="submit"], [role="button"])`, `[aria-disabled="true"]`.
  A class appears only where semantics can't reach it (`.btn-tonal`, `.h-stack`, utilities).
  No BEM — no `block__element--modifier`; nesting follows the real DOM (`header > .content`).
- **State on attributes.** `[aria-busy]`, `[aria-expanded]`, `[disabled]`, plus
  `[data-hovered]`/`[data-focused]`/`[data-pressed]` for headless UI libs.
  `:is()`/`:not()` groups variants and keeps specificity flat.
- **ITCSS-like layering.** The order in `scss/_index.scss` *is* the specificity hierarchy:
  `variables → themes → copyright → utils → base → components → content → landmarks`.
  `abstracts/` emits nothing (settings/tools only). Tokens flow one way:
  `_tokens.scss` (`!default`) → layers → consumer override in the `with (...)` block.
- **Variants via `%placeholder` + `@extend`** (OOCSS: structure apart from skin), not
  per-variant mixins — one selector list in the output instead of duplicated declarations.
- **Custom properties are the component API.** Unprefixed local knobs
  (`--height`, `--container-color`, `--elevation`) declared once and re-pointed by state;
  prefixed `--cs-*` is the public surface. Theming is `data-theme="dark"` + `color-scheme`.
- **Material Design 3 is the design language.** Color roles (`surface-container`,
  `on-surface-container`, `outline-variant`), elevation 0–5, button types
  (filled / elevated / tonal / outlined / text / FAB / icon). Palettes are *generated*
  from `material-theme*.json` — `_themes_colors.scss` is an artifact, never hand-edited.
- **Utilities are an opt-in thin layer**, not utility-first: Bootstrap's utilities API via
  `make-utilities()`, one file per group, toggled by `$enable-utilities: ("spacing": true, …)`.
- **Feature flags over a monolith:** `$enable-icons`, `$enable-grid`, `$enable-forms`,
  `$enable-landmarks`, `$enable-responsive-utilities`.
- **Vendor stays isolated.** `scss/vendor/bootstrap/` (grid, rfs, utilities API) is trimmed
  third-party code, excluded from the linter.

## SCSS

### Modules

- Use `@use`/`@forward`, never `@import` (`scss/partial-no-import`)
- Namespace Sass built-ins: `@use "sass:map" as map` → `map.get()`, `math.div()`
  (`scss/no-global-function-names`)
- Partials carry a leading underscore on disk, referenced without it and without the
  extension: `@use "../variables" as *`
- Every directory has an `_index.scss` that `@use`s its members
- Layer bodies live in mixins (`@mixin reset-base`, `@mixin accessibility`, `@mixin spacing()`)
  included from `_index.scss`, not loose at file root
- Reusable blocks are `%placeholder`s pulled in with `@extend`

### Formatting

- 2 spaces, no tabs; double quotes (`"cs"`, `[aria-busy="true"]`)
- No leading zero: `.25rem`, `.38`, `.2s`; lowercase hex: `#096d8c`, `#fff`
- Sass maps: one pair per line, closing `)` on its own line
- Declaration order is automatic — `css-declaration-sorter` with `order: smacss`; don't sort by hand
- Custom properties first inside a rule, then regular declarations; blank line between nested rules

### Naming

- Tokens are kebab-case with `!default` in `scss/_tokens.scss`: `$btn-font-size`, `$z-index-modal`
- Runtime API is prefixed via `$prefix`: `var(--#{$prefix}-primary)`; component-local
  properties are unprefixed

### Comments

- `///` file/section docs, `//` inline notes, `////…////` section banners, `// region <name>` markers
- SCSS comments in **English**; JS and config comments in **Russian**, explaining *why* a rule is off
