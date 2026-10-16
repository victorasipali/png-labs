# Lab 8 — Local Storage and Device Features

Install (always with `npx expo install`):

```
npx expo install @react-native-async-storage/async-storage
npx expo install expo-location
```

| File | Task |
| --- | --- |
| `src/services/notesStorage.ts` | 8.1: `saveNotes` / `loadNotes` (JSON.stringify / JSON.parse, null on first launch) |
| `src/services/location.ts` | 8.3 / 8.4: `getPosition()` returns the result **or** why it failed |
| `src/app/(tabs)/notes.tsx` | 8.2–8.4: the notes screen |
| `src/app/(tabs)/_layout.tsx` | adds the Notes tab |

## Task 8.2 — requirements

| Requirement | How |
| --- | --- |
| Add clears the input | `setText("")` after adding |
| Newest first | `[note, ...prev]` |
| Delete asks for confirmation | `Alert.alert` with Cancel / Delete buttons |
| Saved automatically | `useEffect` on `[notes, loaded]` |
| Loaded on open | `useEffect(..., [])` |
| Spinner during first load | `loading` state |
| Empty state | `ListEmptyComponent` |

**The `loaded` guard matters.** Without it, the save effect runs on the very first render with `[]` and wipes the stored notes before they load. This is the most common reason notes "don't survive" the restart test.

**Restart test:** add three notes → swipe Expo Go away completely → reopen → load the project. All three must still be there.

## Task 8.4 — refusal handling

| Requirement | How |
| --- | --- |
| No crash, no silence | `getPosition()` never throws; returns `{ ok: false, reason }` |
| Tell the user what they lose | orange warning: notes won't record where they were written |
| Continue without location | town chips; chosen town saved as `place` on the note |
| Works if granted later | permission requested every time; `AppState` listener clears the warning when the user returns from Settings; **Open Settings** link when Android won't ask again |
| Notes save without location | `coords: null`, row shows the town or "No location" |

**To test refusal:** Settings → Apps → Expo Go → Permissions → Location → Don't allow. Then re-allow and confirm the next note gets coordinates.

```
git add .
git commit -m "Lab 8: persistent notes with location"
```
