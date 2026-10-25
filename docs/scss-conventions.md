# Code style & conventions

Enforced by `stylelint.config.mjs` + `postcss.config.js`; run `npm run lint`
(`lint:sort-scss` → `lint:stylelint --fix`).

## Methodology

A deliberate hybrid, not one canonical method:

- **Semantic-first / classless.** Style elements and ARIA attributes, not classes:
  `:is(button, [type="submit"], [role="button"])`, `[aria-disabled="true"]`.
  A class appears only where semantics can't reach it (`.h-stack`, utilities); variants without an ARIA equivalent go on a `data-*` attribute (`data-btn="outlined"`).
  No BEM — no `block__element--modifier`; nesting follows the real DOM (`header > .content`).
- **State on attributes.** `[aria-busy]`, `[aria-expanded]`, `[disabled]`, plus
  `[aria-pressed="true"]` (toggle buttons), and `[data-hovered]`/`[data-focused]` for headless UI libs
  (no ARIA equivalent).
  `:is()`/`:not()` groups variants and keeps specificity flat.
- **ITCSS + cascade layers.** One directory per layer; `scss/_index.scss` loads each into
  its `@layer` via `meta.load-css`, order declared in `_layers.scss`:
  `tokens → generic → elements → objects → components → utilities`.
  `settings/` and `tools/` emit nothing. Layer order beats specificity, so a later layer
  never needs `!important` to win; consumer CSS outside layers beats the whole framework.
  Tokens flow one way: `settings/` (`!default`) → layers → consumer override in the `with (...)` block.
- **Variants via `%placeholder` + `@extend`** (OOCSS: structure apart from skin), not
  per-variant mixins — one selector list in the output instead of duplicated declarations.
- **Custom properties are the component API.** Unprefixed local knobs
  (`--height`, `--container-color`, `--elevation`) declared once and re-pointed by state;
  prefixed `--cs-*` is the public surface. Theming is `data-theme="dark"` + `color-scheme`.
- **Material Design 3 is the design language.** Color roles (`surface-container`,
  `on-surface-container`, `outline-variant`), elevation 0–4, button types
  (filled / outlined / text / FAB / icon). Palettes are *generated*
  from `material-theme*.json` — `_themes_colors.scss` is an artifact, never hand-edited.
- **State layers are tokens.** Hover/press/selected/disabled shares live in `settings/`
  (`$state-*`), used in place by the components; they mix them with `color-mix`, never a
  literal percentage.
- **Motion vs. color transitions.** Movement (ripple, progress fill and sweep, spinners) runs
  only under `prefers-reduced-motion: no-preference`. Color, border and shadow transitions
  stay unwrapped: they are not motion (WCAG 2.3.3) and feedback shouldn't snap.
- **Utilities are an opt-in thin layer**, not utility-first: Bootstrap's utilities API via
  `make-utilities()`, one file per group, toggled by `$enable-utilities: ("spacing": true, …)`.
  No `!important` (`$enable-important-utilities: false`): the utilities layer is last.
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
- A partial emits its own CSS (usually a mixin `@include`d at the bottom, behind its `$enable-*`
  flag); the directory's `_index.scss` only `@use`s partials. Exception: `utilities/_index.scss`
  checks the `$enable-utilities` groups
- New partial → the directory of its layer + that directory's `_index.scss`; never wrap a
  partial in `@layer` yourself
- Reusable blocks are `%placeholder`s pulled in with `@extend`. Keep the placeholder in the same
  file or the same layer as its users, not in `tools/`: a placeholder rule is emitted where its
  module is first loaded, so `@extend` across layers would put selectors in the wrong layer
- `!important` only to beat the browser or a rule of the same layer (disabled states, autofill,
  `[hidden]`), never to beat another layer

### Formatting

- 2 spaces, no tabs; double quotes (`"cs"`, `[aria-busy="true"]`)
- No leading zero: `.25rem`, `.38`, `.2s`; lowercase hex: `#096d8c`, `#fff`
- Sass maps: one pair per line, closing `)` on its own line
- Declaration order is automatic — `css-declaration-sorter` with `order: smacss`; don't sort by hand
- Custom properties first inside a rule, then regular declarations; blank line between nested rules

### Naming

- Tokens are kebab-case with `!default` in `scss/settings/_index.scss`: `$btn-font-size`, `$z-index-sticky`
- Runtime API is prefixed via `$prefix`: `var(--#{$prefix}-primary)`; component-local
  properties are unprefixed

### Comments

- `///` file/section docs, `//` inline notes, `////…////` section banners, `// region <name>` markers
- SCSS comments in **English**; JS and config comments in **Russian**, explaining *why* a rule is off
