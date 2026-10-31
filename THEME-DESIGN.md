# Theme design

Палитра — 5 оттенков бренд-цвета (hue 230), сам бренд и 3 системных цвета. Имена ролей взяты из M3, у каждой роли одно назначение. Пары цвет/фон задаются через `on-`: текст `on-X` кладётся на фон `X`, `on-surface` подходит и для `surface`, и для `surface-container`.

Значения лежат в `$theme-colors` (`scss/settings/_index.scss`) и выводятся как `--cs-<роль>` на `:root`, тёмная тема включается через `[data-theme="dark"]`.

## Роли

| Роль | Макет | Назначение | Контраст |
|---|---|---|---|
| `primary` | Brand | интерактив: ссылки, кнопки, отмеченные контролы, фокус, `accent-color`, выделение текста | ≥ 4.5:1 с `surface-container` |
| `on-primary` | Background | текст и иконки на `primary` | ≥ 4.5:1 с `primary` |
| `on-surface` | Text strong | основной текст: заголовки, тело, подписи полей | ≥ 4.5:1 |
| `on-surface-variant` | Text weak | вспомогательный текст, placeholder, иконки и иконочные кнопки, рамка radio/checkbox, бегунок switch | ≥ 4.5:1 |
| `outline` | Stroke strong | значимые рамки: поля, switch, обводка трека range/progress | ≥ 3:1 |
| `outline-variant` | Stroke weak | декоративные разделители: `hr`, разделитель в меню | декоративный |
| `surface-container` | Fill | вторичный фон: кнопка по умолчанию, меню, выключенное поле, треки | — |
| `surface` | Background | фон страницы и полей | — |
| `error` | Red | `aria-invalid="true"` | ≥ 4.5:1 с `surface` |
| `warning` | Amber | предупреждения (компоненты пока не используют) | ≥ 4.5:1 с `surface` |
| `success` | Green | `aria-invalid="false"` | ≥ 4.5:1 с `surface` |

## Light

| Роль | HSB | Цвет |
|---|---|---|
| `primary` | 230 65 85 | ![#4C63D9](https://img.shields.io/badge/-%234C63D9-4C63D9.svg?style=flat-square) |
| `on-primary` | 0 0 100 | ![#FFFFFF](https://img.shields.io/badge/-%23FFFFFF-FFFFFF.svg?style=flat-square) |
| `on-surface` | 230 57 24 | ![#1A203D](https://img.shields.io/badge/-%231A203D-1A203D.svg?style=flat-square) |
| `on-surface-variant` | 230 27 48 | ![#595F7A](https://img.shields.io/badge/-%23595F7A-595F7A.svg?style=flat-square) |
| `outline` | 230 23 65 | ![#8086A6](https://img.shields.io/badge/-%238086A6-8086A6.svg?style=flat-square) |
| `outline-variant` | 230 5 94 | ![#E4E6F0](https://img.shields.io/badge/-%23E4E6F0-E4E6F0.svg?style=flat-square) |
| `surface-container` | 230 2 98 | ![#F5F6FA](https://img.shields.io/badge/-%23F5F6FA-F5F6FA.svg?style=flat-square) |
| `surface` | 0 0 100 | ![#FFFFFF](https://img.shields.io/badge/-%23FFFFFF-FFFFFF.svg?style=flat-square) |
| `error` | 0 71 78 | ![#C73A3A](https://img.shields.io/badge/-%23C73A3A-C73A3A.svg?style=flat-square) |
| `warning` | 42 82 56 | ![#8F6C1A](https://img.shields.io/badge/-%238F6C1A-8F6C1A.svg?style=flat-square) |
| `success` | 162 95 48 | ![#067A58](https://img.shields.io/badge/-%23067A58-067A58.svg?style=flat-square) |

## Dark

| Роль | HSB | Цвет |
|---|---|---|
| `primary` | 230 40 99 | ![#97A8FC](https://img.shields.io/badge/-%2397A8FC-97A8FC.svg?style=flat-square) |
| `on-primary` | 230 30 10 | ![#12131A](https://img.shields.io/badge/-%2312131A-12131A.svg?style=flat-square) |
| `on-surface` | 230 0 100 | ![#FFFFFF](https://img.shields.io/badge/-%23FFFFFF-FFFFFF.svg?style=flat-square) |
| `on-surface-variant` | 230 5 85 | ![#CED0D9](https://img.shields.io/badge/-%23CED0D9-CED0D9.svg?style=flat-square) |
| `outline` | 230 10 65 | ![#9598A6](https://img.shields.io/badge/-%239598A6-9598A6.svg?style=flat-square) |
| `outline-variant` | 230 15 25 | ![#363840](https://img.shields.io/badge/-%23363840-363840.svg?style=flat-square) |
| `surface-container` | 230 20 15 | ![#1F2026](https://img.shields.io/badge/-%231F2026-1F2026.svg?style=flat-square) |
| `surface` | 230 30 10 | ![#12131A](https://img.shields.io/badge/-%2312131A-12131A.svg?style=flat-square) |
| `error` | 0 39 100 | ![#FF9C9C](https://img.shields.io/badge/-%23FF9C9C-FF9C9C.svg?style=flat-square) |
| `warning` | 42 50 88 | ![#E0BF70](https://img.shields.io/badge/-%23E0BF70-E0BF70.svg?style=flat-square) |
| `success` | 162 40 78 | ![#77C7AF](https://img.shields.io/badge/-%2377C7AF-77C7AF.svg?style=flat-square) |

## Тени

Два варианта (`scss/tokens/_shadows.scss`). Свет падает сверху, цвет тени — `on-surface` (Text strong), а не чёрный:

| Токен | Вид | Где |
|---|---|---|
| `--cs-shadow-raised` | маленькая и резкая, `0 1px 3px` | слегка приподнимает интерактивный элемент: кнопка при hover |
| `--cs-shadow-overlay` | большая и мягкая, `0 8px 1rem` | элементы, парящие над страницей: меню, диалоги, FAB |

## Своя палитра

Переопределите нужные роли в `with (...)`, остальные останутся по умолчанию:

```scss
@use "cs-styles/scss" with (
  $theme-colors: (
    light: (primary: #0C7A5F),
    dark: (primary: #70E0C4),
  ),
);
```

Новая роль (ключ, которого нет в палитре) тоже выводится как `--cs-<роль>`.
