---
name: CS-Styles
description: CSS framework where semantic HTML and ARIA state are the design API.
colors:
  primary: "#0C7A5F"
  on-primary: "#FFFFFF"
  on-surface: "#223832"
  on-surface-variant: "#5B756F"
  outline: "#7D9992"
  outline-variant: "#E4F0ED"
  surface-container: "#F5FAF9"
  surface: "#FFFFFF"
  error: "#BA1A1A"
  success: "#279977"
  dark-primary: "#70E0C4"
  dark-on-surface: "#FFFFFF"
  dark-on-surface-variant: "#CED9D6"
  dark-outline: "#95A6A2"
  dark-outline-variant: "#36403D"
  dark-surface-container: "#1F2624"
  dark-surface: "#121A18"
typography:
  display:
    fontFamily: "system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.15
  headline:
    fontFamily: "system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.15
  title:
    fontFamily: "system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.15
  body:
    fontFamily: "system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.5
  label-small:
    fontFamily: "system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
  mono:
    fontFamily: "ui-monospace, monospace"
rounded:
  base: "0.5rem"
  fab: "1rem"
  pill: "999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "1rem"
  "4": "1.5rem"
  "5": "3rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.base}"
    padding: "0 1.5rem"
    height: "2.5rem"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.base}"
    padding: "0 1.5rem"
    height: "2.5rem"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.base}"
    padding: "0 0.75rem"
    height: "2.5rem"
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.base}"
    size: "2.5rem"
  button-pill:
    rounded: "{rounded.pill}"
  button-fab:
    rounded: "{rounded.fab}"
    size: "3.5rem"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.base}"
    padding: "0 1rem"
    height: "3rem"
  input-search:
    rounded: "{rounded.pill}"
  menu:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-small}"
    rounded: "{rounded.base}"
    width: "12rem"
  menu-item:
    height: "3rem"
    padding: "0 0.75rem"
---

# Design System: CS-Styles

## Overview

**Creative North Star: "Markup Made Visible"**

An element looks like what it is and the state it is in. A `<button>` is a filled primary button with no class; `aria-invalid="true"` turns a field's stroke red and adds an icon; `aria-busy="true"` turns a control into a spinner; `aria-disabled` and `:disabled` fade it to the shared 38% disabled ink. The visual system is the rendering of HTML semantics and ARIA state, and it should never show a state the accessibility tree doesn't have.

The mood is calm, precise, utilitarian. Surfaces are white or near-white, tinted toward the single brand hue. Ink is that same hue at low saturation, and one saturated accent marks what can be acted on. Expression goes into state feedback: a state layer mixed into the container, a centered CSS ripple on press, a 2px primary focus ring, a shadow that appears on hover. Density is app-like: 2.5rem buttons, 3rem fields and menu rows, a 1rem spacing unit.

The palette is a role scheme, not a color. Presets (`mint`, `indigo`, `violet`, `navy`, `teal` in `settings/_palettes.scss`) and M3 Theme Builder JSON all fill the same roles. The hex values in this file are the current default build (`mint`, hue 165) and serve as examples of each role.

**Key Characteristics:**
- Semantics and ARIA select the styles; classes only for variants semantics can't express (`.btn-outlined`, `.btn-text`, `.btn-pill`, `.btn-fab`, `.btn-icon`, `.menu`, `.card`).
- One hue per theme: neutrals, ink, and strokes are all tinted with the brand hue.
- Flat at rest; shadow is a response to state or marks a floating layer.
- State is shown by mixing color (`color-mix` state layer), not by swapping to new colors.
- Runtime theming through `--cs-*` and `data-theme="dark"`; no JavaScript anywhere.

## Colors

One brand hue carries the whole scheme. Each preset keeps the hue constant and steps saturation and brightness per role (HSB recipe in `THEME-DESIGN.md`).

### Primary
- **Brand Accent** (`primary`; dark `dark-primary`): filled buttons, outlined/text button ink, focus rings, the focused input stroke, checked controls, links. The only saturated color on the screen. Text on it uses `on-primary`.

### Neutral
- **Ink Strong** (`on-surface`): body text, headings, menu text, icon color. Brand hue at HSB saturation 40 / brightness 22 in light; pure white in dark.
- **Ink Weak** (`on-surface-variant`): placeholders, icon buttons, unchecked radio/checkbox strokes, menu icons, secondary copy.
- **Stroke Strong** (`outline`): input borders, meaningful dividers (the header nav separator at 70% opacity), borders that have to meet 3:1.
- **Stroke Weak** (`outline-variant`): decorative hairlines. Exempt from the 3:1 target, so never the only signal of a state.
- **Tinted Fill** (`surface-container`): default button container, menus, disabled fields. Brand hue at 2% saturation.
- **Paper** (`surface` / `background`): page and header background, input fill (`surface-container-lowest`).

### Status
- **Error** (`error`): `aria-invalid="true"` stroke, focus ring, and icon.
- **Success** (`success`): `aria-invalid="false"` stroke, focus ring, and icon.

Secondary and tertiary M3 roles come from the generated palette and appear only in a few places (`secondary-container` for progress and range tracks, `tertiary` for the file-selector button). They are not a second accent in the system.

### Named Rules
**The One Hue Rule.** A theme is one hue. Every neutral, ink, and stroke is that hue at a fixed saturation/brightness step; a new preset changes the hue and keeps the steps.

**The Roles-Only Rule.** Components reference `--cs-*` roles only. A hex literal in a component partial is a bug; a new visual value becomes a token in `settings/` first.

**The Contrast Floor Rule.** Ink roles hold ≥ 4.5:1 against Fill, `on-primary` holds ≥ 4.5:1 against Brand in rest, hover, and press, Brand and Stroke Strong hold ≥ 3:1. Stroke Weak is decorative and never carries a state alone.

## Typography

**Body Font:** system-ui (with sans-serif)
**Mono Font:** ui-monospace (with monospace), for `code`, `kbd`, `samp`, `pre`

**Character:** The platform's own UI face, so the framework feels native to whichever OS renders it and costs zero bytes. Hierarchy comes from size and weight, never from a second family.

### Hierarchy
- **Display** (700, 2.5rem, 1.15): `h1` only; bottom margin clamps 1–1.5rem with viewport.
- **Headline** (500, 2rem / 1.75rem / 1.5rem, 1.15): `h2`–`h4`.
- **Title** (500, 1.25rem / 1rem, 1.15): `h5`, `h6`. All headings use `text-wrap: balance`.
- **Body** (400, 1rem, 1.5): paragraphs, lists, captions, quotes with `text-wrap: pretty` and `overflow-wrap: break-word`.
- **Label** (500, 1rem): button text.
- **Label Small** (500, 0.875rem): menu items.

### Named Rules
**The Medium Weight Rule.** Interactive text and headings sit at 500; 700 is reserved for `h1` and `b`/`strong` (which use `bolder`, relative to the parent).

**The Multiplier Rule.** Heading sizes are `--fs` × `--cs-font-size-base`. Change the base, not individual sizes.

## Layout

A 1rem spacing unit (`--cs-spacing`) drives everything; the spacer scale is 0.25 / 0.5 / 1 / 1.5 / 3rem. Component paddings derive from it: buttons 1.5rem inline (1rem with a leading icon, 0.75rem for text buttons), fields 1rem, header gaps 2rem.

The grid is a trimmed Bootstrap grid with breakpoints sm 576px, md 768px, lg 992px, xl 1100px (default build; 1200px in settings), xxl 1400px, and containers 540–1320px. The header is a flex row, `space-between`, with an optional `.sticky` mode. Layout objects (`stack`, `layout`, `grid`) are undecorated.

Touch: controls stay at 2.5–3rem; the `touch-target` mixin expands the hit area to 3rem on coarse pointers.

## Elevation & Depth

Flat by default. Depth comes from tinted fills against white paper; shadows are a response to state or mark a layer that floats above the page. The shadow scale is Material-web's two-part shadow (key + ambient) on levels 0–5, exposed as `--cs-elevation-0` … `--cs-elevation-5`, black-based in light and white-based in dark.

### Shadow Vocabulary
- **Rest** (`--cs-elevation-0`): every button, field, and card at rest.
- **Hover lift** (`--cs-elevation-1`): filled and outlined buttons on hover; drops back to 0 on press.
- **Floating layer** (`--cs-elevation-2`): menus.
- **FAB** (`--cs-elevation-3` focus/press, `--cs-elevation-4` hover).

### Named Rules
**The Flat-By-Default Rule.** Nothing in the document flow carries a shadow at rest. A shadow means "you're touching this" or "this is above the page".

## Shapes

One gentle radius (0.5rem, `--cs-border-radius`) for buttons, fields, menus, and cards. Two exceptions: pills (999px) for `.btn-pill` and `input[type="search"]`, and 1rem for the FAB. Borders are 1px; radio and checkbox strokes are 2px. Strokes and fills share the brand hue, so edges read softly.

## Components

### Buttons
Calm, confident, state-rich. Any `button`, `[type=submit|reset|button]`, or `[role=button]` is a button with no class.
- **Shape:** gentle radius (0.5rem), 2.5rem tall, 1px border matching the container.
- **Primary (default):** Brand Accent container, `on-primary` text, label typography.
- **Hover / Focus / Press:** a state layer mixed into the container (14% hover and focus, 20% press). Filled buttons mix `on-primary-container`, which pushes the container away from its label (darker in light, lighter in dark) so text on Brand keeps ≥ 4.5:1 in every state; transparent variants mix their own ink. Hover adds elevation 1, focus adds a 2px primary outline at 1px offset, press shows a CSS ripple from the center (motion only under `prefers-reduced-motion: no-preference`). All transitions are 0.2s ease-in-out.
- **Outlined / Secondary** (`.btn-outlined`, `.btn-secondary`): transparent container, primary border and ink.
- **Text / Tertiary** (`.btn-text`, `.btn-tertiary`): transparent, primary ink, 0.75rem padding, never elevated.
- **Icon** (`.btn-icon`): 2.5rem square, Ink Weak, 1.5rem icon.
- **FAB** (`.btn-fab`): 3.5rem, 1rem radius, `primary-container`.
- **Disabled** (`:disabled`, `[disabled]`, `aria-disabled="true"`): container at 12% ink, label at 38% ink, no state layer, `not-allowed` cursor.
- **Busy** (`aria-busy="true"`): no pointer events (keyboard still fires: pair with `disabled`/`aria-disabled` to block submit), 90% opacity, spinner instead of ripple.

### Inputs / Fields
- **Style:** 3rem tall, Paper fill, 1px Stroke Strong border, gentle radius, 1rem inline padding. `textarea` is double height.
- **Focus:** border and a 1px inset ring switch to Brand Accent (no outer glow).
- **Validation:** `aria-invalid="true"` turns the border and ring Error and adds the invalid icon; `aria-invalid="false"` does the same in Success.
- **Disabled:** Tinted Fill background, Ink Weak text.
- **Search:** pill shape with a leading search icon.

### Radio / Checkbox / Switch
Native inputs with `appearance: none`, 1.25rem, 2px Ink Weak stroke; checked state uses the accent. Disabled uses on-surface at 38% opacity. Label wrapping via `label:has(...)`.

### Navigation (Header)
`header` is a flex row on Paper with 1rem block padding. Inside it, `nav ul` is a horizontal row with 0.5rem item padding, and an `hr` in a `nav` becomes a vertical hairline divider in Stroke Strong at 70%. `.brand` aligns the logo and name. `.sticky` pins the header to the top.

### Menu
Tinted Fill panel, elevation 2, gentle radius, 12rem minimum width, 0.5rem block padding. Rows are 3rem with 0.75rem gaps and Label Small text. Hover is 8% ink, press 10%, disabled 4% fill with 38% ink. Expandable rows get an arrow.

### Cards / Containers
`.card` is structural only: gentle radius, clipped overflow, `.card-body` as a 1rem-gap column. No fill or shadow of its own; color comes from context.

## Do's and Don'ts

### Do:
- **Do** style from the element and its ARIA state: `[aria-invalid]`, `[aria-busy]`, `[aria-disabled]`, `:disabled`, `:focus-visible`, plus `data-hovered` / `data-focused` / `data-pressed` for scripted states.
- **Do** express interaction states through the state layer (`color-mix` into the container at 14% / 20%: the label ink on transparent variants, `on-primary-container` on filled ones) and the shared 12% / 38% disabled mixes.
- **Do** reference color only through `--cs-*` roles; add new values as `!default` tokens in `settings/`.
- **Do** keep everything flat at rest; use `--cs-elevation-*` only for hover, focus, press, or floating layers.
- **Do** keep focus visible: a 2px primary outline on buttons, a primary stroke plus inset ring on fields.
- **Do** gate motion behind `prefers-reduced-motion: no-preference`.

### Don't:
- **Don't** hardcode hex or rgb in components; the only literal colors live in palettes and the generated theme.
- **Don't** add state modifier classes (`.is-active`, `.disabled`, `.error`); if HTML or ARIA can express the state, style that.
- **Don't** introduce a second accent hue within a theme.
- **Don't** let Stroke Weak (`outline-variant`) be the only signal of a state.
- **Don't** add a second font family; hierarchy is size and weight.
