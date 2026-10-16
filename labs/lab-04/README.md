# Lab 4 — Lists with FlatList

| File | Task |
| --- | --- |
| `src/data/provinces.ts` | 4.1: ten provinces with a `Province` type |
| `src/components/ProvinceRow.tsx` | 4.4 Part 1: extracted row, typed props |
| `src/app/index.tsx` | 4.2–4.4: list, separator, header with count, search, two empty messages |

## Task 4.2 — the two deliberate breaks

1. Without `keyExtractor`: warning `Each child in a list should have a unique "key" prop` (FlatList falls back to `item.key`, which doesn't exist).
2. `renderItem={(item) => ...}` without braces: `item` is the wrapper object `{ item, index, separators }`, so `item.name` is undefined and the row breaks. Destructure: `({ item })`.

## Task 4.3 — props used

- `ItemSeparatorComponent` — line between rows only (not above first / below last)
- `ListEmptyComponent` — shown when `data` is empty (test with `data={[]}`)
- `ListHeaderComponent` — title and count

## Task 4.4 — tests

| Type | Result |
| --- | --- |
| `mor` / `MOR` / `Mor` | Morobe only |
| `high` | Eastern Highlands, Western Highlands |
| `zzz` | `No province matches "zzz".` |
| `PROVINCES = []` (temporarily) | `No provinces available.` |

```
git add .
git commit -m "Lab 4: FlatList with search"
```
