# Lab 7 — Fetching Remote Data (Open-Meteo, no API key)

| File | Task |
| --- | --- |
| `experiments/7.1-7.2-basic-fetch.tsx` | 7.1 + 7.2: Lae temperature, try/catch/finally, `response.ok`, retry |
| `src/services/weather.ts` | URL builder, fetch + parse, date formatting (kept out of the screen) |
| `src/app/(tabs)/weather.tsx` | 7.4: three towns, 7-day FlatList, pull-to-refresh, last-updated time |
| `src/app/(tabs)/_layout.tsx` | adds the Weather tab |

## Task 7.1 — the infinite loop

Without the `[]` at the end of `useEffect`, the effect runs after every render → sets state → renders → runs again. On a metered connection this costs the user real money. `[]` = run once on mount.

## Task 7.3 — aeroplane-mode table (what a correct app shows)

| Situation | What the user sees | Acceptable? |
| --- | --- | --- |
| Loading | Spinner with "Loading weather for Lae…" | Yes |
| Loaded successfully | Current temperature, 7-day list, "Updated hh:mm" | Yes |
| No network at all | "Could not load the weather. Check your connection and try again." + Try again button | Yes — no crash, no blank screen |
| Network restored, retry tapped | Spinner, then the data | Yes — it recovers |

Record what **your** phone shows in the workbook.

## Task 7.4 — how each requirement is met

| Requirement | How |
| --- | --- |
| Seven-day forecast | `daily=temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=auto` |
| FlatList, one row per day | `days` mapped from `daily.time` + max/min arrays |
| Pull-to-refresh | `refreshing` + `onRefresh` props |
| Last successful update | `updatedAt` set only after a successful fetch |
| Three PNG towns | `TOWNS` array; town in state; `useCallback([town])` + `useEffect([load])` refetches on change |
| All four states | loading spinner, success list, `ListEmptyComponent`, error view with retry |

Test by misspelling the URL in `buildUrl` and by switching on aeroplane mode.

```
git add .
git commit -m "Lab 7: weather screen with error handling"
```
