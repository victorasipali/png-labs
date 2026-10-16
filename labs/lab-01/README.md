# Lab 1 — Core Components and JSX

File: `src/app/index.tsx`

## Task 1.1 — answers to the three questions

- `flex: 1` on the container makes the screen fill the display.
- `justifyContent: 'center'` centres the text vertically (default direction is column).
- A plain object still works; `StyleSheet.create` adds validation and keeps styles together.

## Task 1.2 — the disappearing image

A remote image has no intrinsic size in React Native. Without `width` and `height` it renders at 0 × 0.

## Task 1.3 — pressed feedback

`style={({ pressed }) => [...]}` receives `pressed` from React Native. No state code is needed.

## Tasks 1.4 and 1.5

The solution file builds the ID card:

- circular photo, bold name, grey student number, programme and year on one line
- **Verify** button showing an alert with the student number
- every style inside `StyleSheet.create`, card centred on screen
- extension: green status strip (card has `overflow: "hidden"` and no padding so the strip reaches the edges; padding lives on the inner `content` View) and a `flexDirection: "row"` footer with Faculty / Campus / Expires

Put your own name, number and photo URL in before submitting.

```
git add .
git commit -m "Lab 1: student ID card"
```
