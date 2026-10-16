# Lab 3 — State, Props and Interaction

| File | Task |
| --- | --- |
| `src/app/index.tsx` | 3.1–3.4: counter, Subtract/Reset, never below zero, faded Subtract at zero, details toggle, three StatCards |
| `src/components/StatCard.tsx` | 3.4: typed props component |
| `src/app/tip.tsx` | 3.5: tip calculator (opened with the link on the counter screen) |

## Task 3.1 — why `count = count + 1` fails

Assigning to the variable does not tell React anything changed, so nothing re-renders.
Always update state through the setter (`setCount`).

## Task 3.3 — the two patterns

- `condition && <View/>` renders the right side only when the left is true.
- `condition ? a : b` chooses between two values inline.

## Props vs state (checkpoint answer)

**Props** are read-only values a parent passes into a component; **state** is data a component owns and changes with its setter, which re-renders it.

## Task 3.5 — tests

| Input | Expected |
| --- | --- |
| empty | no results area, no crash |
| `abc` | no results area |
| `100`, 10%, 3 people | Tip K10.00, Total K110.00, Per person K36.67 |
| − at 1 person | button faded and disabled |

```
git add .
git commit -m "Lab 3: state, props, tip calculator"
```
