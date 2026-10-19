# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primarily the author (Oleh Obydonov) styling their own projects: SPAs mounted on `#app`/`#root`, admin panels, and web interfaces of devices (e.g. the Heltec theme). The public npm package (`@oleh-ob/cs-styles`) is a by-product, not the main audience; external consumers are served but not designed for first.

## Product Purpose

A CSS framework for semantic HTML: well-formed HTML5 and ARIA markup gets a finished look without classes. Classes appear only where semantics cannot express the intent (utilities, theming, some components). Success: the author writes plain semantic markup in a new project and gets a consistent, themed, accessible UI with no extra styling work.

## Positioning

- **M3 theming:** palettes come from Material Theme Builder JSON (`material-theme*.json` → `m3theme-loader.js` / `m3theme-generator.js`) and surface as `--cs-*` custom properties with light/dark via `data-theme="dark"`.
- **ARIA as API:** states and components are switched by ARIA attributes and roles (`aria-busy`, `aria-pressed`, `role`, …), not by modifier classes.
- **SCSS configuration:** deep customization through `@use ... with (...)` over `!default` settings; ITCSS directories mapped to `@layer tokens, generic, elements, objects, components, utilities` so consumer overrides win without specificity fights.

## Operating Context

Consumed either as the prebuilt `dist/cs-styles.min.css` or as the SCSS entry `scss/cs-styles.scss` inside the consuming project's own pipeline. Built with Dart Sass + PostCSS + lightningcss; browser support follows `browserslist: defaults` (no IE). Demo lives in a separate repo: https://si9urd.github.io/cs-styles-demo/.

## Capabilities and Constraints

- **CSS only, no JS.** Every effect (ripple, toggles, scheme switch, loading states) must work without scripts.
- **Lightweight bundle.** `dist` size is a tracked concern; new features must justify their bytes.
- **Stable public API.** Classes, `--cs-*` properties, `data-theme`, and the element/ARIA hooks change only via a SemVer major with migration notes in `CHANGELOG.md`.
- **WCAG AA.** Text contrast ≥ 4.5:1, UI/stroke ≥ 3:1 (see `THEME-DESIGN.md`), visible focus, respect for `prefers-reduced-motion`.
- Theme palette `_themes_colors.scss` is generated; never hand-edit.
- Undecided: `package.json` publishing fields (`exports`, `files`, `style`, `sideEffects`) — see `tasks.md`.

## Brand Commitments

Name "CS-Styles", package `@oleh-ob/cs-styles`, MIT license. Docs and README are written in Russian.

## Evidence on Hand

README, CHANGELOG, `THEME-DESIGN.md` (role → color tables with contrast targets), `docs/` (conventions, versioning, icons), demo site. No external users, testimonials, or benchmarks exist; do not invent them.

## Product Principles

1. Semantics first: if HTML or ARIA can express it, don't add a class.
2. Zero JavaScript: a feature that needs a script doesn't ship in this library.
3. Every byte earns its place: prefer fewer, more general rules over per-case styles.
4. The public API is a contract: break it only deliberately, versioned and documented.
5. Accessible by default: contrast, focus, and motion preferences are not opt-in.

## Accessibility & Inclusion

WCAG 2.x AA as the floor: contrast targets per `THEME-DESIGN.md`, visible focus indicators, `prefers-reduced-motion` honored, ARIA states styled so assistive-tech semantics and visual state stay in sync.
