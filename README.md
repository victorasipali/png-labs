# PNG Labs

The lab app I built for **IS325 Mobile Application Development**. It's one Expo app that grows lab by lab, from first-run setup through navigation, forms, network data, local storage and device location, using Papua New Guinea data throughout.

Built with **Expo SDK 57**, **Expo Router** and **TypeScript**.

## What the app does

| Tab       | What it shows                                                                                                     | Lab  |
| --------- | ----------------------------------------------------------------------------------------------------------------- | ---- |
| Provinces | List of PNG provinces; tap a row to open its detail screen                                                        | 4, 5 |
| Search    | Case-insensitive search, with different messages for "no data" and "no matches"                                   | 4, 5 |
| Register  | Four-field registration form with per-field validation                                                            | 6    |
| Weather   | 7-day Open-Meteo forecast for Lae, Port Moresby and Mount Hagen, with pull-to-refresh and offline error handling  | 7    |
| Notes     | Notes saved on the device, a delete confirmation, and location tagging with a fallback when permission is refused | 8    |
| About     | App information                                                                                                   | 5    |

## What each lab covered

| Lab | Topic              | Key skills                                                                         |
| --- | ------------------ | ---------------------------------------------------------------------------------- |
| 0   | Environment setup  | Node, Expo Go, Fast Refresh, reading red-screen errors, Git                        |
| 1   | Core components    | `View`, `Text`, `Image`, `Pressable`, `StyleSheet` (student ID card)               |
| 2   | Flexbox            | `flexDirection`, `justifyContent`, `alignItems`, flex ratios, absolute positioning |
| 3   | State and props    | `useState`, conditional rendering, typed props (counter, tip calculator)           |
| 4   | Lists              | `FlatList`, `keyExtractor`, extracted row components, filtering                    |
| 5   | Navigation         | Expo Router stack, `(tabs)` route group, dynamic `[id]` route                      |
| 6   | Forms              | Controlled inputs, validation, `KeyboardAvoidingView`                              |
| 7   | Remote data        | `fetch`, `async`/`await`, loading, error, empty and success states, retry          |
| 8   | Storage and device | AsyncStorage persistence, `expo-location`, permission handling                     |

Lab 9, the consolidation project, is in its own repository: [market-price-tracker](https://github.com/victorasipali/market-price-tracker).

## Project structure

```
src/
  app/
    _layout.tsx           Root stack
    (tabs)/               Provinces, Search, Register, Weather, Notes, About
    provinces/[id].tsx    Province detail (dynamic route)
  components/             ProvinceRow
  data/                   Province dataset
  services/               Weather API, notes storage, location
labs/
  lab-00 … lab-08/        Code snapshot at the end of each lab, with notes and answers
```

`src/` is the running app (its state at the end of Lab 8). `labs/` keeps each earlier stage, such as the ID card, the Flexbox layouts and the tip calculator, so you can see how the app grew. Expo Router only reads `src/app`, so nothing in `labs/` is loaded when the app runs.

## Getting started

```
git clone https://github.com/victorasipali/png-labs.git
cd png-labs
npm install
npx expo start
```

Scan the QR code with Expo Go. If your phone and PC are on different networks, run `npx expo start --tunnel`.

## Author

Victor Asipali, Bachelor of Business in Information Technology, Year 3
