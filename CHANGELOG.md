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
- `color-scheme` перенесён из слоя `tokens` в `elements` (`:root`), поведение то же.

### Removed

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
