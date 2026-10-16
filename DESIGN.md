# Bricked UI — Complete Style Specification

A pixel-art, orange "brick" UI language. Flat colors, hard pixel steps, no rounded corners, no borders, no blur. Every size is a multiple of one pixel unit. This document is written so that a human or an AI can rebuild every component identically.

> **How to use this file with an AI:** paste the whole file and say: _"Build a `<Component>` in the Bricked UI style, in React + Tailwind (or plain CSS), following the spec exactly."_ Sections 1–5 are the rules; section 6 is the per-component spec; section 7 is the Tailwind port; section 8 is a checklist.

---

## 1. Design principles (the rules that make it look "Bricked")

1. **No border-radius, ever.** Corners are square, or cut with a pixel staircase.
2. **Two cut corners per surface:** top-right and bottom-left, made with `clip-path` as a 4-step staircase.
3. **No CSS borders and no blurred shadows.** Depth comes only from hard, zero-blur `inset` box-shadows (a "bevel").
4. **Raised vs sunken:**
   - **Raised** (buttons, selected items, cards, badges): shade on the **bottom/right** → `inset -Npx -Npx 0 shade`.
   - **Sunken** (inputs, tracks, empty slots): shade on the **top/left** → `inset Npx Npx 0 shade`.
   - **Dark surfaces** (alerts, toasts, stat, code, tooltip, menu): background `ink`, bevel `inset -Npx -Npx 0 #000`.
5. **Selected / active = brick orange:** orange face + brick pattern + raised bevel + `ink` text.
6. **Flat colors only.** The one exception is the slider fill (a hard-stop two-color gradient).
7. **Hard motion.** All animation uses `steps()` easing. No smooth `ease`, no CSS transitions.
8. **Everything snaps to the pixel unit** (`--px`). Heights, paddings, gaps, bevels, icon sizes are multiples of it.
9. **Text on orange is always `ink`** (`#2b1100`). Never white on orange.
10. **Focus rings are drawn _inside_** the element (inset shadow), because `clip-path` would clip a normal outline.
11. **Sentence case** for labels and buttons ("Lay brick", not "LAY BRICK").
12. **Pixel fonts for UI chrome, a readable pixel font for body text** (see §3).

---

## 2. Design tokens

### 2.1 Colors

| Token            | Hex                                            | Use                                                  |
| ---------------- | ---------------------------------------------- | ---------------------------------------------------- |
| `ink`            | `#2b1100`                                      | Text, dark surfaces, thumbs, focus rings on orange   |
| `shade`          | `#c25a00`                                      | Bevel shadow, sunken edges, connectors, switch track |
| `orange`         | `#ff8a1f`                                      | Main brand / selected face                           |
| `orange-hover`   | `#ff9a3d`                                      | Button / icon-button hover face                      |
| `field`          | `#fff6ea`                                      | Inputs, tracks, unselected cream surfaces            |
| `peach`          | `#ffd3a1`                                      | Card and modal background                            |
| `peach-deep`     | `#f1b97c`                                      | Inactive tab, inactive page button, skeleton         |
| `muted`          | `#9a6a3c`                                      | Placeholder, inactive text, todo step                |
| `deep-bevel`     | `#a24a00`                                      | Bevel on selected switch half, brick mortar          |
| `on-dark`        | `#ffd9b0`                                      | Body text on dark surfaces                           |
| `on-dark-accent` | `#ffb36b`                                      | Strings in code, dark badge text                     |
| `black-bevel`    | `#000000`                                      | Bevel shadow on dark surfaces                        |
| `heart`          | `#d63a1f`                                      | Liked heart + burst only                             |
| `overlay`        | `rgba(43,17,0,.72)`                            | Modal backdrop                                       |
| Disabled button  | face `#b98a5e`, shade `#8a6540`, ink `#4a3522` | Disabled state                                       |
| Page bg          | light `#efe2cf`, dark `#1c1410`                | Demo page background (follows system theme)          |

Dim star (unrated): `rgba(194,90,0,.35)`. Dim heart (unliked): `rgba(194,90,0,.5)`.

### 2.2 The pixel unit system

Define on every component root. Three sizes:

| Size             | `--px` (bevel/padding unit) | `--cut` (corner step) | `--brick` (brick tile unit) | `--icon` (icon pixel) | Font     |
| ---------------- | --------------------------- | --------------------- | --------------------------- | --------------------- | -------- |
| sm               | 4px                         | 1.5px                 | 2px                         | 3px                   | 11px     |
| **md (default)** | **6px**                     | **2px**               | **3px**                     | **4px**               | **14px** |
| lg               | 8px                         | 3px                   | 4px                         | 5px                   | 18px     |

Other surfaces use fixed steps: bevels of **3, 4 or 6px**, corner steps of **1px (small chips/tabs), 2px (inputs, most), 3px (card, modal, alert)**.

### 2.3 Typography

| Role                                                 | Font               | Size                                                                                                              |
| ---------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Buttons, labels, headers, badges, tabs, step numbers | **Press Start 2P** | 9–18px (button md 14px; labels 10px; card header 12px; table header 9px; badge 10px; stat value 24px; clock 20px) |
| Body text, inputs, list items, tooltips, alerts      | **VT323**          | 18–24px (body 20px; input 22px; counter 24px; tooltip 18px)                                                       |

Fallback: `ui-monospace, 'Courier New', monospace`. Load both from Google Fonts. Line-height `1` for buttons, `1.2` for body paragraphs, `1.4` for multi-line pixel-font headings.

### 2.4 Motion

- Easing is always `steps(n)`.
- Reduced-motion policy: turn off only idle decoration (skeleton pulse, caret blink). Keep loaders and click-triggered effects.
- No `transition`. Hover/active changes are instant.

---

## 3. Primitives (copy exactly)

### 3.1 Cut corners — `.bk-cut`

4-step staircase on the **top-right** and **bottom-left** corners. Default `--cut: 2px` (so each cut is 8px across).

```css
.bk-cut {
  --cut: 2px;
  clip-path: polygon(
    0 0,
    calc(100% - var(--cut) * 4) 0,
    calc(100% - var(--cut) * 4) var(--cut),
    calc(100% - var(--cut) * 3) var(--cut),
    calc(100% - var(--cut) * 3) calc(var(--cut) * 2),
    calc(100% - var(--cut) * 2) calc(var(--cut) * 2),
    calc(100% - var(--cut) * 2) calc(var(--cut) * 3),
    calc(100% - var(--cut)) calc(var(--cut) * 3),
    calc(100% - var(--cut)) calc(var(--cut) * 4),
    100% calc(var(--cut) * 4),
    100% 100%,
    calc(var(--cut) * 4) 100%,
    calc(var(--cut) * 4) calc(100% - var(--cut)),
    calc(var(--cut) * 3) calc(100% - var(--cut)),
    calc(var(--cut) * 3) calc(100% - var(--cut) * 2),
    calc(var(--cut) * 2) calc(100% - var(--cut) * 2),
    calc(var(--cut) * 2) calc(100% - var(--cut) * 3),
    var(--cut) calc(100% - var(--cut) * 3),
    var(--cut) calc(100% - var(--cut) * 4),
    0 calc(100% - var(--cut) * 4)
  );
}
```

**Consequence:** `clip-path` clips everything outside the box — outlines, drop shadows, and any absolutely-positioned child that overflows. So: tooltips, menus and bursts must sit _inside_ the parent box; modals must be rendered outside any clipped card; focus rings are inset.

### 3.2 Brick pattern

A 16×8 tile drawn as pixels: a mortar line at y=0 and y=4 (full width, 1 high), a vertical joint at x=0 for the top row (y 0–4) and x=8 for the bottom row (y 4–8). Mortar color `#a24a00` at 30% opacity. Used as a `background-image` on every orange surface.

```css
:root {
  --bricks: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 8' preserveAspectRatio='none' shape-rendering='crispEdges'%3E%3Cg fill='%23a24a00' fill-opacity='.3'%3E%3Crect width='16' height='1'/%3E%3Crect y='4' width='16' height='1'/%3E%3Crect width='1' height='4'/%3E%3Crect x='8' y='4' width='1' height='4'/%3E%3C/g%3E%3C/svg%3E");
}
.orange-brick {
  background-color: #ff8a1f;
  background-image: var(--bricks);
  background-size: 36px 18px; /* card header uses 48px 24px; button uses brick*16 × brick*8 */
  background-position: center;
  image-rendering: pixelated;
}
```

Tile size: **36×18px** on small/medium surfaces, **48×24px** on card headers, **`calc(var(--brick)*16) calc(var(--brick)*8)`** on buttons. Disabled buttons drop the pattern.

### 3.3 Bevel recipes

```css
/* raised (orange / field / peach): */
box-shadow: inset -4px -4px 0 #c25a00;
/* sunken (inputs, tracks, empty): */
box-shadow: inset 4px 4px 0 #c25a00;
/* dark surface: */
box-shadow: inset -4px -4px 0 #000;
/* pressed (button active): */
transform: translateY(var(--px));
box-shadow: inset var(--px) var(--px) 0 #c25a00;
/* focus ring (inside): */
box-shadow:
  inset 0 0 0 4px #ff8a1f,
  inset 4px 4px 0 4px #c25a00; /* inputs, checkbox, dropzone */
/* focus ring on orange face: */
box-shadow: inset 0 0 0 var(--px) #2b1100; /* buttons, tabs, pages, lists */
```

Bevel width: 3px (small items), 4px (most), 6px (card/modal).

### 3.4 Pixel icons

All icons are **7×7 grids** rendered as SVG `<rect>`s with `shape-rendering="crispEdges"`, filled `currentColor`. Rendered size = `7 × --icon`. In a button, icon color is `ink`. The registry ships 268 glyphs (plus brand marks at 16×16); `PixelIcon` additionally renders caller-supplied `PixelIconGrid` rows of any size, and every `icon` prop accepts `PixelIconInput` (name or grid).

```js
const ICONS = {
  play: [
    "1000000",
    "1100000",
    "1110000",
    "1111000",
    "1110000",
    "1100000",
    "1000000",
  ],
  plus: [
    "0001000",
    "0001000",
    "0001000",
    "1111111",
    "0001000",
    "0001000",
    "0001000",
  ],
  minus: [
    "0000000",
    "0000000",
    "0000000",
    "1111111",
    "0000000",
    "0000000",
    "0000000",
  ],
  check: [
    "0000001",
    "0000011",
    "0000110",
    "1001100",
    "1111000",
    "0110000",
    "0010000",
  ],
  arrow: [
    "0001000",
    "0001100",
    "1111110",
    "1111111",
    "1111110",
    "0001100",
    "0001000",
  ],
  heart: [
    "0110110",
    "1111111",
    "1111111",
    "0111110",
    "0011100",
    "0001000",
    "0000000",
  ],
  star: [
    "0001000",
    "0001000",
    "1111111",
    "0111110",
    "0011100",
    "0110110",
    "0100010",
  ],
  download: [
    "0001000",
    "0001000",
    "1001001",
    "0101010",
    "0011100",
    "0001000",
    "1111111",
  ],
  upload: [
    "0001000",
    "0011100",
    "0101010",
    "0001000",
    "0001000",
    "0001000",
    "1111111",
  ],
  home: [
    "0001000",
    "0011100",
    "0111110",
    "1111111",
    "0111110",
    "0110110",
    "0110110",
  ],
  rocket: [
    "0001000",
    "0011100",
    "0010100",
    "0011100",
    "0111110",
    "1101011",
    "0001000",
  ],
  cart: [
    "1100000",
    "0100000",
    "0111111",
    "0111110",
    "0011100",
    "0010010",
    "0000000",
  ],
  dot: [
    "0011100",
    "0111110",
    "1111111",
    "1111111",
    "1111111",
    "0111110",
    "0011100",
  ],
  down: [
    "0000000",
    "0000000",
    "1100011",
    "0110110",
    "0011100",
    "0001000",
    "0000000",
  ],
  right: [
    "0100000",
    "0010000",
    "0001000",
    "0000100",
    "0001000",
    "0010000",
    "0100000",
  ],
  left: [
    "0000010",
    "0000100",
    "0001000",
    "0010000",
    "0001000",
    "0000100",
    "0000010",
  ],
  alert: [
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0001000",
    "0000000",
    "0001000",
  ],
  close: [
    "1000001",
    "0100010",
    "0010100",
    "0001000",
    "0010100",
    "0100010",
    "1000001",
  ],
  user: [
    "0011100",
    "0111110",
    "0111110",
    "0011100",
    "0000000",
    "1111111",
    "1111111",
  ],
  search: [
    "0111000",
    "1000100",
    "1000100",
    "1000100",
    "0111010",
    "0000101",
    "0000010",
  ],
};
```

New icons must follow the same rules: 7×7, 1-pixel-thick strokes, symmetrical where natural, no anti-aliasing. Custom grids are rows of `0`/`1` (equal length recommended, any size); unknown names resolve to nothing.

---

## 4. Layout rules

- Demo page: centered column. Gallery = CSS grid, `repeat(auto-fit, minmax(300px, 1fr))`, `gap: 24px`, `width: min(100%, 880px)`.
- Every group of components lives in a **Card**.
- Rows: `display:flex; flex-wrap:wrap; align-items:center; gap:16px`. Stacks: `flex-direction:column; gap:16px`.
- Touch targets: nothing interactive is under 28px; main controls are 36–48px tall.
- Compensate for bevels: on raised cards, padding on the **bottom/right is larger** (e.g. `24px 30px 30px 24px`) so content looks centered inside the bevel.

---

## 5. Accessibility rules

- Real `<button>`, `<input>`, `<select>`, `<label>`; icons are `aria-hidden`.
- Custom controls get roles: `role="switch"` + `aria-checked`, `role="tablist/tab"` + `aria-selected`, `role="dialog"` + `aria-modal`, `role="progressbar"` + `aria-valuenow`, `role="tooltip"`, `role="status"`/`role="alert"`.
- Icon-only buttons need `aria-label`.
- Visible focus on every control (inset rings, §3.3). Native checkbox/radio inputs stay in the DOM, visually hidden but focusable.
- Modal closes on backdrop click and Esc. Menu closes on outside click and Esc.
- Contrast: `ink` on `orange`/`field`/`peach` passes; `muted` (#9a6a3c) is for secondary text only.

---

## 6. Component specs

Notation: **S** = surface/background, **B** = bevel, **Cut** = `--cut`, sizes in px. "bricks" means the §3.2 pattern at 36×18 unless stated.

### Actions

**Button** (`.bricked-btn`, sizes sm/md/lg)

- S: orange + bricks (tile `brick*16 × brick*8`), `ink` text, PS2P. B: `inset -px -px 0 shade`. Cut: 2px (sm 1.5, lg 3).
- Height: `min-height: px*8` (md 48). Padding: `0 px*7`. Gap: `px*2`. Display `inline-flex`, centered.
- Icon: optional, left or right, size from `--icon`. Icon-button and text-button have the same height.
- Hover: face → `#ff9a3d`. Active: `translateY(px)` + sunken bevel (`inset px px 0 shade`). Focus: `inset 0 0 0 px ink`.
- Disabled: face `#b98a5e`, shade `#8a6540`, text `#4a3522`, no brick pattern, `cursor:not-allowed`.

**Icon button**: 48×48, orange bricks, B `-4`, icon 4px unit, cut 2. Hover `#ff9a3d`, active `translateY(4px)`. Optional notification dot: 10×10 `ink` square at top 6 / left 6.

**Like button**: field surface, B `-4 shade`, padding `8px 16px 10px 12px`, PS2P 14, heart icon 5px unit (dim `rgba(194,90,0,.5)` → `#d63a1f` when on), count beside it. **No clip-path** (so the burst isn't clipped). Burst: four 6×6 `#d63a1f` squares flying diagonally 20px, `.5s steps(5)`, fade out.

### Containers

**Card**: S `peach`, B `-6 shade`, Cut 3. Header: orange + bricks (48×24), padding `14px 24px`, PS2P 12px. Body: padding `24px 30px 30px 24px`, gap 16.

**Modal**: fixed full-screen overlay `rgba(43,17,0,.72)`, padding 24, centered. Panel: `width:min(100%,420px)`, same look as Card (peach, B -6, Cut 3), header has a pixel close icon button. Render it **outside** any clipped card.

**Alert**: S `ink`, text `on-dark`, B `-6 #000`, Cut 3, padding `16px 24px 20px 20px`, icon `alert` 4px unit in orange, title PS2P 11px orange, text VT323.

**Toast**: S `ink`, B `-4 #000`, Cut 2, padding `8px 8px 10px 16px`, gap 12, orange check icon + text + orange close button. Auto-dismiss after 3s.

**Banner**: orange + bricks, B `-4 shade`, Cut 2, padding `10px 8px 12px 14px`, star icon + text + close.

**Stat card**: S `ink`, B `-4 #000`, Cut 2, padding `16px 20px 20px 16px`, label VT323 `on-dark`, value PS2P 24 orange, optional badge.

**Empty state**: S `field`, sunken `4`, Cut 2, padding `24px 20px 28px`, centered; icon 6px unit in `shade`, title PS2P 11, text VT323, optional action button.

**Divider**: row with PS2P 10 label; each side a 4px-high dashed pixel line: `repeating-linear-gradient(90deg, shade 0 4px, transparent 4px 8px)`.

**Code block**: S `ink`, B `-4 #000`, Cut 2, padding `14px 16px 18px`, VT323 18, `white-space:pre`, `overflow-x:auto`. Keywords orange, strings `#ffb36b`, other text `on-dark`.

**Table**: wrapper Cut 2, `field` bg, `overflow-x:auto`. Header cells: orange + bricks, PS2P 9, padding `10px 12px`. Body cells: padding `8px 12px`, `border-top: 4px solid peach`.

### Form controls

**Field wrapper**: column, gap 8. Label PS2P 10.

**Text input / textarea**: S `field`, sunken `4`, Cut 2, `min-height:48`, padding `10px 16px`, VT323 22, no border/radius. Placeholder `#9a6a3c`. Focus: orange ring + inner shade (§3.3). Textarea `min-height:96`, `resize:vertical`.

**Select**: a native `<select>` styled like the input (`appearance:none`, extra right padding 56) with the `down` icon (3px unit) absolutely positioned at right 16, vertically centered, non-interactive.

**Search**: input with extra left padding 52 and the `search` icon (3px unit, `shade`) at left 16.

**Checkbox**: 28×28 box, `field`, sunken 4, Cut 2. Checked: orange, raised bevel -4, `check` icon (3px unit, ink). Hidden native input sits on top. Focus: orange ring; checked + focus: ring in `shade`.

**Radio**: same 28×28 box but an octagon clip-path (4px steps); checked shows the `dot` icon.

**Switch (Off / On)**: not a sliding thumb. A track `shade` with two labels (PS2P 10): each half `min-width:48`, `height:32`, `padding:0 12px`. Inactive half: `field` text color, white on hover. Active half: `ink` text, orange + bricks, B `-3 #a24a00`. Track Cut 2. Focus: active half gets `inset 0 0 0 3px ink`. `role="switch"`.

**Slider**: input range, height 32, track `linear-gradient(90deg, orange var(--v), field var(--v))`, sunken 4, Cut 2. Thumb 20×24 `ink` with `inset -3 -3 0 #000`, no radius (webkit thumb `margin-top:4px`). Focus: `inset 0 0 0 4px ink`.

**Counter**: `−` and `+` buttons (36×36, like pagination buttons) around a 64×36 value box (VT323 24, `field`, sunken 4, Cut 2). Disabled at limits.

**Rating**: five `star` buttons (3px unit, padding 4, transparent). Off `rgba(194,90,0,.35)`, on `ink`.

**Dropzone**: `<label>` wrapping a hidden file input stretched over it. S `field`, sunken 4, Cut 2, padding 20, centered `upload` icon (5px unit, `shade`) + filename text. Focus-within: orange ring.

**Chips**: padding `2px 4px 6px 12px`, VT323 20, `field`, B `-3 shade`, Cut 1; remove button with a 2px-unit `close` icon.

**Keycap**: min-width 32, padding `6px 10px 10px`, PS2P 10, `field`, B `-4 shade`, Cut 1; "+" between keys.

### Selection & navigation

**Tabs**: tab height 36, padding `0 14`, PS2P 10, gap 4, Cut 1. Inactive `#f1b97c` + ink text. Selected: orange + bricks + B `-3 shade`. Panel: `field`, sunken 4, Cut 2, padding `16px 20px`.

**Accordion**: items gap 8. Header: full width, padding `12px 16px`, PS2P 10, `field`, B `-4 shade`, Cut 2, `down` icon (3px unit) at right. Open: header turns orange, icon rotates 180°. Body padding `4px 16px 8px`. One open at a time.

**Breadcrumbs**: row gap 8, `right` icon (2px unit, `shade`) between items. Links `ink`, underlined (offset 4). Current page: orange tag, padding `2px 10px 4px`, B `-3 shade`, Cut 1.

**Pagination**: 36×36 PS2P 10 buttons, gap 4, `#f1b97c`, Cut 1; current = orange + bricks + B `-3`. Prev/next use `left`/`right` icons (3px unit); disabled opacity .4.

**Stepper**: each step 48px wide; box 32×32 PS2P 10, Cut 2. Todo: `field`, sunken 4, label `muted`. Current: orange + bricks, B `-3`. Done: orange, B `-3`, `check` icon. Connectors: 4px high, `shade` at opacity .4 (1 when completed), `margin-top:14`.

**List group**: items gap 4; button full width, padding `8px 14px 10px`, VT323 20, `field`, B `-4 shade`, Cut 1; selected = orange + bricks.

**Dropdown menu**: trigger is a small button with `down` icon on the right. List: S `ink`, padding `6px 10px 10px 6px`, B `-4 #000`, Cut 2, opens at `top: calc(100% + 8px)`, `min-width:100%`. Items: padding `8px 14px`, VT323 18, `on-dark`; hover/focus → orange bg + ink text. Reserve space under the trigger (≈150px) so the card's clip-path doesn't cut the list.

**Tooltip**: bubble S `ink`, `on-dark` text, VT323 18, padding `6px 12px 8px`, Cut 1, positioned `bottom: calc(100% + 8px)`, centered, shown on hover or focus-within. Needs room above inside its card.

**Avatar**: 48×48, orange + bricks, B `-4`, Cut 2, PS2P 12 initials or `user` icon (4px unit). Dark variant: `ink` bg, `#ffb36b` text, B `-4 #000`. Gap 8 in a group.

**Badge**: padding `8px 12px`, PS2P 10, orange, B `-3 shade`, Cut 1. Dark variant: `ink`, `#ffb36b`, B `-3 #000`.

### Feedback & loading

**Progress bar**: height 32, padding 8, S `field`, sunken 4, Cut 2. Fill: orange + bricks, width = %, with a segment overlay `repeating-linear-gradient(90deg, transparent 0 10px, field 10px 12px)`.

**Health meter**: label PS2P 10 ("HP 7/10"). Ten segments, each flex:1, height 24, gap 2. Empty = `field` sunken 3; filled = orange, B `-3 shade`.

**Skeleton**: 48×48 box (Cut 2) + three 12px lines (100% / 80% / 55%), color `#f1b97c`, pulse `1s steps(2) infinite` (opacity .45 ↔ 1).

**Ring loader (blinking cubes)**: 3×3 grid, cells 12px, gap 3, eight cells placed clockwise at `[row,col]` = `[1,1] [1,2] [1,3] [2,3] [3,3] [3,2] [3,1] [2,1]`. Cell: orange, B `-3 shade`, base opacity .2. Animation `blink .8s steps(1) infinite`, keyframes `0% {opacity:1} 30% {opacity:.2}`, `animation-delay: i × 0.1s`. Label "Loading" beside it.

**Stacking-bricks loader**: 56×40 box. Three 28×14 bricks (orange + bricks, B `-3`) at `(0,26)`, `(28,26)`, `(14,12)`. Animation `drop 1.2s steps(6) infinite backwards`, delays 0 / .3 / .6s; keyframes `0% {translateY(-20px); opacity:0} 50%,100% {translateY(0); opacity:1}`.

### Data & time

**Calendar**: S `field`, sunken 4, Cut 2, padding `14px 16px 16px 14px`. Title PS2P 10. 7-column grid, gap 2; weekday letters PS2P 9 in `shade`; day buttons padding `4px 0 6px`, VT323 20, hover `#f1b97c`; selected day = orange + bricks + B `-3`.

**Timeline**: vertical list, gap 16. Marker 16×16 orange, B `-3`. Connector: 4px wide `shade` at .4 opacity, from marker bottom. Title PS2P 10, time VT323.

### Fun components

**Brick wall builder**: 4 rows × 6 bricks, each 34×16, gap 2; odd rows shifted right 18px; rows stack bottom-up (`flex-direction: column-reverse`). Empty = `field` sunken 3; laid = orange + bricks + B `-3` with `lay .25s steps(3)` (drops in from 14px above). "Lay brick" + "Reset" buttons; at 24 shows a "Wall done!" badge.

**Dice**: 72×72, orange + bricks, B `-4`, Cut 2, 3×3 grid with 10×10 `ink` pips (pip positions: 1:[4] 2:[0,8] 3:[0,4,8] 4:[0,2,6,8] 5:[0,2,4,6,8] 6:[0,2,3,5,6,8]). Roll = 8 random faces at 90ms.

**Typewriter**: VT323 22. One character per 60ms. Caret: 10×18 `ink` block, `blink 1s steps(1) infinite`.

**Launch pad**: sky box S `ink`, height 96, Cut 2, `overflow:hidden`; stars = 4×4 `on-dark` squares drawn with `box-shadow`. Rocket icon (5px unit, orange) sits bottom-center; on click it flies `translateY(-140px)` over `1.4s steps(14) forwards`, then resets after 1.5s.

**Ask the wall**: answer box S `ink`, B `-4 #000`, Cut 2, min-height 64, VT323 22, `on-dark` text. Random line from a list.

**Clock**: S `ink`, B `-4 #000`, Cut 2, padding `16px 20px 20px`, PS2P 20 orange, 24-hour `HH:MM:SS`, updates every second.

---

## 7. Tailwind CSS port

The first version was written as plain CSS in a single HTML file. Tailwind is a better fit for a shadcn-style library. The `clip-path` staircase, the brick data-URI and the bevel recipes are awkward as inline utilities, so register them once as **custom utilities** and keep the rest in normal Tailwind classes.

### 7.1 `globals.css` (Tailwind v4)

```css
@import "tailwindcss";

@theme {
  --color-ink: #2b1100;
  --color-shade: #c25a00;
  --color-brick: #ff8a1f;
  --color-brick-hover: #ff9a3d;
  --color-field: #fff6ea;
  --color-peach: #ffd3a1;
  --color-peach-deep: #f1b97c;
  --color-muted: #9a6a3c;
  --color-deep: #a24a00;
  --color-on-dark: #ffd9b0;
  --color-on-dark-accent: #ffb36b;
  --color-heart: #d63a1f;
  --font-pixel: "Press Start 2P", ui-monospace, "Courier New", monospace;
  --font-body: "VT323", ui-monospace, "Courier New", monospace;
  --radius-*: initial; /* no border radius anywhere */
  --shadow-*: initial; /* only inset bevels, defined below */
}

:root {
  --bricks: url("data:image/svg+xml,..."); /* the full URL from §3.2 */
}

@utility bk-cut {
  --cut: 2px;
  clip-path: polygon(/* the 20-point polygon from §3.1 */);
}
@utility bk-bricks {
  background-color: var(--color-brick);
  background-image: var(--bricks);
  background-size: 36px 18px;
  background-position: center;
  image-rendering: pixelated;
}
@utility bk-raised {
  box-shadow: inset -4px -4px 0 var(--color-shade);
}
@utility bk-sunken {
  box-shadow: inset 4px 4px 0 var(--color-shade);
}
@utility bk-dark {
  background-color: var(--color-ink);
  color: var(--color-on-dark);
  box-shadow: inset -4px -4px 0 #000;
}
@utility bk-focus {
  &:focus-visible {
    outline: none;
    box-shadow:
      inset 0 0 0 4px var(--color-brick),
      inset 4px 4px 0 4px var(--color-shade);
  }
}
```

Per-size variables (`--px`, `--cut`, `--brick`, `--icon`) are set with arbitrary-property classes: `[--px:6px] [--cut:2px]`.

### 7.2 Example: Button with `cva` (shadcn-style)

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "bk-cut bk-bricks inline-flex items-center justify-center font-pixel text-ink " +
    "cursor-pointer select-none rounded-none border-0 leading-none " +
    "shadow-[inset_calc(var(--px)*-1)_calc(var(--px)*-1)_0_var(--color-shade)] " +
    "min-h-[calc(var(--px)*8)] px-[calc(var(--px)*7)] gap-[calc(var(--px)*2)] " +
    "hover:not-disabled:bg-brick-hover " +
    "active:not-disabled:translate-y-[var(--px)] active:not-disabled:shadow-[inset_var(--px)_var(--px)_0_var(--color-shade)] " +
    "focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_var(--px)_var(--color-ink)] " +
    "disabled:cursor-not-allowed disabled:bg-[#b98a5e] disabled:bg-none disabled:text-[#4a3522] " +
    "disabled:shadow-[inset_calc(var(--px)*-1)_calc(var(--px)*-1)_0_#8a6540]",
  {
    variants: {
      size: {
        sm: "[--px:4px] [--cut:1.5px] [--icon:3px] text-[11px]",
        md: "[--px:6px] [--cut:2px]   [--icon:4px] text-[14px]",
        lg: "[--px:8px] [--cut:3px]   [--icon:5px] text-[18px]",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export function Button({
  className,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof button>) {
  return <button className={cn(button({ size }), className)} {...props} />;
}
```

### 7.3 Library structure (shadcn-style)

```
components/ui/
  button.tsx  icon-button.tsx  card.tsx  input.tsx  textarea.tsx  select.tsx
  checkbox.tsx  radio-group.tsx  switch.tsx  slider.tsx  badge.tsx  progress.tsx
  alert.tsx  toast.tsx  tabs.tsx  accordion.tsx  dialog.tsx  tooltip.tsx
  dropdown-menu.tsx  table.tsx  pagination.tsx  breadcrumb.tsx  avatar.tsx
  stepper.tsx  calendar.tsx  skeleton.tsx  spinner.tsx  pixel-icon.tsx  ...
lib/utils.ts            // cn()
lib/pixel-icons.ts      // the ICONS grids from §3.4
styles/globals.css      // §7.1
```

For behavior and keyboard handling, use **Radix UI primitives** (Dialog, Tabs, Accordion, Select, Switch, Checkbox, RadioGroup, Slider, Tooltip, DropdownMenu, Progress) and apply the styles above to their parts. Remember that `clip-path` clips Radix portals' content only if they render inside a clipped parent — Radix portals to `body`, so menus and tooltips can overflow freely there (the plain-CSS version had to keep them inside the card).

---

## 8. Checklist for building a new component

1. Pick the **role**: raised (action/selected), sunken (input/track), or dark (feedback/code).
2. Set `--px`, `--cut`, `--icon` from the size table; keep all dimensions as multiples of the pixel unit.
3. Apply `bk-cut` (top-right + bottom-left steps). Choose cut size: 1px small, 2px default, 3px big surfaces.
4. Fill: orange + bricks for selected/primary; `field` for neutral; `peach` for containers; `ink` for dark.
5. Add the correct bevel (raised bottom/right, sunken top/left, dark `#000`). Compensate padding for the bevel.
6. Text: PS2P for chrome, VT323 for content. `ink` on light/orange, `on-dark` on ink.
7. States: hover (lighten face, instant), active (move down by one pixel unit), focus (**inside** ring), disabled (muted brown, no bricks).
8. Icons: 7×7 grid, `crispEdges`, `currentColor`, size `7 × --icon`.
9. Motion: `steps()` only; never smooth easing; no transitions.
10. Verify nothing relies on overflow outside the clipped box.
11. No border-radius, no border, no blur, no gradient (except the slider fill), no pure white on orange.
