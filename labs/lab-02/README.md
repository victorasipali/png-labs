# Lab 2 — Styling and Flexbox Layout

Rule to remember: **`justifyContent` works along `flexDirection` (main axis); `alignItems` works across it (cross axis).**

## Files

| File | Task |
| --- | --- |
| `experiments/2.1-direction-harness.tsx` | 2.1 / 2.2 — copy into `src/app/index.tsx`, change the three values |
| `experiments/2.3-flex-ratio.tsx` | 2.3 — row + `flex` ratios |
| `src/app/index.tsx` | 2.4 — the three layouts (final state of the lab) |

## Task 2.2 — observation table

| flexDirection | justifyContent | alignItems | What you observe |
| --- | --- | --- | --- |
| column | flex-start | flex-start | Boxes stacked vertically in the top-left corner |
| column | center | center | Stack sits in the middle of the screen, both ways |
| column | space-between | center | Box 1 at top, box 3 at bottom, box 2 in the middle; all centred horizontally |
| row | flex-start | flex-start | Boxes side by side along the top, starting at the left |
| row | center | center | Row of three in the exact centre of the screen |
| row | space-between | center | Box 1 at left edge, box 3 at right edge, box 2 in the middle; row vertically centred |
| row | space-around | flex-end | Spread across with equal space around each box, sitting at the bottom of the screen |

## Task 2.3 — proportions

| Box | flex | Share of width |
| --- | --- | --- |
| 1 | 2 | 2/4 = 50% |
| 2 | 1 | 1/4 = 25% |
| 3 | 1 | 1/4 = 25% |

`flex` is a ratio: each box gets its value out of the total (2 + 1 + 1 = 4).
With all three at `flex: 1`, each takes 1/3.

## Task 2.4 — how each layout meets the spec

- **A:** row + `space-between` puts title left and Menu right; `alignItems: center` centres vertically; `paddingHorizontal` pads both sides.
- **B:** `flex: 1` on each column = equal widths; 1-unit-wide divider Views stretch to the row's height (row default `alignItems` is `stretch`).
- **C:** `position: absolute`, `bottom: 24`, `right: 24`, `borderRadius` = half the width; last child so it floats on top.

```
git add .
git commit -m "Lab 2: flexbox layouts"
```
