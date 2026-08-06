# OneTutor design system — implementation checklist

This file tracks the **premium UI** token model: **no flat neutrals**; brand **temperature** runs through surfaces, borders, text tiers, and shadows (see article: tinted neutrals, brand-hued shadows, cool text hierarchy).

**Default theme:** `<html data-theme="cool">` (indigo `#4233e4`). Source of truth: `design-system.css`.

---

## Completed (this repo)

- [x] **Surfaces** — `--color-bg-canvas`, `--color-bg-surface`, `--color-bg-subtle` (tinted, not `#FFF` / `#F8F8F8`).
- [x] **Text hierarchy** — `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`; aliases `--color-text`, `--color-text-2`.
- [x] **Borders** — `--color-border-default`, `--color-border-muted`, `--color-border-strong`.
- [x] **Brand subtle** — `--color-brand-subtle` (+ `color-mix` in `@supports`); legacy `--onetutor-brand-subtle`.
- [x] **Shadow scale** — `--shadow-sm`, `--shadow-md`, `--shadow-lg`; `--shadow-card` → `var(--shadow-md)` (back-compat). All use `rgba(var(--color-brand-rgb), …)`, not `rgba(0,0,0,…)`.
- [x] **Cards** — `.ot-card-surface` uses `--shadow-md`; expanded analytics uses `--shadow-lg`.
- [x] **Small UI** — toggle knob uses `--shadow-sm`.
- [x] **Hover** — `--color-hover-overlay` (brand + surface mix); no flat grey overlays in tokens.
- [x] **Meta / captions** — `.ot-meta-muted` → `--color-text-muted`.
- [x] **Charts** — Chart.js reads `--color-text-muted`, `--color-text-primary`, borders, surface from CSS.
- [x] **No orphan hex** — analytics radial ring/stat use `--color-brand-rgb` / `--color-accent-primary` via `.ot-analytics-radial-*`.
- [x] **Badge utility** — `.ot-badge-brand` for brand-tint chips.
- [x] **Theme hook** — `data-theme="cool"` on `<html>` for future warm/dark.

---

## QA before ship

- [ ] **Greyscale test** — Desaturate the page; hierarchy should still read (temperature must not *replace* contrast).
- [ ] **WCAG spot-check** — Primary / secondary / muted on canvas & surface at body sizes.
- [ ] **Grep audit** — No new `rgba(0,0,0`, `#ffffff`, `#000000` in project-owned CSS for chrome (exceptions: true white on primary buttons via `--color-text-on-primary`).

---

## Backlog (optional)

- [ ] **Dark mode** — `[data-theme="dark"]`: tinted dark surfaces, shadows as soft glows + hairline, cool text tiers.
- [ ] **Warm theme** — `[data-theme="warm"]` duplicate ramp + warm `--color-brand-rgb` for shadows.
- [ ] **Replace remaining Tailwind arbitrary colors** — Prefer `var(--…)` in `index.html` where practical.

---

## Token quick reference

| Role | Token |
|------|--------|
| Page background | `--color-bg-canvas` (almost white; lighter than surface) |
| Cards **and** sidebar rail | **Same** `--color-bg-surface` — cards add border + shadow |
| Elevated wash | `--color-bg-subtle` |
| Primary / secondary / muted text | `--color-text-primary`, `--color-text-secondary`, `--color-text-muted` |
| Brand fill for chips | `--color-brand-subtle` |
| Elevation | `--shadow-sm` / `--shadow-md` / `--shadow-lg` |

---

## Spacing, radius, layout, motion (tokens)

| Category | Tokens |
|----------|--------|
| **Spacing (8px grid)** | `--space-1` (4px) … `--space-14` (56px): `--space-2` 8px, `--space-3` 12px, `--space-4` 16px, `--space-6` 24px, `--space-8` 32px, `--space-10` 40px, `--space-12` 48px |
| **Radius** | `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (16px), `--radius-pill` (9999px), `--radius-card` → `--radius-md` |
| **Layout** | `--layout-max-width` (1280px), `--layout-content-max` (1028px), `--layout-gutter`, `--layout-section-gap`, `--layout-section-gap-lg`, `--layout-top-insights-col-right` |
| **Motion** | `--motion-fast` / `--motion-base` / `--motion-slow`, `--ease-standard`, `--ease-emphasized`, `--hover-fade-duration`, `--ease-hover-fade` |
| **Focus** | `--color-focus-ring` (rgba); focus-visible uses `outline: 2px solid var(--color-accent-primary)` on interactive primitives (see `design-system.css`) |
| **Icons** | `--icon-stroke-default`, `--icon-stroke-analytics` (stroke width on Lucide SVGs where applied) |
| **Hover (shared)** | `--hover-surface`, `--hover-fg`, `--hover-border-strong`; modes: `.ot-hover-mode--interactive`, `.ot-hover-mode--object` / `.ot-card-hover` (see `COMPONENT_FOUNDATION.md`) |

---

## Typography tokens → utility classes

| CSS variable | Size | Utility classes (use in markup) |
|--------------|------|----------------------------------|
| `--type-heading-1` | 40px | `.ot-h1` |
| `--type-heading-2` | 32px | `.ot-h2`, `.ot-page-title`, `.ot-section-title` |
| `--type-heading-3` | 24px | `.ot-h3`, `.ot-card-title` |
| `--type-heading-4` | 20px | `.ot-h4`, `.ot-card-title-compact` |
| `--type-body-lg` | 22px | `.ot-course-instructor-name` |
| `--type-body-md` | 16px | `.ot-body-regular`, `.ot-course-instructor-desc` |
| `--type-body-sm` | 14px | `.ot-body-small` |
| `--type-body-xs` | 12px | `.ot-body-tiny` |

Source: `:root` + “Text styles” block in `design-system.css` (Figma typography node noted in file).

---

## Reusable surfaces & objects (CSS classes)

Documented in detail in **`COMPONENT_FOUNDATION.md`** (Figma nodes, sizes). Implemented in `design-system.css`:

| Pattern | Class(es) |
|---------|-----------|
| Primary layout | `.ot-main`, `.ot-shell`, `.ot-section`, `.ot-section--first`, `.ot-page-header-grid`, `.ot-top-insights-grid` |
| Cards / panels | `.ot-card-surface`, `.ot-solid-surface`, `.ot-bordered-surface-hover`, `.analytics-expanded-card` |
| Rails (carousels) | `.ot-rail`, `.ot-rail-fade`, `.ot-rail-arrow` |
| Buttons | `.ot-btn-primary`, `.ot-btn-secondary`, `.ot-btn-secondary--pill` |
| Chat | `.ot-chat-composer`, `.ot-chat-input`, `.ot-chat-prompt-bubble`, `.ot-chat-history-pill`, `.ot-chat-icon-btn` (send: Lucide `circle-arrow-up`, filled + ring in CSS `#chat-send`) |
| Navigation / chrome | `.ot-breadcrumb`, `.ot-breadcrumb-back`, `.ot-icon-circle--*` |
| Section headers | `.ot-section-title`, `.ot-section-title-row` |
| Course header | `.ot-course-instructor`, `.ot-course-instructor-avatar`, `.ot-course-instructor-name`, `.ot-course-instructor-desc` |
| Analytics | `.ot-analytics-scope`, `.ot-analytics-radial-ring`, `.ot-analytics-radial-stat`, `.ot-analytics-feature-link`, `.analytics-chart-canvas-wrap`, `.analytics-radial` |
| Misc | `.ot-toggle`, `.ot-upload-row`, `.ot-badge-brand`, `.ot-meta` / `.ot-meta-muted`, `.ot-pill` / `.ot-pill--file`, `.ot-thin-arrow` |
