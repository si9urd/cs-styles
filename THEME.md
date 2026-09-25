# Material Design 3 — назначение цветовых ролей

Тема генерируется из Material Theme JSON (`m3theme-loader.js`, `npm run theme`) в
`scss/themes/_themes_colors.scss` как карта `$theme-colors` с ключами `light-*`/`dark-*`.
`scss/themes/_colors.scss` разворачивает их в CSS custom properties `--cs-{role}`
под `:not([data-theme="dark"])` / `[data-theme="dark"]`. Сам смысл ролей ниже проект
не переопределяет — только транспортирует палитру в CSS.

Ниже — текущие значения из `_themes_colors.scss` (сид-цвет `#415F91`). При
регенерации темы (`npm run generate-theme` + `npm run theme`) HEX поменяются,
роли — нет.

MD3 строит палитру не как набор цветов, а как систему **ролей**: каждая роль имеет
фиксированное назначение в UI, а конкретный HEX под ней меняется между
light/dark темами и между сид-цветами.

## 1. Accent-тройки: primary / secondary / tertiary

Каждая — 4 роли по одной схеме `X`, `on-X`, `X-container`, `on-X-container`:

| Роль | Light | Dark | Назначение |
|---|---|---|---|
| `primary` | ![#415F91](https://img.shields.io/badge/-%23415F91-415F91.svg?style=flat-square) | ![#AAC7FF](https://img.shields.io/badge/-%23AAC7FF-AAC7FF.svg?style=flat-square) | Самый заметный акцент. Заливка главных кнопок, активных состояний, FAB, выделенных элементов навигации |
| `on-primary` | ![#FFFFFF](https://img.shields.io/badge/-%23FFFFFF-FFFFFF.svg?style=flat-square) | ![#0A305F](https://img.shields.io/badge/-%230A305F-0A305F.svg?style=flat-square) | Текст/иконка поверх заливки `primary` — гарантированно контрастный |
| `primary-container` | ![#D6E3FF](https://img.shields.io/badge/-%23D6E3FF-D6E3FF.svg?style=flat-square) | ![#284777](https://img.shields.io/badge/-%23284777-284777.svg?style=flat-square) | Приглушённая версия акцента — контейнер выбранного чипа, фон FAB, контейнер выбранной вкладки |
| `on-primary-container` | ![#001B3E](https://img.shields.io/badge/-%23001B3E-001B3E.svg?style=flat-square) | ![#D6E3FF](https://img.shields.io/badge/-%23D6E3FF-D6E3FF.svg?style=flat-square) | Текст/иконка поверх `primary-container` |
| `secondary` | ![#565F71](https://img.shields.io/badge/-%23565F71-565F71.svg?style=flat-square) | ![#BEC6DC](https://img.shields.io/badge/-%23BEC6DC-BEC6DC.svg?style=flat-square) | Второстепенный акцент — фильтры, второстепенные кнопки, менее важные бейджи |
| `on-secondary` | ![#FFFFFF](https://img.shields.io/badge/-%23FFFFFF-FFFFFF.svg?style=flat-square) | ![#283141](https://img.shields.io/badge/-%23283141-283141.svg?style=flat-square) | Текст/иконка поверх `secondary` |
| `secondary-container` | ![#DAE2F9](https://img.shields.io/badge/-%23DAE2F9-DAE2F9.svg?style=flat-square) | ![#3E4759](https://img.shields.io/badge/-%233E4759-3E4759.svg?style=flat-square) | Приглушённая версия secondary |
| `on-secondary-container` | ![#131C2B](https://img.shields.io/badge/-%23131C2B-131C2B.svg?style=flat-square) | ![#DAE2F9](https://img.shields.io/badge/-%23DAE2F9-DAE2F9.svg?style=flat-square) | Текст/иконка поверх `secondary-container` |
| `tertiary` | ![#705575](https://img.shields.io/badge/-%23705575-705575.svg?style=flat-square) | ![#DDBCE0](https://img.shields.io/badge/-%23DDBCE0-DDBCE0.svg?style=flat-square) | Третий, контрастный акцент — визуальный баланс или спец-акценты (статус, выделенная дата) |
| `on-tertiary` | ![#FFFFFF](https://img.shields.io/badge/-%23FFFFFF-FFFFFF.svg?style=flat-square) | ![#3F2844](https://img.shields.io/badge/-%233F2844-3F2844.svg?style=flat-square) | Текст/иконка поверх `tertiary` |
| `tertiary-container` | ![#FAD8FD](https://img.shields.io/badge/-%23FAD8FD-FAD8FD.svg?style=flat-square) | ![#573E5C](https://img.shields.io/badge/-%23573E5C-573E5C.svg?style=flat-square) | Приглушённая версия tertiary |
| `on-tertiary-container` | ![#28132E](https://img.shields.io/badge/-%2328132E-28132E.svg?style=flat-square) | ![#FAD8FD](https://img.shields.io/badge/-%23FAD8FD-FAD8FD.svg?style=flat-square) | Текст/иконка поверх `tertiary-container` |

Три акцента, а не один: primary — «бренд/CTA», secondary — «поддерживающий UI»,
tertiary — «контрастный штрих», чтобы интерфейс не был монохромным при большом
числе primary-элементов.

## 2. Error

| Роль | Light | Dark | Назначение |
|---|---|---|---|
| `error` | ![#BA1A1A](https://img.shields.io/badge/-%23BA1A1A-BA1A1A.svg?style=flat-square) | ![#FFB4AB](https://img.shields.io/badge/-%23FFB4AB-FFB4AB.svg?style=flat-square) | Невалидные поля форм, деструктивные действия, сообщения об ошибках |
| `on-error` | ![#FFFFFF](https://img.shields.io/badge/-%23FFFFFF-FFFFFF.svg?style=flat-square) | ![#690005](https://img.shields.io/badge/-%23690005-690005.svg?style=flat-square) | Текст/иконка поверх `error` |
| `error-container` | ![#FFDAD6](https://img.shields.io/badge/-%23FFDAD6-FFDAD6.svg?style=flat-square) | ![#93000A](https://img.shields.io/badge/-%2393000A-93000A.svg?style=flat-square) | Приглушённая версия error (фон блока ошибки) |
| `on-error-container` | ![#410002](https://img.shields.io/badge/-%23410002-410002.svg?style=flat-square) | ![#FFDAD6](https://img.shields.io/badge/-%23FFDAD6-FFDAD6.svg?style=flat-square) | Текст/иконка поверх `error-container` |

Семантика зафиксирована на «красный» и не перекрашивается темой (кроме
инверсии light/dark).

## 3. Surface-группа — фон и «приподнятость»

MD3 заменяет box-shadow-слои elevation тональным сдвигом поверхности: чем «выше»
компонент, тем светлее (в light-теме) его surface-container.

| Роль | Light | Dark | Назначение |
|---|---|---|---|
| `background` | ![#F9F9FF](https://img.shields.io/badge/-%23F9F9FF-F9F9FF.svg?style=flat-square) | ![#111318](https://img.shields.io/badge/-%23111318-111318.svg?style=flat-square) | Базовый фон экрана целиком |
| `on-background` | ![#191C20](https://img.shields.io/badge/-%23191C20-191C20.svg?style=flat-square) | ![#E2E2E9](https://img.shields.io/badge/-%23E2E2E9-E2E2E9.svg?style=flat-square) | Текст/иконка поверх `background` |
| `surface` | ![#F9F9FF](https://img.shields.io/badge/-%23F9F9FF-F9F9FF.svg?style=flat-square) | ![#111318](https://img.shields.io/badge/-%23111318-111318.svg?style=flat-square) | Дефолтная поверхность компонента (карточка, лист) |
| `on-surface` | ![#191C20](https://img.shields.io/badge/-%23191C20-191C20.svg?style=flat-square) | ![#E2E2E9](https://img.shields.io/badge/-%23E2E2E9-E2E2E9.svg?style=flat-square) | Текст/иконка поверх `surface` |
| `surface-variant` | ![#E0E2EC](https://img.shields.io/badge/-%23E0E2EC-E0E2EC.svg?style=flat-square) | ![#44474E](https://img.shields.io/badge/-%2344474E-44474E.svg?style=flat-square) | Альтернативная поверхность |
| `on-surface-variant` | ![#44474E](https://img.shields.io/badge/-%2344474E-44474E.svg?style=flat-square) | ![#C4C6D0](https://img.shields.io/badge/-%23C4C6D0-C4C6D0.svg?style=flat-square) | Менее важный текст/иконки на `surface-variant` (подписи, второстепенные лейблы) |
| `surface-dim` | ![#D9D9E0](https://img.shields.io/badge/-%23D9D9E0-D9D9E0.svg?style=flat-square) | ![#111318](https://img.shields.io/badge/-%23111318-111318.svg?style=flat-square) | Нижняя граница диапазона яркости поверхности |
| `surface-bright` | ![#F9F9FF](https://img.shields.io/badge/-%23F9F9FF-F9F9FF.svg?style=flat-square) | ![#37393E](https://img.shields.io/badge/-%2337393E-37393E.svg?style=flat-square) | Верхняя граница диапазона яркости поверхности |
| `surface-container-lowest` | ![#FFFFFF](https://img.shields.io/badge/-%23FFFFFF-FFFFFF.svg?style=flat-square) | ![#0C0E13](https://img.shields.io/badge/-%230C0E13-0C0E13.svg?style=flat-square) | Elevation 0 — фон под всем контентом |
| `surface-container-low` | ![#F3F3FA](https://img.shields.io/badge/-%23F3F3FA-F3F3FA.svg?style=flat-square) | ![#191C20](https://img.shields.io/badge/-%23191C20-191C20.svg?style=flat-square) | Слегка приподнятые элементы |
| `surface-container` | ![#EDEDF4](https://img.shields.io/badge/-%23EDEDF4-EDEDF4.svg?style=flat-square) | ![#1D2024](https://img.shields.io/badge/-%231D2024-1D2024.svg?style=flat-square) | Стандартный уровень для карточек |
| `surface-container-high` | ![#E7E8EE](https://img.shields.io/badge/-%23E7E8EE-E7E8EE.svg?style=flat-square) | ![#282A2F](https://img.shields.io/badge/-%23282A2F-282A2F.svg?style=flat-square) | Диалоги, меню, выпадающие списки |
| `surface-container-highest` | ![#E2E2E9](https://img.shields.io/badge/-%23E2E2E9-E2E2E9.svg?style=flat-square) | ![#33353A](https://img.shields.io/badge/-%2333353A-33353A.svg?style=flat-square) | Максимально приподнятые элементы (поверх диалогов) |

## 4. Outline

| Роль | Light | Dark | Назначение |
|---|---|---|---|
| `outline` | ![#74777F](https://img.shields.io/badge/-%2374777F-74777F.svg?style=flat-square) | ![#8E9099](https://img.shields.io/badge/-%238E9099-8E9099.svg?style=flat-square) | Границы с достаточным контрастом (обводка полей ввода, значимые разделители) |
| `outline-variant` | ![#C4C6D0](https://img.shields.io/badge/-%23C4C6D0-C4C6D0.svg?style=flat-square) | ![#44474E](https://img.shields.io/badge/-%2344474E-44474E.svg?style=flat-square) | Декоративные, низкоконтрастные границы |

## 5. Inverse — «перевёрнутые» поверхности

Для компонентов, которые должны выделяться на фоне текущей темы, будто они «из
другой темы» (snackbar/toast).

| Роль | Light | Dark | Назначение |
|---|---|---|---|
| `inverse-surface` | ![#2E3036](https://img.shields.io/badge/-%232E3036-2E3036.svg?style=flat-square) | ![#E2E2E9](https://img.shields.io/badge/-%23E2E2E9-E2E2E9.svg?style=flat-square) | Тёмный фон на светлой теме (и наоборот) |
| `inverse-on-surface` | ![#F0F0F7](https://img.shields.io/badge/-%23F0F0F7-F0F0F7.svg?style=flat-square) | ![#2E3036](https://img.shields.io/badge/-%232E3036-2E3036.svg?style=flat-square) | Текст/иконка поверх `inverse-surface` |
| `inverse-primary` | ![#AAC7FF](https://img.shields.io/badge/-%23AAC7FF-AAC7FF.svg?style=flat-square) | ![#415F91](https://img.shields.io/badge/-%23415F91-415F91.svg?style=flat-square) | Акцентный цвет, читаемый именно на `inverse-surface` (обычная `primary` там не даст контраста) |

## 6. Fixed — цвета, не зависящие от темы

Значения одинаковы в light и dark (намеренно) — элемент сохраняет один и тот же
акцент вне зависимости от темы: кастомная иллюстрация, брендовый баннер,
онбординг-карточка.

| Роль | HEX | Назначение |
|---|---|---|
| `primary-fixed` | ![#D6E3FF](https://img.shields.io/badge/-%23D6E3FF-D6E3FF.svg?style=flat-square) | Базовый фиксированный тон primary |
| `on-primary-fixed` | ![#001B3E](https://img.shields.io/badge/-%23001B3E-001B3E.svg?style=flat-square) | Текст/иконка поверх `primary-fixed` |
| `primary-fixed-dim` | ![#AAC7FF](https://img.shields.io/badge/-%23AAC7FF-AAC7FF.svg?style=flat-square) | Более тёмный вариант того же тона (hover/pressed) |
| `on-primary-fixed-variant` | ![#284777](https://img.shields.io/badge/-%23284777-284777.svg?style=flat-square) | Второстепенный текст поверх fixed-поверхности |
| `secondary-fixed` | ![#DAE2F9](https://img.shields.io/badge/-%23DAE2F9-DAE2F9.svg?style=flat-square) | Базовый фиксированный тон secondary |
| `on-secondary-fixed` | ![#131C2B](https://img.shields.io/badge/-%23131C2B-131C2B.svg?style=flat-square) | Текст/иконка поверх `secondary-fixed` |
| `secondary-fixed-dim` | ![#BEC6DC](https://img.shields.io/badge/-%23BEC6DC-BEC6DC.svg?style=flat-square) | Более тёмный вариант того же тона |
| `on-secondary-fixed-variant` | ![#3E4759](https://img.shields.io/badge/-%233E4759-3E4759.svg?style=flat-square) | Второстепенный текст поверх fixed-поверхности |
| `tertiary-fixed` | ![#FAD8FD](https://img.shields.io/badge/-%23FAD8FD-FAD8FD.svg?style=flat-square) | Базовый фиксированный тон tertiary |
| `on-tertiary-fixed` | ![#28132E](https://img.shields.io/badge/-%2328132E-28132E.svg?style=flat-square) | Текст/иконка поверх `tertiary-fixed` |
| `tertiary-fixed-dim` | ![#DDBCE0](https://img.shields.io/badge/-%23DDBCE0-DDBCE0.svg?style=flat-square) | Более тёмный вариант того же тона |
| `on-tertiary-fixed-variant` | ![#573E5C](https://img.shields.io/badge/-%23573E5C-573E5C.svg?style=flat-square) | Второстепенный текст поверх fixed-поверхности |

## 7. Служебные роли

| Роль | Light | Dark | Назначение |
|---|---|---|---|
| `surface-tint` | ![#415F91](https://img.shields.io/badge/-%23415F91-415F91.svg?style=flat-square) | ![#AAC7FF](https://img.shields.io/badge/-%23AAC7FF-AAC7FF.svg?style=flat-square) | Тон, подмешиваемый поверх surface для имитации elevation |
| `shadow` | ![#000000](https://img.shields.io/badge/-%23000000-000000.svg?style=flat-square) | ![#000000](https://img.shields.io/badge/-%23000000-000000.svg?style=flat-square) | Цвет теней |
| `scrim` | ![#000000](https://img.shields.io/badge/-%23000000-000000.svg?style=flat-square) | ![#000000](https://img.shields.io/badge/-%23000000-000000.svg?style=flat-square) | Затемнение подложки под модалками/шторками |

## Кастомные роли проекта (не из стандарта MD3)

Добавлены поверх сгенерированной M3-палитры в `_themes_colors.scss:103-116`:

| Роль | Light | Dark | Назначение |
|---|---|---|---|
| `success` | ![#279977](https://img.shields.io/badge/-%23279977-279977.svg?style=flat-square) | ![#16896a](https://img.shields.io/badge/-%2316896a-16896a.svg?style=flat-square) | Состояния успеха (нет в стандартной M3-схеме) |
| `base` | ![#FFFFFF](https://img.shields.io/badge/-%23FFFFFF-FFFFFF.svg?style=flat-square) | ![#000000](https://img.shields.io/badge/-%23000000-000000.svg?style=flat-square) | Абсолютный белый/чёрный, вне тональной палитры |
| `icon-color` | = `on-surface` | = `on-surface` | Алиас для цвета иконок по умолчанию |
| `icon-error` | = `error` | = `error` | Алиас для цвета иконок ошибки |
| `icon-success` | = `success` | = `success` | Алиас для цвета иконок успеха |

## Генерация новой палитры

Роли зафиксированы схемой M3, но конкретные значения меняются под бренд-цвет:

```bash
npm run generate-theme   # генерирует material-theme*.json из сид-хекса
npm run theme            # собирает scss/themes/_themes_colors.scss из JSON
```

`_themes_colors.scss` — сгенерированный файл, не редактировать вручную.
