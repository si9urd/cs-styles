# Приведение `scss/` к канонической структуре ITCSS

Целевая структура уже описана в `CLAUDE.md`. Этот файл — план, как к ней прийти от текущего состояния.

## Текущее состояние (на 2026-10-10)

```
scss/
├── _variables.scss        settings (+ зависит от abstracts/functions)
├── _layers.scss           @layer reset, bootstrap;
├── _copyright.scss        баннер
├── _index.scss            порядок: themes → copyright → utils → base → components → content → landmarks
├── abstracts/             tools: functions, helpers, mixins
├── themes/                _themes_colors (Sass-карта, генерируется) + _colors (--cs-* цвета)
├── base/                  reset, document, typo, root (--cs-* токены)
├── content/               aria, elevation, icons, stack, card
├── landmarks/             react, header, layout, logo, scheme-toggle
├── components/            13 партиалов (button, inputs, menu, table, breakdown…)
├── utils/                 6 групп утилит через Bootstrap utilities API
└── vendor/bootstrap/      grid, container, rfs, utilities API
```

### Найденные расхождения с ITCSS

1. **Неправильный порядок слоёв.** `utils` подключаются раньше `base` и `components` — специфичность «вверх ногами», поэтому утилиты держатся на `!important` (`$enable-important-utilities: true`).
2. **Каскадные слои почти не используются.** Объявлены только `reset, bootstrap`; всё остальное — вне слоёв. Сетка попадает в `@layer bootstrap` побочным эффектом `@use "../vendor"` из утилит.
3. **Папки смешивают слои:**
   - `base/_root.scss` — это tokens, `base/_reset.scss` — generic, `base/_document|_typo` — elements;
   - `content/_elevation.scss` — функции (tools) + `--cs-elevation-*` (tokens) + `.elevation-N` (utilities);
   - `content/_icons.scss` — миксины-иконки (tools) + `--cs-*-icon` (tokens);
   - `content/_aria.scss` — elements, `content/_stack.scss` — objects, `content/_card.scss` — components;
   - `landmarks/_layout.scss` — objects, `_header|_logo|_scheme-toggle` — components, `_react.scss` — generic;
   - `components/_table.scss`, `_breakdown.scss` — это reset/elements для `table`/`hr`, а не компоненты;
   - `themes/_themes_colors.scss` — Sass-карта без CSS-вывода, то есть settings.
4. **Дубли:** `reset-typo` объявлен и выводится дважды (`base/_reset.scss` и `base/_typo.scss`); `cursor: not-allowed` для disabled — в `_reset.scss` и `content/_aria.scss`; `[aria-control]` (несуществующий атрибут) рядом с `[aria-controls]`.
5. **Settings зависят от tools:** `_variables.scss` делает `@use "abstracts/functions"` ради `negativify-map`.
6. **Нет единого паттерна вывода:** часть партиалов делает `@include` миксина в корне файла, часть пишет правила прямо в корень (`_root`, `_logo`, `_scheme-toggle`, `:root` в `_elevation`). Соглашение требует выводить из `_index.scss`.
7. **`@extend` между слоями:** `landmarks/_layout.scss` расширяет `%v-stack` из `content/`; при раскладке по `@layer` селектор вытечет из слоя (см. предупреждение в `CLAUDE.md`).
8. **`!important` в компонентах** (`_button` disabled, `_inputs`, `_link`, `_menu`) — костыль против неправильного порядка, после введения слоёв часть можно снять.
9. **Мёртвый код:** ~90 строк закомментированного `grid-landmarks` в `landmarks/_layout.scss`, `//@use "../content/icons"` в `_loading.scss`.
10. **Документация отстала:** `docs/scss-conventions.md` ссылается на удалённый `_tokens.scss` и на старый порядок слоёв; `tasks.md` §2 перечисляет старые папки.

## Целевая структура

```
scss/
├── cs-styles.scss         точка входа (with (...))
├── _index.scss            @forward settings; meta.load-css каждого слоя в его @layer
├── _layers.scss           @layer tokens, generic, elements, objects, components, utilities;
├── _copyright.scss
├── settings/              _index, _config (флаги), _tokens (размеры/шрифты/z-index), _themes_colors (генерируется)
├── tools/                 _index, _functions, _helpers, _mixins, _elevation (функции теней), _icons (миксины SVG)
├── tokens/                _index, _base (бывш. base/_root), _colors (бывш. themes/_colors), _elevation, _icons
├── generic/               _index, _reset, _app-root (бывш. landmarks/_react)
├── elements/              _index, _document, _typography, _aria, _table, _hr
├── objects/               _index, _stack, _layout, _grid (вызов vendor make-grid/make-containers)
├── components/            _index, button, group, link, loading, progress, form, inputs, select, menu,
│                          switches, range, card, header, logo, scheme-toggle
├── utilities/             _index, align, borders, display, sizing, spacing, text, elevation
└── vendor/bootstrap/      без изменений; vendor/_index только @forward API
```

## Принцип выполнения

Рефакторинг структурный: **выходной CSS не должен меняться**, кроме осознанных изменений (порядок/слои, удалённые дубли). Каждая задача заканчивается `npm run build` + сравнением `dist/cs-styles.css` с эталоном и `npm run lint`.

---

## Задачи

### Этап 0. Подготовка

- [x] **0.1 Эталон сборки.** Сборка с HEAD (`f62251e`) сохранена в `.baseline/cs-styles.css` (в `.gitignore`).
- [x] **0.2 Скрипт сравнения.** `npm run build && npm run check:diff` — `git diff --no-index --exit-code` эталона с `dist/cs-styles.css`. Критерий для этапов 2–3: пустой diff.
- [x] **0.3 Ветка.** `itcss` от `dev3`, по коммиту на задачу.

### Этап 1. Чистка без изменения структуры (пустой diff не обязателен — изменения осознанные)

- [x] **1.1** Удалить дублирующий `reset-typo` из `base/_typo.scss` (остаётся в `_reset.scss`). В diff должен исчезнуть один повторный блок.
- [x] **1.2** Удалён `[aria-control]`; `cursor: not-allowed` для disabled оставлен только в `content/_aria.scss` (`[aria-disabled="true"]`, `[disabled]`), из `_reset.scss` убран.
- [x] **1.3** Удалить закомментированный `grid-landmarks` из `landmarks/_layout.scss` и `//@use` из `components/_loading.scss` (история в git).

### Этап 2. Settings и Tools (CSS не выводят, diff пустой)

- [x] **2.1** `abstracts/` → `tools/`, `tools/_index.scss` `@forward`-ит всех членов; потребители подключают `@use "../tools" as *`.
- [x] **2.2** `_variables.scss` → `settings/_index.scss` (одним файлом: дробить на `_config`/`_tokens` незачем, пока он ~130 строк). Все `@use "../variables"` → `@use "../settings" as *`, в `scss/_index.scss` — `@forward "settings"`. `vendor/bootstrap/` не тронут — у него свои `abstracts/`.
- [x] **2.3** Settings больше не зависят от tools: `$negative-spacers: null !default` остался в settings, вычисление через `negativify-map` перенесено в `utils/_spacing.scss` (`$_negative-spacers`).
- [x] **2.4** Палитра — `settings/_themes_colors.scss`, чистые данные `$theme-palette: (...)` без `@use` и `!global`. Слияние в `settings/_index.scss`: `map.merge(palette.$theme-palette, $theme-colors)` (переопределения пользователя побеждают, проверено), затем `*-icon-*` ключи. Генератор (`themeColorsGenerator.js`) выводит новый формат; файл перегенерирован `npm run theme` (палитра совпала с `material-theme-default.json`). Пути обновлены в `package.json`, `m3theme-generator.js`, `stylelint.config.mjs`.
- [x] **2.5** Из `content/` вынесено в tools: `shadow-before/after`, `elevation`, `make-elevation` → `tools/_elevation.scss`; миксины иконок и `svg-icons` → `tools/_icons.scss`. В `content/_elevation|_icons` остался только вывод CSS.
  - Плейсхолдеры `%v-stack`/`%h-stack` в `tools/` **не переносим**: правило плейсхолдера выводится там, где модуль загружен впервые, а tools грузится из корня — после этапа 4 расширенные селекторы оказались бы вне слоя. Плейсхолдеры живут в слое потребителей: `objects/_stack.scss`, `_layout` подключает его как соседа (см. 3.4).

### Этап 3. Раскладка CSS-слоёв по папкам (порядок `_index.scss` пока прежний, diff пустой)

- [x] **3.1 tokens/**: `_base` (бывш. `base/_root`), `_colors` (бывш. `themes/_colors`), `_elevation` (`:root` с тенями), `_icons` (`:root` с SVG под `$enable-icons`). `themes/` удалена.
- [x] **3.2 generic/**: `_reset`, `_app-root` (бывш. `landmarks/_react`).
- [x] **3.3 elements/**: `_document`, `_typography` (бывш. `_typo`), `_aria`, `_table`, `_hr` (бывш. `components/_breakdown`). `base/` удалена.
- [x] **3.4 objects/**: `_stack`, `_layout` (`@use "stack"` вместо всего `content`), `_grid` (вызов `make-containers`/`make-grid`, пока ещё в `@layer bootstrap`). `vendor/_index.scss` только `@forward`-ит API и функции.
- [x] **3.5 components/**: добавлены `_card`, `_header`, `_logo`, `_scheme-toggle`; `_table`/`_breakdown` ушли в elements. `content/`, `landmarks/` удалены.
- [x] **3.6 utilities/**: `utils/` → `utilities/`; `.elevation-N` → `utilities/_elevation.scss` (выводится всегда, как раньше; в `utilities/_index.scss` подключается на этапе 4).
- [x] **3.7 Единый паттерн вывода — отменено.** Переносить `@include` из партиалов в `_index.scss` — это правка почти каждого файла без пользы: `meta.load-css` грузит `_index` папки целиком. Правило остаётся как есть: партиал сам выводит свой CSS (под своим `$enable-*`), `_index` папки только `@use`-ит. Исключение — `utilities/`, там флаги групп проверяет `_index`. Описание в `docs/scss-conventions.md` поправить в 6.1.

Каждый `_index.scss` слоя компилируется отдельно. Корневой `scss/_index.scss` **временно** подключает партиалы по одному в старом порядке вывода (помечено `ponytail:`), поэтому diff пустой.

### Этап 4. Каскадные слои и порядок ITCSS (diff ожидаем: порядок + `@layer`)

- [x] **4.1** `_layers.scss`: `@layer tokens, generic, elements, objects, components, utilities;`. Слои `reset`/`bootstrap` упразднены. lightningcss выбрасывает эту строку из `dist/`, так как слои и так появляются в объявленном порядке — на результат не влияет.
- [x] **4.2** `scss/_index.scss`: `@forward "settings"` + `meta.load-css` каждой папки в своём `@layer`. Обёртки `@layer reset`/`bootstrap` сняты, `elevation` подключён в `utilities/_index.scss`. Вне слоёв в `dist/` нет ни одного правила.
- [x] **4.3** Все `@extend` — внутри своего файла (`_button`, `_inputs`, `_stack`) или своего слоя (`_layout` → `objects/_stack`). В `dist/`: `.v-stack`/`.h-stack`/`.content-block` — `objects`, `.btn*` — `components`, `.elevation-*`/`.d-*`/`.m-*` — `utilities`.
- [x] **4.4** Баннер `/*! … */` первым в обоих файлах `dist/` (`build:banner` теперь дописывает и в `cs-styles.css`; раньше там баннера не было). В баннере `v0.7.30`, в `package.json` `0.7.31` — поправить при релизе (6.4).
- [ ] **4.5** Сверка: множества деклараций эталона и сборки совпадают (2293 = 2293, с учётом селектора и `@media`/`@supports`), отличаются только порядок и `@layer`. **Осталось:** визуальная проверка в приложении-потребителе (светлая/тёмная тема, формы, кнопки, сетка, утилиты) — в репозитории нет demo-страницы.

Изменения каскада, о которых стоит знать (→ CHANGELOG, 6.4):
- Раньше в слоях были только reset и сетка — теперь весь фреймворк. Любой неслоёный CSS потребителя перебивает его независимо от специфичности.
- Утилиты — последний слой и перебивают компоненты без `!important`.
- Внутри слоёв `!important` работает наоборот: `!important` компонентов (`_button` disabled, `_inputs`) теперь всегда побеждает `!important` утилит. Раньше это решали специфичность и порядок, результат на практике тот же. Снимается на этапе 5.

### Этап 5. Снятие `!important` (поведенческие изменения, по одному коммиту)

- [x] **5.1** `$enable-important-utilities: false` — в `vendor/bootstrap/abstracts/_variables.scss` (переменная вендорная, из `settings` не настраивается). Утилиты в последнем слое перебивают все слои фреймворка без `!important`; `[hidden] { display: none !important }` из reset по-прежнему сильнее `.d-*`.
  - **Breaking:** раньше утилиты перебивали и неслоёный CSS потребителя, теперь нет (`.card { margin: 1rem }` у потребителя победит `class="card m-0"`). Если нужно старое поведение — вынести флаг в `settings` и пробросить в вендор.
- [x] **5.2** Снято 8 из 20: `_inputs` — `outline: none` (мешал потребителю добавить свой фокус), `padding-top` у `textarea`, `--border-radius`/`padding-left`/`background-position` у `search`, `--padding` у `color` (все побеждают `%input` специфичностью и порядком); `_link` — оба в disabled (специфичность равна `:hover`, disabled ниже по файлу).
  - Оставлены, потому что перебивают правила своего слоя или браузера: `_button` disabled (варианты кнопок), `textarea --height` (`[role="group"] > *` задаёт `--height` с большей специфичностью), `_menu` `:active` (`:hover` специфичнее: 0,4,1 против 0,3,1), autofill (стили браузера), reset (`[hidden]`, reduced motion).

Итог: `!important` в `dist/cs-styles.css` 1236 → 19; без учёта флага набор деклараций совпадает с этапом 4.

### Этап 6. Документация и конфиги

- [x] **6.1** `docs/scss-conventions.md`: новый порядок слоёв, `settings/` вместо `_tokens.scss`, правило «плейсхолдеры — в слое потребителя, не в `tools/`», «партиал сам выводит свой CSS, `_index` папки только `@use`-ит» (заменить пункт «Layer bodies live in mixins included from `_index.scss`»).
- [x] **6.2** `CLAUDE.md`: сверить описание с итоговой структурой (имена файлов, флаги).
- [x] **6.3** `tasks.md` §2: закрыть пункты про разделение слоёв, сослаться на этот файл.
- [~] **6.4** `CHANGELOG.md`: запись в `Unreleased` (три breaking-изменения с миграцией). **Версию не поднимал** — это решение релиза: `docs/versioning.md` требует MAJOR для breaking, для 0.x обычно хватает минора (`0.8.0`). Заодно обновить версию в `_copyright.scss` (сейчас `v0.7.30`).
- [x] **6.5** Пути `theme`/`ignoreFiles` обновлены ещё на этапе 2.4; также `THEME.md`, `docs/commands.md`.

---

## Риски

- **`meta.load-css` + `with (...)`:** конфигурация применяется при первом `@use "settings"` из `cs-styles.scss`; все слои должны подключать settings только через `@use`, без собственного `with`.
- **`@extend` + `@layer`:** главный источник регрессий — проверять `dist/` после этапа 4.
- **Порядок внутри `$theme-colors`:** при переходе с `!global` на `map.merge` легко перевернуть приоритет пользовательских цветов — проверить на `$theme-colors: ('light-primary': green)`.
- **Публичный API:** классы и `--cs-*` не меняются; меняются только пути партиалов и имена каскадных слоёв.
