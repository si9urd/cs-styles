# Changelog

Все значимые изменения в `cs-styles` фиксируются в этом файле.

Формат ведения изменений:

- используем структуру `Keep a Changelog`
- версии пишем по `SemVer`
- каждая запись должна быть привязана к конкретному релизу
- в `Unreleased` попадают только готовящиеся изменения
- для breaking changes указываем отдельное пояснение и миграцию
- не дублируем внутренние рефакторинги без влияния на публичный API

## [Unreleased]

### Added

- Начато оформление журнала изменений.
- Баннер с лицензией теперь и в `dist/cs-styles.css` (раньше только в `.min.css`).

### Changed

- Зафиксировано правило ведения изменений для будущих релизов.
- Размер шрифта ссылки по умолчанию наследуется (`--link-font-size: inherit`), раньше был `--cs-font-size-base`: ссылка в заголовке или в мелком тексте больше не сжимается/раздувается до базового размера. Прежнее поведение: `--link-font-size: var(--cs-font-size-base)`.
- Из reset убрано глобальное подавление `animation`/`transition` при `prefers-reduced-motion: reduce` (`* { … !important }`). Компоненты фреймворка гасят своё движение сами; анимации проекта-потребителя больше не обрезаются, и `!important` из слоя `generic` не мешает их переопределять. Если глушилка нужна, добавьте её в свой CSS.
- **Breaking.** Исходники `scss/` переложены по ITCSS: `settings/`, `tools/`, `tokens/`, `generic/`, `elements/`, `objects/`, `components/`, `utilities/`. Классы, `--cs-*` и `data-theme` не менялись.
  - Ломается: прямое подключение партиалов по старым путям (`scss/base/…`, `scss/utils/…`, `scss/abstracts/…`, `scss/content/…`, `scss/landmarks/…`, `scss/themes/…`, `scss/_variables.scss`).
  - Миграция: подключать `scss/cs-styles.scss` или `scss/index` с `with (...)` — имена настроек те же.
- **Breaking.** Весь CSS разложен по каскадным слоям `@layer tokens, generic, elements, objects, components, utilities` (раньше в слоях были только `reset` и `bootstrap`).
  - Ломается: CSS потребителя вне слоёв теперь перебивает любой стиль фреймворка независимо от специфичности; ссылки на слои `reset`/`bootstrap` больше не работают.
  - Миграция: свои переопределения не требуют повышения специфичности; если нужно, чтобы фреймворк побеждал, положите свой CSS в слой, объявленный раньше: `@layer my-base, tokens, generic, …;`.
- **Breaking.** Утилиты без `!important` — последний слой и так побеждает компоненты.
  - Ломается: утилита больше не перебивает CSS потребителя вне слоёв (`.card { margin: 1rem }` победит `class="card m-0"`).
  - Миграция: положить свой CSS в слой, объявленный до `utilities`, или повысить специфичность утилиты на месте.
- Сгенерированная палитра — `scss/settings/_themes_colors.scss` (`$theme-palette`), `npm run theme` пишет туда. Переопределения через `$theme-colors` работают как раньше.
- Снят лишний `!important` в `inputs` (`outline`, отступы `textarea`/`search`/`color`) и у disabled-ссылок.
- Нулевая специфичность у корня приложения: `:where(#app, #root)` (изоляция) и `:where(<$page-root>, .page) .content-block` (раньше ID в селекторе). Своё правило для `.content-block` теперь перебивает фреймворк без `#root`.
- `.elevation-*` включаются флагом `"elevation"` в `$enable-utilities` (по умолчанию `true`). Если передаёте свою карту `$enable-utilities` целиком, добавьте в неё `"elevation": true`, иначе классы пропадут.
- Класс логотипа учитывает `$prefix` (`.#{$prefix}-logo`, при `cs` — прежний `.cs-logo`). Новые настройки: `$logo-height`, `$logo-font-size`, `$border-radius-pill`.
- Размеры меню, FAB и `progress` вынесены в настройки: `$menu-width`, `$menu-item-height`, `$menu-icon-size`, `$menu-gap`, `$menu-padding-y`, `$menu-font-size`, `$menu-divider-margin-y`, `$menu-arrow-size`, `$fab-size`, `$fab-border-radius`, `$progress-height`. Значения по умолчанию прежние; у `progress` радиус теперь `$border-radius-pill` (визуально то же). Жирность меню и логотипа берётся из `--cs-font-weight-medium`/`--cs-font-weight-bold`. Убран неработающий `line-height` у разделителя меню.
- **Breaking.** Модификаторы меню переведены на ARIA, у меню свой флаг `$enable-menu` (по умолчанию `true`; раньше меню включалось `$enable-forms`).
  - Ломается: `.divider`, `.has-children`, `[data-expandable]` и `.has-icons-indent` больше не работают.
  - Миграция: разделитель — `<hr>` или `role="separator"`; пункт с подменю — `aria-haspopup="menu"`; отступ под иконки ставится сам, если хотя бы один пункт начинается с иконки (`:has()`), класс удалить. Если отключали `$enable-forms`, а меню нужно — оно теперь остаётся; если не нужно — `$enable-menu: false`.
- `color-scheme` перенесён из слоя `tokens` в `elements` (`:root`), поведение то же.
- **Breaking.** SVG-иконки собраны в карту `$icons` (`name: "<svg …>"`, цвет `currentColor`) и выводятся один раз, без цвета и без копий под тему: `--cs-icon-<name>` (`dark`, `light`, `menu`, `github`, `search`, `valid`, `invalid`, `chevron`, `ring-spinner`, `dots-spinner`). Иконка красится маской: `mask: var(--cs-icon-menu) center / contain no-repeat; background-color: currentColor`. Переключатель темы и спиннер `aria-busy` перешли на маску и берут цвет текста (убран хак `filter: invert()` у спиннера на кнопках). Полям ввода маска недоступна, у них цветные токены по теме: `--cs-input-icon-search|chevron|valid|invalid`.
  - Ломается: `--cs-dark-icon`, `--cs-light-icon`, `--cs-menu-icon`, `--cs-github-icon`, `--cs-search-icon`, `--cs-valid-icon`, `--cs-invalid-icon`, `--cs-chevron-icon`, `--cs-ring-spinner`, `--cs-dots-spinner` удалены; mixin'ы `*-icon`, `btn-spinner-background`, `svg-icons` из `tools/` удалены. Иконка переключателя темы теперь в `[data-theme-toggle]::before`, а не в `background-image` самого элемента.
  - Миграция: `background-image: var(--cs-menu-icon)` → маска с `var(--cs-icon-menu)` (готовый mixin `icon-mask($icon, $size)` в `tools/`); свои иконки — `$icons: ("logo": "<svg …>")` в `with (...)`, `null` убирает встроенную.

### Removed

- **Breaking.** Варианты кнопок `.btn-elevated` и `.btn-tonal`. Миграция: `.btn-outlined`, `.btn-text` или кнопка без класса.
- Повторный вывод `reset-typo`, правило `[aria-control]` (несуществующий атрибут), дубль `cursor: not-allowed` в reset.

### Fixed

- `outline: none !important` у полей ввода больше не мешает задать свой стиль фокуса.

## [0.7.31] - 2026-06-28

### Added

- Публичный пакет `@oleh-ob/cs-styles`.
- Сборка CSS из `scss/` в `dist/`.
- Темы, базовые компоненты, утилиты и vendor-слой.

### Changed

- Обновлены скрипты сборки и линтинга.

## Правила

1. Каждое изменение в релизе должно попадать в один из разделов: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.
2. Запись ведется коротко и по факту, без внутреннего шума.
3. Если изменение затрагивает публичный CSS API, указывается влияние на потребителей.
4. Если изменение ломает совместимость, пометка `breaking` обязательна.
5. Перед публикацией релиза `Unreleased` должен быть очищен или перенесен в новую версию.
