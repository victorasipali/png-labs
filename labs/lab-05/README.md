# Lab 5 — Navigation with Expo Router

Install the tab icons once:

```
npx expo install @expo/vector-icons
```

## Final file tree

```
src/
  app/
    _layout.tsx            Root Stack — (tabs) with no header + provinces/[id]
    (tabs)/
      _layout.tsx          Tabs: Provinces, Search, About
      index.tsx            Provinces tab
      search.tsx           Search tab (Lab 4 search)
      about.tsx            About tab
    provinces/
      [id].tsx             Detail — OUTSIDE (tabs) so it covers the tab bar
  components/ProvinceRow.tsx   now takes onPress
  data/provinces.ts
```

**Delete the old `src/app/index.tsx` and `src/app/about.tsx`** when you move to tabs — `(tabs)/index.tsx` now owns `/`, and two files for the same route clash. Restart with `npx expo start --clear` if old routes linger.

## Tasks 5.1–5.3

- 5.1: `Stack` from `expo-router` (never `@react-navigation/stack` — unsupported from SDK 56).
- 5.2: a file = a route. `<Link href="/about">` gives a back button and animation for free. (In the final tab layout About is a tab, so the Link is no longer needed.)
- 5.3: `[id]` = dynamic parameter read with `useLocalSearchParams`. The `if (!province)` guard stops a crash on unknown ids.

## Task 5.4 — rows open their own detail

```tsx
router.push({ pathname: "/provinces/[id]", params: { id: item.id } })
```

Header shows the province name via `<Stack.Screen options={{ title: province.name }} />` inside the detail component.
Search text stays after Back because the Search tab stays mounted under the detail screen.

## Checkpoint answer

- **`[id]`** in a file name = a dynamic route segment; its value arrives as a parameter.
- **`(tabs)`** in a folder name = a route group: organises files and gets its own layout, but adds nothing to the URL.

```
git add .
git commit -m "Lab 5: Expo Router stack, detail route and tabs"
```
