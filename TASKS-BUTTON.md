# Задачи по дизайну `cs-styles`

Источник: `/impeccable audit components/_button.scss` (2026-10-19). Контраст посчитан по WCAG для палитры `mint` поверх сгенерированной M3-палитры.

## Оценка аудита кнопок

| # | Направление | Балл | Главная находка |
|---|---|---|---|
| 1 | Доступность | 2 | Белый текст на основной кнопке в светлой теме — 3.59:1 (< 4.5:1) |
| 2 | Производительность | 3 | Ripple анимирует `background-size`; критичного нет |
| 3 | Адаптивность | 2 | `touch-target` отключён, кнопки 40px; `nowrap` при фиксированной высоте |
| 4 | Темизация | 3 | Hex нет, но FAB и тёмный `on-primary` не в оттенке темы |
| 5 | Цельность реализации | 3 | Соответствует DESIGN.md; мелкий дрейф и мёртвый код |
| **Итого** | | **13/20** | **Приемлемо** |

## P1 — до релиза

- [x] **Контраст текста на основной кнопке** (`scss/components/_button.scss:70–83`, `settings/_palettes.scss`). Нарушает WCAG 1.4.3 и правило Contrast Floor из DESIGN.md.

  | Состояние | Цвета | Контраст |
  |---|---|---|
  | Покой | белый на `#0F9977` | 3.59:1 |
  | Hover/focus (+14%) | | 2.99:1 |
  | Нажатие (+20%) | | 2.76:1 |

  В тёмной теме: 8.21:1.
  - [x] Затемнить `light-primary` в `$mint` примерно до HSB 165 90 48 (≥ 4.5:1 с белым).
  - [x] Проверить остальные пресеты (`indigo`, `violet`, `navy`, `teal`) по той же паре.
  - [x] Подмешивать state layer тёмным цветом, а не `--color`: сейчас белый текст осветляет фон и снижает контраст.
  - [x] Добавить пару «текст на Brand» в таблицы `THEME-DESIGN.md`.
  - Команда: `/impeccable colorize`, `/impeccable harden`.

- [x] **Зона касания отключена, `::before` занят** (`_button.scss:62`, `tools/_mixins.scss:8–11`). Кнопки и `.btn-icon` по 40px при `$touch-target-size: 3rem`. Проходит WCAG 2.5.8 (AA), но не 2.5.5 (AAA). `::before` у кнопки уже использует ripple (`_mixins.scss:26`), спиннер `aria-busy` (`_loading.scss:8`) и иконка `[data-theme-toggle]`; `::after` свободен.
  - [x] Вернуть миксин `touch-target` на `::after`.
  - [x] Раскомментировать `@include touch-target`.
  - Команда: `/impeccable adapt`.

## P2 — следующий проход

- [x] **`disabled="false"` выглядит активной** (миксин `disabled`, `tools/_mixins.scss`). `disabled` — булев атрибут: браузер блокирует кнопку, а стиль её не гасит. Убрать исключение `:not([disabled="false"])` или задокументировать его как осознанный компромисс. Команда: `/impeccable harden`.
- [x] **`aria-busy` блокирует только мышь** (`_button.scss:86–91`). Enter/Space на кнопке в фокусе всё равно срабатывают. `cursor: progress` при `pointer-events: none` не показывается (мёртвый код). Задокументировать, что блокировка — через `disabled`/`aria-disabled`; курсор убрать или оставить без `pointer-events: none`. Команда: `/impeccable harden`.
- [x] **`input[type=button|reset]` получают стили поля** (`scss/components/_inputs.scss`, `input:not(:where(...))`). Наследуют `width: 100%` и фоновые позиции поля; на `:focus` `--border-color` становится primary (`input:focus` (0,1,1) > кнопка (0,1,0)). Добавить `[type="button"], [type="reset"]` в исключения `%input`. Команда: `/impeccable harden`.
- [x] **Фиксированная высота + `nowrap`** (`_button.scss:50`). Длинные подписи и узкие контейнеры дают горизонтальное переполнение. Варианты: `max-width: 100%` + `text-overflow: ellipsis` или `min-height` вместо `height`. Команда: `/impeccable adapt`.
- [x] **FAB и тёмный `on-primary` вне оттенка темы** (`_button.scss:192–193`). `$mint` не задаёт `primary-container`, `on-primary-container`, `dark-on-primary`, поэтому FAB голубой (`#D6E3FF`), а текст на кнопке в тёмной теме тёмно-синий (`#0A305F`). Нарушает One Hue Rule; контраст в порядке. Дополнить пресеты в `_palettes.scss`. Команда: `/impeccable colorize`.

## P3 — по возможности

- [x] **`--cs-on-surface-container` не определён** (`_button.scss:22`). Сейчас скрыто `%button-primary`; ловушка для новых вариантов. Заменить на `on-surface` или завести токен.
- [x] **Залипающий hover на тач-устройствах** (`_button.scss:70`, `:200`). Обернуть hover в `@media (hover: hover)`. Команда: `/impeccable polish`.
- [x] **Обводка SVG-иконок** (`_button.scss:120`). `path:not([stroke]) { stroke: ... }` утолщает иконки с заливкой; расходится с моделью «иконка через `currentColor`». Команда: `/impeccable polish`.

## Системные выводы

- `::before` на кнопке перегружен (ripple, спиннер, переключатель темы, touch-target). Правило: `::before` — визуал, `::after` — зона касания.
- Пресеты палитр закрывают 7 ролей из ~30, остальное приходит из чужой сгенерированной палитры.
- Контраст в `THEME-DESIGN.md` считается только «к Fill»; пары «текст на Brand» нет.

## Что сохранить

- Состояния через ARIA, `:disabled`, `aria-pressed` и `data-hovered`/`data-focused`, без классов-модификаторов.
- Единый state layer на `color-mix` вместо цветов на каждый вариант.
- Видимый фокус: `outline` 2px primary, отступ 1px, контраст 3.59:1.
- Ripple без JS, движение только при `prefers-reduced-motion: no-preference`.
- `:where()` на правиле ведущей иконки, чтобы варианты не проигрывали по специфичности.
- Тёмная тема проходит AA с запасом (6.5–12:1).

## Порядок работ

1. [x] **P1** `/impeccable colorize` — контраст `light-primary`, недостающие роли пресетов.
2. [x] **P1** `/impeccable adapt` — `touch-target` на `::after`, переполнение при `nowrap`.
3. [x] **P2** `/impeccable harden` — `disabled="false"`, `aria-busy`, `%input` vs `[type=button|reset]`, state layer.
4. [x] **P3** `/impeccable polish` — `@media (hover: hover)`, обводка SVG, `on-surface-container`.
5. [ ] Повторить `/impeccable audit components/_button.scss`.
