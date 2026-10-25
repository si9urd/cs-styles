# Задачи по дизайну `cs-styles`: весь фреймворк

Источник: повторный `/impeccable audit` (2026-10-19), весь `scss/` кроме `vendor/`, плюс `dist/cs-styles.css`. Аудит статический: исходники, детектор и stylelint (чисто); в браузере не рендерилось, контраст сверен только с правилами `THEME-DESIGN.md`. Задачи по кнопкам ведутся в `TASKS-BUTTON.md` и здесь не повторяются.

## Оценка аудита

| # | Направление | Балл | Главная находка |
|---|---|---|---|
| 1 | Доступность | 3 | У строк `.menu` нет индикатора фокуса; бесконечные SVG-спиннеры игнорируют `prefers-reduced-motion` |
| 2 | Производительность | 4 | Только `transition: width` в `progress`, в пределах нормы |
| 3 | Адаптивность | 3 | `touch-target` есть у кнопок и переключателей, у ссылок навигации нет |
| 4 | Темизация | 4 | Хардкод только в `make-elevation(#000/#FFF)` и палитрах |
| 5 | Цельность реализации | 3 | Градиентный текст логотипа; лишний `!important` у `textarea` |
| **Итого** | | **17/20** | **Хорошо** (было 12/20) |

## P1 — до релиза

- [ ] **Нет индикатора фокуса у пунктов `.menu`** (`scss/components/_menu.scss:16–70`). Есть hover, active, disabled, selected, но ни одного `:focus-visible` / `[data-focused]`; при `tabindex` или `role="menuitem"` фокус с клавиатуры не виден. Нарушает WCAG 2.4.7 и правило проекта «visible focus». Добавить `&:is(:focus-visible, [data-focused]) { @include focus-ring(-2px); }` (отрицательный отступ: панель обрезается по краям) и проверить остальные компоненты по матрице hover/focus/active/disabled. Команда: `/impeccable harden`.

## P2 — следующий проход

- [x] **SVG-спиннеры крутятся бесконечно при `prefers-reduced-motion`** (`scss/settings/_icons.scss:21–22`, `ring-spinner`, `dots-spinner`; используются в `_loading.scss`). Внутри SVG `<style>` работает `@media (prefers-reduced-motion: reduce)`: остановить вращение, оставить статичный сегмент кольца (подобрать `stroke-dasharray`) и точки `r:3px`, чтобы состояние «занято» не пропало. Команда: `/impeccable animate`.
- [ ] **Градиентный текст логотипа без проверки контраста** (`scss/components/_logo.scss:9–12`). Градиент `primary` → `tertiary` при `color: transparent`; `tertiary` не входит в таблицу контраста `THEME-DESIGN.md`, на других пресетах может упасть ниже 3:1 (крупный текст). Либо `color: var(--cs-primary)` без градиента, либо добавить `tertiary` в таблицу и проверить все пресеты. Фолбэк для `forced-colors` уже есть. Команда: `/impeccable colorize`.
- [ ] **Нет расширения хит-зоны у ссылок навигации** (`scss/components/_link.scss`, `header nav a`). Высота мишени ~24 px; `touch-target` подключён к кнопкам и переключателям, к ссылкам нет (WCAG 2.5.8). Подключить `@include touch-target` к `header nav a`. Меню (строки 3rem) в порядке. Команда: `/impeccable adapt`.

## P3 — по возможности

- [x] **Лишний `!important` у `textarea`** (`scss/components/_inputs.scss:76`, `--height: calc(...) !important`). Мешает переопределить высоту из `utilities` и противоречит правилу «без `!important`». Убрать и проверить `npm run build && npm run check:diff`. Исключение для автозаполнения (`:144–145`) оправдано, оставить.
- [x] **Переходы кнопок, ссылок и полей не в `no-preference`** (`_button.scss:59–64`, `_link.scss:26–30`, `_inputs.scss:33–36`). Меняются цвета и тень, не движение, для WCAG допустимо; но ripple и progress уже обёрнуты, приёмы несогласованы. Привести к одному виду или зафиксировать решение в `docs/scss-conventions.md`.
- [x] **`transition: width` в `progress`** (`_progress.scss:37`). Layout-свойство, но на полосе малого размера и внутри `no-preference`; Gecko так не умеет. Оставить, добавив комментарий. Команда (по желанию): `/impeccable optimize`.

## Ложные срабатывания детектора

- `design-system-font-size` для `2.375rem`: это токен `$logo-font-size` (`settings/_index.scss:138`), а не значение шкалы типографики.

## Закрыто (аудит от первого прохода, 12/20)

- [x] Фокус у ссылок, checkbox, radio, switch и range; общий миксин `focus-ring`.
- [x] Граница полей на `--cs-outline`, `light-outline` в `$mint` ≥ 3:1.
- [x] `forced-colors` для полей, switch, checkbox.
- [x] Пресеты палитр дополнены недостающими ролями.
- [x] RTL: логические свойства в полях, группах, switch, меню.
- [x] Перенос навигации в header (`flex-wrap`).
- [x] Indeterminate progress при reduced-motion.
- [x] Мёртвые правила в `_aria.scss`, наследие IE, разнобой прозрачности в меню, `$logo-font-size` в rem.

## Системные выводы

- **Матрица состояний неполна только в `menu`**: остальные компоненты (`button`, `inputs`, `switches`, `link`, `range`) покрывают фокус; прогнать контрольный список по всем компонентам.
- **Движение учитывает `prefers-reduced-motion` в CSS, но не внутри data-URI иконок.**

## Что сохранить

- Нулевой хардкод цветов в компонентах, всё через `--cs-*`.
- Состояния по ARIA (`aria-busy`, `aria-invalid`, `aria-disabled`), а не классами.
- Общий `focus-ring`, поддержка `forced-colors`; hover только при `hover: hover`.
- Слои `@layer`, почти нет `!important`, stylelint чистый.
- `dist/cs-styles.min.css` около 60 КБ на полный набор.

## Порядок работ

1. [ ] P1: фокус `.menu` — `/impeccable harden`.
2. [ ] P2: reduced-motion в SVG-спиннерах — `/impeccable animate`.
3. [ ] P2: решение по градиенту логотипа — `/impeccable colorize`.
4. [ ] P2: `touch-target` для навигации — `/impeccable adapt`.
5. [x] P3 и финальный проход — `/impeccable polish`; затем `npm run build && npm run check:diff`.
6. [ ] Повторить `/impeccable audit`.
