# Foodie v2

Foodie v2 is an Expo/React Native recipe app with a Neo-Brutalist design system.

## What's new in v2

- 20 built-in recipes across breakfast, Indian, Italian, Asian, Mexican, dessert, healthy and other categories.
- Responsive recipe grid:
  - 2 columns on narrow screens
  - 3 columns on medium screens
  - 4 columns on wide screens
- Responsive recipe detail layout.
- Refined Neo-Brutalist visual system with:
  - thick black borders
  - hard shadows
  - high-contrast yellow/red/blue accents
  - rounded but geometric cards
  - cream canvas background
- Favorites with Redux.
- Custom recipes with AsyncStorage.
- Add, edit, view and delete personal recipes.
- Required assignment testIDs retained.

## Run

```bash
npm install
npm run web
```

Expo web starts on port 8081 by default.

If dependencies need Expo-compatible versions:

```bash
npx expo install
```

## Main structure

- `components/` reusable recipe/category UI
- `data/` 20 recipe dataset and category list
- `navigation/` stack navigation
- `redux/` favorites state
- `screens/` application screens
- `theme/` design tokens