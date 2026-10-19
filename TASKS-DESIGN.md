# Задачи по дизайну `cs-styles`: весь фреймворк

Источник: `/impeccable audit` (2026-10-19), весь `scss/` кроме `vendor/`. Контраст посчитан по WCAG для палитры `mint` поверх сгенерированной M3-палитры (значения из `dist/cs-styles.css`). Задачи по кнопкам ведутся в `TASKS-BUTTON.md` и здесь не повторяются.

## Оценка аудита

| # | Направление | Балл | Главная находка |
|---|---|---|---|
| 1 | Доступность | 2 | Нет фокуса у ссылок и самописных контролов; граница поля 1.17:1 |
| 2 | Производительность | 3 | 9.9 КБ gzip; только мелкий мёртвый код |
| 3 | Адаптивность | 2 | RTL ломается на физических свойствах; навигация в header не переносится |
| 4 | Темизация | 2 | `$mint` задаёт 10 ролей, остальные синие из базовой палитры |
| 5 | Цельность реализации | 3 | Система цельная; мёртвые правила, разнобой приёмов |
| **Итого** | | **12/20** | **Приемлемо** |

## P1 — до релиза

- [x] **Нет индикатора фокуса у ссылок** (`scss/components/_link.scss:12`, `:27`). `outline: none`, а на `:focus` цвет смешивается с `--cs-base` всего на 10%, разницы не видно. Нарушает WCAG 2.4.7. Взять схему кнопок (`_button.scss:75`): `&:focus-visible { outline: 2px solid var(--cs-primary); outline-offset: 2px; }`. Команда: `/impeccable harden`.
- [x] **Нет фокуса у checkbox, radio, switch и range** (`scss/components/_switches.scss:16`, `:88`; `scss/components/_range.scss:25`). `appearance: none` убирает нативный фокус, замены нет. Нарушает WCAG 2.4.7. Добавить `:focus-visible` с outline `--cs-primary`; у range обводить thumb. Команда: `/impeccable harden`.
- [x] **Граница поля ввода почти не видна** (`scss/components/_inputs.scss:8`, `--border-color: var(--cs-outline-variant)`). Фон поля совпадает с фоном страницы, поле видно только по границе. Нарушает WCAG 1.4.11 и требование «UI ≥ 3:1» из PRODUCT.md.

  | Тема | Пара | Контраст |
  |---|---|---|
  | Светлая | `outline-variant` `#E4F0ED` на `#FFFFFF` | 1.17:1 |
  | Светлая | `outline` `#86A39C` на `#FFFFFF` | 2.72:1 |
  | Тёмная | `outline-variant` `#36403D` на `#0C0E13` | 1.80:1 |
  | Тёмная | `outline` `#95A6A2` на `#121A18` | 6.96:1 |

  - [x] Перевести границу поля на `--cs-outline`.
  - [x] Затемнить `light-outline` в `$mint` до ≥ 3:1 с белым: замена токена одна этого не даёт.
  - [x] Обновить baseline (`.baseline/cs-styles.css`) после правки.

  Команда: `/impeccable polish scss/components/_inputs.scss`.

## P2 — следующий проход

- [x] **Нет поддержки `forced-colors`** (во всём проекте ни одного `@media (forced-colors)`). В режиме высокого контраста Windows:
  - фокус полей сделан `box-shadow` при `outline: none` (`_inputs.scss:23`, `:57`), тень удаляется — фокуса нет;
  - бегунок switch нарисован `background-color` у `::before` (`_switches.scss:112`) и пропадает;
  - отмеченный checkbox теряет заливку.

  Полям поставить `outline: 2px solid transparent` вместо `outline: none` (браузер перекрасит его сам); бегунку задать `background: CanvasText` в `@media (forced-colors: active)`. Команда: `/impeccable harden`.
- [x] **`$mint` неполный** (`scss/settings/_palettes.scss:108`). Пресет задаёт 10 ролей, остальные приходят из синей базовой палитры: трек progress и range (`secondary-container` `#DAE2F9`), разделитель меню (`surface-variant` `#E0E2EC`), фон поля в тёмной теме (`surface-container-lowest` `#0C0E13`), `dark-success`. Вне кнопок это видно в progress, range, меню и полях. Дополнить пресеты всеми используемыми ролями (связано с задачей про FAB в `TASKS-BUTTON.md`). Команда: `/impeccable colorize`.
- [x] **RTL ломается на физических свойствах**. Поддержка RTL заявлена (`_document.scss:29`, `_progress.scss:55`), но зеркалятся неверно:
  - `_inputs.scss:24`, `:84–86`: иконки `right`/`left`, `padding-left`;
  - `_group.scss:20–27`: `border-top-left-radius` и соседние;
  - `_switches.scss:12`, `:25`, `:32`: `margin-right`;
  - `_menu.scss:68`, `:71`: `padding-left`, `margin-left`.

  Перейти на `padding-inline-start`, `margin-inline-end`, `border-start-start-radius`; иконки полей — отдельно для `[dir="rtl"]`. Команда: `/impeccable adapt`.
- [x] **Навигация в header не переносится** (`scss/components/_header.scss:55`, `nav ul` — flex без `flex-wrap`). На 320–375 px длинное меню даёт горизонтальный скролл. Добавить `flex-wrap: wrap`. Команда: `/impeccable adapt`.
- [x] **Indeterminate progress при reduced-motion выглядит пустым** (`scss/components/_progress.scss:33`). Заливка и анимация спрятаны в `no-preference` целиком, при `reduce` остаётся пустой трек, который читается как 0%. Вынести статичный градиент из медиазапроса, внутри оставить только `animation`. Команда: `/impeccable animate`.

## P3 — по возможности

- [x] **Мёртвые правила в `_aria.scss:14–21`**. `[aria-hidden="false"][hidden]` и `[aria-hidden="true"][hidden]` всегда проигрывают `[hidden] { display: none !important }` из слоя `generic`: `!important` в более раннем слое побеждает более поздний. Удалить или пересмотреть.
- [x] **Наследие IE** (`_range.scss:55–61`: `::-ms-track`, `::-ms-thumb`; комментарий про IE10 в `_progress.scss:15`). При `browserslist: defaults` не нужно, только байты.
- [x] **Разнобой приёмов прозрачности** (`_menu.scss:31`, `:45`, `:55`). Меню использует `rgb(from … / 8%)` и `!important`, кнопки — `color-mix`. Привести к одному приёму, `!important` убрать.
- [x] **Логотип** (`_logo.scss:13–14`, `settings/_index.scss:135`). `$logo-font-size: 38px` в px при шкале в rem (детектор: размер вне шкалы DESIGN.md); `cursor: pointer` на элементе, который не ссылка.

## Системные выводы

- **Нативный фокус убран без замены** в ссылках, полях и всех контролах с `appearance: none`. Правильный образец уже есть в кнопках (прозрачный outline в покое, `2px primary` на фокусе); вынести его в общий миксин в `tools/` и применить везде.
- **Физические свойства вместо логических** — около 10 мест при заявленном RTL.
- **Пресеты палитр задают только часть ролей**: всё, что они не покрывают, тихо остаётся синим.

## Что сохранить

- Кнопки: прозрачный outline (корректно в forced-colors), state layer, ripple без JS с учётом reduced-motion и `aria-busy`.
- Слои `@layer` и `:where()`: низкая специфичность, пользовательские переопределения побеждают без борьбы.
- 9.9 КБ gzip за полный набор с двумя темами и иконками.
- Единый миксин `disabled` с учётом `aria-disabled`.
- Из 100+ используемых `--cs-*` не определено только одно (`--cs-on-surface-container`, задача в `TASKS-BUTTON.md`).

## Порядок работ

1. [x] P1: фокус ссылок и контролов, `forced-colors` — `/impeccable harden`.
2. [x] P1: граница полей и `light-outline` в `$mint` — `/impeccable polish scss/components/_inputs.scss`.
3. [x] P2: дополнить пресеты палитр — `/impeccable colorize`.
4. [x] P2: RTL, перенос навигации, вместе с touch-target из `TASKS-BUTTON.md` — `/impeccable adapt`.
5. [x] P2: progress при reduced-motion — `/impeccable animate scss/components/_progress.scss`.
6. [x] P3 и финальный проход — `/impeccable polish`.
7. [ ] Повторить `/impeccable audit`.
