# OneTutor Component Foundation Documentation

This documentation mirrors the foundation components used in the Figma file `OneTutor-Design-System` (implemented from node `2454:3701` and its component instances).

## Layout Structure

- **Page shell**: `Sidebar (232px)` + `Main content`.
- **Main content blocks**:
  - `Breadcrumb`
  - `Course header` (H1 + description + secondary actions)
  - `Chat panel` + `Analytics panel` (2-column block)
  - `Manage quizzes` (title + primary CTA + carousel cards)
  - `Upload materials` (consent row + upload CTA + carousel cards)

## Design Tokens

Source of truth: `design-system.css` (`:root`). Default theme: `<html data-theme="cool">`. Full checklist: `DESIGN_SYSTEM.md`.

### Core Colors (semantic)

- `--color-text-primary` / `--onetutor-text-main` / `--color-text`: `#10131f` (near-black, cool)
- `--color-text-secondary` / `--color-text-2`: `#5c6470` (body secondary, sidebar labels)
- `--color-text-muted`: `#7a8ba0` (captions / meta; charts)
- `--color-accent-primary` / `--onetutor-brand-primary`: `#4233e4`
- `--color-accent-muted` / `--onetutor-brand-accent`: `#a5b4fc`
- `--color-brand-subtle` / `--onetutor-brand-subtle`: brand tint for badges (see `.ot-badge-brand`)
- `--color-bg-canvas`: `#fcfcfd` (page — almost white, subtle cool)
- `--color-bg-surface`: `#fdfdff` (cards **and** `#sidebar` — identical token)
- `--color-bg-subtle` / `--onetutor-card-highlight`: `#f4f4f8`
- `--color-hover-overlay`: **4%** brand on surface (`color-mix` when supported)
- `--color-border-default` / `--color-border-muted` / `--color-border-strong`: `#e4e8f5` / `#d1d5e3` / `#c5c9d8`
- `--onetutor-card-fill-tint`: `--color-bg-canvas`
- `--onetutor-button-default`: `#1c1a28`
- `--onetutor-button-disabled`: `#a5b4fc`
- `--onetutor-level-easy` / `-medium` / `-hard`: `#10b981` / `#f97316` / `#8b5cf6`
- `--slate-200` / `--slate-500`: alias border default / text secondary
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg` (brand RGB); `--shadow-card` → `md`

### Typography

- **Figma reference node**: `2295:3303`
- **Heading family**: `Suisse Int'l` (Medium for headings), \(line-height: 1.2\)
  - `heading-1`: `40px`, `tracking: -1px`
  - `heading-2`: `32px`
  - `heading-3`: `24px`
  - `heading-4`: `20px`
  - `heading-5`: `14px`
- **Body family**: `Inter` (Regular)
  - `text-lg` (Large Text): `22px`
  - `text-md` (Regular Text): `16px`
  - `text-sm` (Small Text): `14px`
  - `text-xs` (Small Text): `12px`

Notes:
- This typography foundation differs from the course page composition (which uses larger hero sizing). When implementing app screens, treat the above as the **design-system type scale**, and layer page-level “hero” styles only where explicitly specified by a screen component.

### Surfaces & elevation

- **Cards** (`.ot-card-surface`): solid `--color-bg-surface`, border, **`--shadow-md`** (brand-temperature stack).
- **Expanded analytics** (`.analytics-expanded-card`): **`--shadow-lg`**.
- **Sidebar** (`#sidebar`): same `--color-bg-surface` as cards; no rail shadow.
- **Analytics chart well** (`.analytics-chart-canvas-wrap`): solid `--color-bg-surface`.
- **Compact analytics radial** (`.ot-analytics-radial-ring` / `.ot-analytics-radial-stat`): brand RGB / `--color-accent-primary` (no arbitrary hex).

## Foundation Components

### 1) Sidebar

- **Figma reference node**: `2330:1929`
- **Variants**:
  - `Expanded`: `232px` width, logo + labels visible, full `Courses` and `Tools` sections.
  - `Collapsed`: `106px` width, icon-only navigation, logo and text labels hidden.
- **Vertical sizing**: designed as a fixed-height rail (`1024px` in component variant context).
- **Padding behavior**:
  - Expanded: left-padding with content-aligned text labels.
  - Collapsed: centered icon rail with tighter horizontal spacing.
- **Border**: `1px solid var(--onetutor-card-border)`.
- **Surface**: `var(--color-bg-surface)` (solid; matches design system).
- **Interaction**: sidebar toggle switches expanded/collapsed state and controls visibility of:
  - logo
  - section headers (`Courses`, `Tools`)
  - all menu text labels (icons remain visible)
- **Logo implementation**:
  - Uses the Figma logo asset from node `2295:4807`.
  - Rendered at `84.687px x 23.634px` in expanded sidebar.
  - Icon/text color follows `var(--color-text-secondary)`.
- **Icons (shadcn)**:
  - shadcn uses **Lucide** icons. Sidebar icon mappings:
    - Create course: `plus`
    - All courses / Course items: `book-open`
    - Chat: `message-circle`
    - Quiz: `rocket`
    - Materials: `box`
    - Analytics: `activity`
    - Notifications: `bell`
    - Settings: `settings`
    - OneTutor Forum: `users`
    - Documentation: `file`
    - Feedback: `lightbulb`
    - Language: `globe`
    - Logout: `log-out`

### 2) Breadcrumb

- Left back action + breadcrumb items.
- Items: hover — primary text on the label; `--color-hover-overlay` only on the trailing chevron chip (like Back’s icon circle). Current segment has no chevron, so hover is primary text only; no static highlight pill on current.

### 3) Button-Secondary

- Border: `1px solid var(--onetutor-card-border)`.
- Height: `40px`.
- Text: `14px medium`.

### 4) Button-Primary

- Background: `var(--onetutor-button-default)` for enabled CTAs.
- Disabled state: `var(--onetutor-button-disabled)`.
- Height: `40px`.
- Text: white, `14px`.

### 5) Textfield (chat input style)

- Border: `1px solid var(--onetutor-brand-accent)`.
- Radius: `15px`.
- Placeholder/meta text uses `var(--onetutor-brand-accent)` and `12px`.
- Bottom action row includes info/edit/send controls.

### 6) Quiz Card

- Size: `232x192`.
- Border + solid surface + `--shadow-md`.
- Title uses display `20px`.
- Footer metadata:
  - `Questions: n`
  - category dots in `easy/medium/hard` token colors.

### 7) Material Card

- Size: `232x192`.
- Border + solid surface + `--shadow-md`.
- Footer metadata:
  - `Type: X`
  - quiz count marker using `var(--onetutor-brand-accent)`.

### 9) Descriptors & Pills

- **Figma reference section**: `2353:2454`
- **Quiz_Description**: `Questions: N` + category dots
  - Text style: `body-tiny` (`12px / 20px`)
  - Dot colors: `level-easy / level-medium / level-hard`
- **Material_Description**: `Type: X` + `• N quizzes`
  - Text style: `body-tiny` (`12px / 20px`)
- **Pill (base)**:
  - Size: `24px` height, `50px` radius, `12px` horizontal padding, `1px` border
  - Text style: `body-tiny` (`12px / 20px`)
- **Pill-Quiz_Type** (Exam / Practice / Assessment)
  - Border: `card-border` (`#CBD5E1`), background `white`
- **Pill-File_Type** (`.txt/.pdf/.vid/.img`)
  - Border: `file-text-pill_border` (`#93C5FD`)
  - Text: `file-text` (`#3B82F6`)

### 10) Quiz Card (Expanded)

- **Figma reference node**: `2339:3912`
- Size: `276x232`, radius `6px`, padding `24px`, border `card-border`
- Top row: title + `Pill-Quiz_Type`
- Middle: description blurb (body-tiny, `text-light`)
- Bottom: `Quiz_Description` + `Created DD.MM.YYYY` + action icons (edit / trash)

### 11) Material Card (Expanded)

- **Figma reference node**: `2339:3913`
- Size: `276x232`, radius `6px`, padding `24px`, border `card-border`, background `card-fill-tint`
- Top: `Pill-File_Type` (with icon variant) + title
- Bottom: `Material_Description` + `Uploaded DD.MM.YYYY` + action icons (edit / trash)

### 8) Upload Materials Row

- Border: `1px solid var(--onetutor-card-border)`.
- Includes consent toggle + disabled-by-default primary action.
- Action becomes enabled only when consent is checked.

## Interaction Model (implemented)

- **Analytics panel**: collapsible body with chevron state.
- **Chat panel**: edit/send/history actions display status feedback.
- **Quiz and Material carousels**: next-button horizontal shift loop.
- **Upload flow**: consent checkbox toggles button enabled/disabled visual state.

---

## Hover interaction modes (CSS)

Three behaviors share tokens `--hover-surface`, `--hover-fg`, `--hover-border-strong` (see `design-system.css` header comment):

| Mode | Class | Use |
|------|--------|-----|
| **Interactive** | `.ot-hover-mode--interactive` | Text links, breadcrumb items, section titles, chat history pills: hover shifts label/icon to brand (`--hover-fg`); circular icon chips get `--hover-surface` fill. |
| **Object / card** | `.ot-hover-mode--object` or `.ot-card-hover` | Carousel tiles (quiz/material): shadow + inset wash + border on hover. |
| **Surface** | (implicit on sidebar rows, etc.) | Full-area background wash — use `--hover-surface` in component rules. |

---

## Chat composer & send icon

- **Composer**: `.ot-chat-composer` — border states for hover / `:focus-within`; modifier `.ot-chat-composer--prompts-open` when example prompts are visible; `.ot-chat-composer--has-text` when the textarea has content.
- **Input**: `.ot-chat-input` (typically paired with `.ot-body-small` for placeholder/type scale).
- **Prompt chips**: `.ot-chat-prompt-bubble` — staggered entrance when panel opens; hover uses same timing as icon row.
- **Icon row**: `.ot-chat-icon-btn` — info/edit use secondary grey; **Send** (`#chat-send`) uses Lucide **`circle-arrow-up`**: filled circle (`fill` + `stroke` = `currentColor`), `paint-order: stroke fill`, arrow paths stroked with `--color-bg-surface` for contrast.

---

## Course instructor block

- **Figma**: `2459:6635` (`Course_Description`).
- **Classes**: `.ot-course-instructor` (flex row, 24px gap), `.ot-course-instructor-avatar` (40×40, pill clip), `.ot-course-instructor-name` (body-lg / 22px), `.ot-course-instructor-desc` (body-md, light weight).

---

## Documentation coverage

- **Token checklist** (color, shadow, surfaces, hover): `DESIGN_SYSTEM.md`.
- **Spacing, radius, layout, motion, typography map, class index table**: `DESIGN_SYSTEM.md` (sections *Spacing, radius…* and *Typography tokens → utility classes* and *Reusable surfaces & objects*).
- **This file** documents layout structure, Figma nodes, and named foundation components (sidebar, breadcrumb, buttons, cards, rails, upload, pills).

If you add a new reusable `.ot-*` block in `design-system.css`, add one row to the **Reusable surfaces & objects** table in `DESIGN_SYSTEM.md` and (when user-facing) a short subsection here.

