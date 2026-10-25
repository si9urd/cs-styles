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
- Кнопка-иконка определяется сама: кнопка с `aria-label`/`aria-labelledby`, у которой нет детей или все дети — `i`, `img`, `svg`, получает вид `data-btn="icon"`. Явный `data-btn` (например, `fab`) отключает автоопределение; `[data-theme-toggle]` не затронут.
- Кнопка-иконка остаётся квадратной во flex-контейнере (не сжимается), а под содержимое шире иконки растягивается в прямоугольник с равными боковыми отступами вместо того, чтобы обрезать его.
- Баннер с лицензией теперь и в `dist/cs-styles.css` (раньше только в `.min.css`).
- Настройка `$enable-auto-dark` (по умолчанию `false`): без `data-theme` на корне тема следует за `prefers-color-scheme`, `data-theme="light"` закрепляет светлую. Сборка по умолчанию не меняется.
- Токены трека `--cs-track` (заливка, по умолчанию `secondary-container`) и `--cs-track-outline` (обводка 1px: `on-surface-variant` в светлой теме, `outline` в тёмной) для `progress` и `input[type="range"]`. Переопределяются ключами `light-track`, `dark-track`, `light-track-outline`, `dark-track-outline` в `$theme-colors`.
- Размеры, раньше зашитые в компоненты, вынесены в настройки (все `!default`, CSS по умолчанию не изменился): `$border-width` (1px: рамки кнопок и полей, внутреннее кольцо фокуса поля, `hr`, разделители шапки и меню, обводка трека, `--cs-border-width`), `$control-border-width` (2px: radio, checkbox, switch, галочка), `$focus-ring-width` и `$focus-ring-offset` (2px), `$radio-size` (1.25rem), `$checkbox-size` (1.125rem), `$switch-size` (2rem), `$range-track-height` (.5rem), `$range-thumb-size` (1.5rem), `$group-field-basis` (8rem).
- Пункты `.menu` получили видимый фокус клавиатуры: слой 12% (`$state-press-soft`) и внутреннее кольцо 2px `primary`.

### Changed

- FAB (`.btn-fab`) в покое на `--cs-elevation-3`, а не на `elevation-0`: бледный `primary-container` сливался с фоном.
- Доли слоёв состояний вынесены в настройки `$state-hover`, `$state-press`, `$state-hover-soft`, `$state-press-soft`, `$state-selected`, `$state-disabled-container` и `$state-disabled-content`. Значения прежние, кроме нажатия в `.menu`: 12% вместо 10%, как у soft-кнопок.
- У `textarea` убран `!important` в `--height`: высоту снова можно переопределить.
- `.cs-logo` в одном оттенке `primary` вместо градиента `primary → tertiary`; отдельная ветка для `forced-colors` больше не нужна.
- Трек `progress` и `range` получил обводку: заливка `secondary-container` к фону давала 1.17:1 в светлой теме и 2.36:1 в тёмной, обводка даёт ≥ 3.8:1 на всех поверхностях во всех встроенных палитрах (WCAG 1.4.11). Сплошной трек 3:1 не подошёл: он сливается с заливкой `primary` (около 1.4:1). Заливка трека к `primary` по-прежнему ≥ 3.6:1.
- Группа контролов (`[role="group"]`) на узком экране переносит кнопки целиком на следующий ряд (`flex-wrap: wrap`, `max-width: 100%`) вместо выхода за край. Подписи внутри группы рвутся между словами (`overflow-wrap: break-word`), а не по буквам. Поля и `select` в группе делят ряд (`flex: 1 1 8rem`) и не схлопывают соседнюю кнопку в столбик. `form[role="search"]` по-прежнему в один ряд.
- Бегунок выключенного switch окрашен в `on-surface-variant` вместо `outline`: в светлой теме контраст к треку был 2.61:1, стал 4.24:1 (WCAG 1.4.11).
- Hover у пунктов `.menu` срабатывает только на устройствах с hover и не залипает после касания.
- Активная ссылка (hover, focus, `aria-current`, нажатие) смешивает `primary` с `on-surface`, а не с `--cs-base`: смесь с цветом фона снижала контраст ниже ссылки в покое, теперь он только растёт в обеих темах.
- Иконки на маске (спиннер `aria-busy`, переключатель темы) видны в `forced-colors`: раньше фон перекрашивался в `Canvas` и иконка пропадала.
- Поля ввода, `textarea` и `select` с `aria-disabled="true"` выглядят выключенными, как с `disabled`; в `forced-colors` выключенное поле рисуется `GrayText`. Поле при этом остаётся редактируемым: для запрета ввода добавьте `readonly`.
- **Breaking.** `[role="group"]` склеивается в одну панель, только если среди прямых детей есть контрол (`button`, `select`, `[role="button"]`, `input` кроме checkbox/radio). Группы чекбоксов, `role="group"` в деревьях и меню больше не становятся `inline-flex`. Миграция: группе без контролов, которой нужна панель, добавьте прямого ребёнка-контрол или стилизуйте сами. `[role="search"]` не изменился.
- Спиннеры учитывают `prefers-reduced-motion: reduce`: `--cs-icon-ring-spinner` и `--cs-icon-dots-spinner` останавливают вращение и пульсацию внутри SVG (остаются целое кольцо и три точки), а спиннер `aria-busy` вместо движения медленно мерцает прозрачностью (2s, до 40%).
- **Breaking.** Спиннер `aria-busy="true"` рисуется только у `button`, `[role="button"]`, `a`, `[role="link"]`, `span` и пустых элементов. Занятая непустая область (`section`, `table`, список) получает только `cursor: progress`, без `::before` в своей раскладке. Миграция: для индикатора у области поставьте внутрь пустой `<span aria-busy="true"></span>`.
- Селектор иконки `[data-theme-toggle]` в тёмной теме привязан к `:root[data-theme="dark"]`, как и токены темы.
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
- **Breaking.** Варианты кнопок задаются атрибутом `data-btn` вместо классов `.btn-*`; значения сочетаются через пробел (`data-btn="outlined pill"`).
  - Миграция: `class="btn-outlined"` → `data-btn="outlined"`; так же `secondary`, `text`, `tertiary`, `pill`, `fab`, `icon`.
- **Breaking.** Меню выбирается по `role="menu"` вместо класса `.menu`.
  - Миграция: `class="menu"` → `role="menu"`, пунктам — `role="menuitem"` (`menuitemcheckbox`/`menuitemradio` для `aria-checked`).
- **Breaking.** Модификаторы меню переведены на ARIA, у меню свой флаг `$enable-menu` (по умолчанию `true`; раньше меню включалось `$enable-forms`).
  - Ломается: `.divider`, `.has-children`, `[data-expandable]` и `.has-icons-indent` больше не работают.
  - Миграция: разделитель — `<hr>` или `role="separator"`; пункт с подменю — `aria-haspopup="menu"`; отступ под иконки ставится сам, если хотя бы один пункт начинается с иконки (`:has()`), класс удалить. Если отключали `$enable-forms`, а меню нужно — оно теперь остаётся; если не нужно — `$enable-menu: false`.
- `color-scheme` перенесён из слоя `tokens` в `elements` (`:root`), поведение то же.
- **Breaking.** SVG-иконки собраны в карту `$icons` (`name: "<svg …>"`, цвет `currentColor`) и выводятся один раз, без цвета и без копий под тему: `--cs-icon-<name>` (`dark`, `light`, `menu`, `github`, `search`, `valid`, `invalid`, `chevron`, `ring-spinner`, `dots-spinner`). Иконка красится маской: `mask: var(--cs-icon-menu) center / contain no-repeat; background-color: currentColor`. Переключатель темы и спиннер `aria-busy` перешли на маску и берут цвет текста (убран хак `filter: invert()` у спиннера на кнопках). Полям ввода маска недоступна, у них цветные токены по теме: `--cs-input-icon-search|chevron|valid|invalid`.
  - Ломается: `--cs-dark-icon`, `--cs-light-icon`, `--cs-menu-icon`, `--cs-github-icon`, `--cs-search-icon`, `--cs-valid-icon`, `--cs-invalid-icon`, `--cs-chevron-icon`, `--cs-ring-spinner`, `--cs-dots-spinner` удалены; mixin'ы `*-icon`, `btn-spinner-background`, `svg-icons` из `tools/` удалены. Иконка переключателя темы теперь в `[data-theme-toggle]::before`, а не в `background-image` самого элемента.
  - Миграция: `background-image: var(--cs-menu-icon)` → маска с `var(--cs-icon-menu)` (готовый mixin `icon-mask($icon, $size)` в `tools/`); свои иконки — `$icons: ("logo": "<svg …>")` в `with (...)`, `null` убирает встроенную.

### Removed

- **Breaking.** Варианты кнопок `.btn-elevated` и `.btn-tonal`. Миграция: `.btn-outlined`, `.btn-text` или кнопка без класса.
- **Breaking.** Токены `--cs-btn-height`, `--cs-btn-font-size`, `--cs-btn-inner-icon-size` и `--cs-font-size-input` убраны из `:root`: это значения отдельных компонентов. Миграция: настройки `$btn-height`, `$btn-font-size`, `$btn-inner-icon-size` (по умолчанию `$btn-icon-size * .75`), `$font-size-input` в `with (...)` или локальные `--height`/`--font-size`/`--background-size` на кнопке и поле.
- **Breaking.** Атрибут `[data-pressed]`. У кнопок нажатое состояние теперь даёт `[aria-pressed="true"]` (кнопка-переключатель во включённом положении). У ссылок и пунктов `.menu` замены нет: `aria-pressed` для этих ролей не предусмотрен, остаётся `:active`, а выбранный пункт меню по-прежнему отмечается `aria-checked`/`aria-selected`.
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
