# Стандарты headless UI-библиотек

**Официального стандарта нет**, но сформировался набор **де-факто соглашений**, которые используют большинство популярных headless UI-библиотек.

---

**1. Общие принципы**

Все headless UI-библиотеки следуют общей парадигме:

- **Не поставляют стили** — только поведение и доступность (ARIA, клавиатура, фокус).
- **Экспортируют состояния через `data-` атрибуты** — CSS стилизует на их основе.
- **Управляют ARIA-атрибутами** — `aria-expanded`, `aria-pressed`, `aria-selected` и т.д.
- **Управляют фокусом и клавиатурной навигацией** — Tab, Escape, стрелки.

---

**2. Сравнение data-атрибутов по библиотекам**

| Состояние | React Aria | Headless UI (Tailwind) | Radix UI | Base UI |
|---|---|---|---|---|
| Открыто | `data-open` | `data-open` | `data-state="open"` | `data-open` / `data-state="open"` |
| Закрыто | — | — | `data-state="closed"` | `data-closed` / `data-state="closed"` |
| Наведение | `data-hovered` | `data-hover` | — | — |
| Фокус | `data-focused` | `data-focus` | — | — |
| Focus-visible | `data-focus-visible` | — | — | — |
| Нажато | `data-pressed` | `data-active` | — | — |
| Активно | `data-active` | `data-active` | — | — |
| Выбрано | `data-selected` | — | `data-state="checked"` | `data-checked` |
| Отключено | `data-disabled` | — | `data-disabled` | `data-disabled` |
| Неверно | `data-invalid` | `data-invalid` | — | — |
| Разворачивается | `data-entering` | — | — | — |
| Сворачивается | `data-exiting` | — | — | — |
| Плейсхолдер | — | `data-placeholder` | `data-placeholder` | `data-placeholder` |
| Ориентация | — | — | `data-orientation` | — |
| Расположение | — | — | `data-side`, `data-align` | — |

---

**3. Ключевые различия**

**Именование состояний**

**React Aria** использует полные причастия:
- `data-hovered`, `data-focused`, `data-pressed`, `data-selected`

**Headless UI** использует короткие формы:
- `data-hover`, `data-focus`, `data-active`

**Radix UI** использует универсальный `data-state`:
- `data-state="open"`, `data-state="closed"`, `data-state="checked"`, `data-state="unchecked"`

**Base UI** (от создателей Radix) добавляет прямые атрибуты:
- `data-open`, `data-closed`, `data-checked` — проще для CSS-селекторов

**Анимации входа/выхода**

| Библиотека | Вход | Выход |
|---|---|---|
| React Aria | `data-entering` | `data-exiting` |
| Radix / Base UI | `forceMount` / `keepMounted` prop | — |
| Headless UI | Transition-компоненты | Transition-компоненты |

**Позиционирование**

**Radix / Base UI** экспортируют геометрию:
- `data-side="top"`, `data-side="bottom"`
- `data-align="start"`, `data-align="end"`
- CSS-переменные: `--available-height`, `--anchor-width`

---

**4. ARIA-атрибуты (общие для всех)**

Все библиотеки корректно управляют ARIA-атрибутами:

| Компонент | ARIA-атрибут |
|---|---|
| Dialog, Popover, Menu | `aria-expanded`, `aria-haspopup` |
| Checkbox, Switch | `aria-checked="true" / "false" / "mixed"` |
| Radio | `aria-checked="true" / "false"` |
| Tab | `aria-selected`, `aria-controls` |
| Accordion | `aria-expanded` |
| Combobox | `aria-expanded`, `aria-activedescendant` |
| Alert | `role="alert"` |
| Status | `role="status"` |

---

**5. Де-факто стандарты**

**Состояния взаимодействия (Interaction States)**

Формируется консенсус вокруг этих атрибутов:

| Атрибут | Назначение |
|---|---|
| `data-hovered` / `data-hover` | Курсор над элементом |
| `data-focused` / `data-focus` | Фокус (клавиатура или мышь) |
| `data-focus-visible` | Фокус с клавиатуры (аналог `:focus-visible`) |
| `data-pressed` / `data-active` | Кнопка нажата |
| `data-disabled` | Элемент отключён |
| `data-selected` / `data-checked` | Элемент выбран |

**Состояния компонентов (Component States)**

| Атрибут | Назначение |
|---|---|
| `data-open` | Диалог, меню, попап открыт |
| `data-closed` | Диалог, меню, попап закрыт |
| `data-expanded` | Аккордеон, таб раскрыт |
| `data-entering` | Анимация входа |
| `data-exiting` | Анимация выхода |

**Геометрия (Positioning)**

| Атрибут | Назначение |
|---|---|
| `data-side="top\|right\|bottom\|left"` | Сторона позиционирования |
| `data-align="start\|center\|end"` | Выравнивание |
| `data-orientation="horizontal\|vertical"` | Ориентация |

---

**6. Рекомендации для `cs-styles`**

Ваш проект уже использует миксины, объединяющие псевдоклассы и data-атрибуты:

```scss
@mixin hover {
  @media (hover: hover) { &:hover { @content; } }
  &[data-hovered] { @content; }
}
```

**Рекомендуемый подход — поддерживать оба варианта именования:**

```scss
/* Поддержка React Aria + Headless UI */
@mixin hover {
  @media (hover: hover) { &:hover { @content; } }
  &[data-hovered],
  &[data-hover] { @content; }
}

@mixin focus {
  @media (hover: hover) { &:focus { @content; } }
  &[data-focused],
  &[data-focus] { @content; }
}

@mixin pressed {
  @media (hover: hover) { &:active { @content; } }
  &[data-pressed],
  &[data-active] { @content; }
}

/* Поддержка Radix + Base UI */
[data-state="open"] { /* стили открытого состояния */ }
[data-open] { /* стили открытого состояния */ }
```

**Приоритет именования для вашего проекта:**

1. `data-hovered` — предпочтительно (React Aria, более читаемо)
2. `data-focused` — предпочтительно (React Aria)
3. `data-pressed` — предпочтительно (React Aria)
4. `data-open` / `data-closed` — предпочтительно (Base UI, проще селекторы)
5. `data-state="open"` — для совместимости с Radix

---

**7. Итог**

| Что | Статус |
|---|---|
| Официальный стандарт | ❌ Не существует |
| Де-факто соглашения | ✅ Формируются вокруг `data-` атрибутов |
| Наибольшее влияние | React Aria (Adobe), Radix UI, Base UI |
| Рекомендация | Поддерживайте оба варианта именования в миксинах |
| ARIA-атрибуты | ✅ Все библиотеки следуют WAI-ARIA спецификации |

**Кратко:** единого стандарта нет, но `data-hovered`, `data-focused`, `data-pressed`, `data-open`, `data-disabled` стали де-факто нормой. Ваш проект уже на правильном пути с миксинами — достаточно добавить поддержку альтернативных названий для максимальной совместимости.

