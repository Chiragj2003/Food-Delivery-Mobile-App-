# Fastfood – Expo + Appwrite Demo

This project showcases a food-ordering experience built with **Expo SDK 54**, **React Native**, and **Appwrite**. It includes authentication flows, browsing/filtering of menu items, and a cart powered by Zustand state management.

## Requirements

- Node.js ≥ 18
- npm ≥ 9
- Expo CLI (`npm install -g expo-cli`) or `npx` usage
- Expo Go **SDK 54** on your device/emulator (or run a custom dev client)
- Appwrite project configured with the IDs stored in `.env.local`

## Install & Run

```bash
npm install
npx expo start --clear
```

When the Metro bundler starts you can press:

- `a` to launch Android (emulator or device)
- `i` to launch iOS simulator (macOS only)
- `w` to open the web build
- Scan the QR code with Expo Go (SDK 54) to run on a device

> Tip: run `npx expo-doctor` if you change dependencies to keep the native module graph healthy.

## Seeding Appwrite with Demo Data

The Search tab contains a **Seed** button that triggers `lib/seed.ts`:

- Idempotently upserts categories, customizations, and menu entries
- Connects menu items to category documents so filters stay accurate

Ensure the following environment variables are set before seeding:

- `EXPO_PUBLIC_APPWRITE_PROJECT_ID`
- `EXPO_PUBLIC_APPWRITE_ENDPOINT`
- `EXPO_PUBLIC_APPWRITE_PROJECT_NAME`

## Project Structure

- `app/` – Expo Router pages (`(auth)` stack, tab navigator, and feature screens)
- `Components/` – Reusable UI pieces (buttons, inputs, cards, etc.)
- `lib/` – Appwrite client, seed helpers, and shared data
- `store/` – Zustand stores for auth and cart state
- `constants/` – Static assets and mock content

## Available Scripts

| Script | Description |
| --- | --- |
| `npm start` | Alias for `expo start` |
| `npm run android` | Launch the Android build |
| `npm run ios` | Launch the iOS build |
| `npm run web` | Launch the web preview |
| `npm run lint` | Execute Expo's ESLint config |

## Troubleshooting

- **Expo Go complains about SDK 53/54 mismatch** – This project targets SDK 54. Update Expo Go or build a development client.
- **SafeAreaView warning** – Only use `SafeAreaView` from `react-native-safe-area-context`; legacy imports will trigger warnings in RN 0.81.
- **Seeding fails** – Double-check Appwrite credentials and network access. Errors are logged to the console for quick diagnosis.

## Contributing

Feel free to open issues or PRs that improve the UI, add tests, or expand the data set. Each helper and component now includes inline documentation to make onboarding easier.
