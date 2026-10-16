# Lab 0 — Environment Setup and First Run

## Task 0.1 — Verify your tools (PowerShell)

```
node --version     # must be v20 or newer
npm --version
git --version
```

If PowerShell blocks `npx` ("running scripts is disabled"):

```
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## Task 0.2 — Create the project

```
cd C:\Apps
npx create-expo-app@latest png-labs
cd png-labs
npm run reset-project
```

`reset-project` replaces the demo screens with a blank `src/app/index.tsx` and `src/app/_layout.tsx`.

## Task 0.3 — Run on your phone

```
npx expo start
```

Scan the QR code with Expo Go. If it never loads (different network / firewall):

```
npm install --save-dev @expo/ngrok@^4.1.0
npx expo start --tunnel
```

Installing ngrok **locally** avoids the Windows error
`CommandError: Install @expo/ngrok@^4.1.0 and try again`.

## Task 0.4 — Fast Refresh

Change the visible text in `src/app/index.tsx` to your name and save. The phone updates within 1–2 seconds.

## Task 0.5 — Break it deliberately (record the exact wording from YOUR phone)

| What you broke | Error you should see (wording may differ slightly) |
| --- | --- |
| Missing closing bracket `>` on a JSX tag | Red screen: `SyntaxError: ... Unexpected token` with the file name and line:column |
| Removed `export default` | Expo Router: the route `./index.tsx` is missing the required default export |
| Text outside a `<Text>` (bare `Hello` inside a `View`) | `Text strings must be rendered within a <Text> component` (SDK 57 may say `Unexpected text node: Hello. A text node cannot be a child of a <View>`) |

Fix each break before making the next.

## Task 0.6 — Version control

`create-expo-app` usually initialises Git for you. Running `git init` again is harmless.

```
git init
git add .
git commit -m "Lab 0: project created and running"
```

Open `.gitignore` and confirm it contains:

```
node_modules/
```

## Checkpoint

- [ ] Runs on my physical phone
- [ ] Changing text updates the phone within seconds
- [ ] Three error messages recorded
- [ ] Commit made, `node_modules` ignored
