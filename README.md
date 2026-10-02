# 🍴 Foodie — Recipe App

## 📌 Overview

**Foodie** is a React Native and Expo recipe application that allows users to discover recipes, browse categories, view recipe details, save favorites, and create and manage their own recipes.

The app uses a **Neo-Brutalist design** with bold typography, thick borders, hard shadows, and a responsive layout.

## 📸 Preview

Homepage: <img width="947" height="404" alt="image" src="https://github.com/user-attachments/assets/a8b8b829-ddc5-4187-bce2-1d07e6ab9af6" />
Recipe Page: <img width="926" height="500" alt="image" src="https://github.com/user-attachments/assets/e492ac8e-a3a7-4819-b3a9-c2ee3ad08b53" />
Recipe Instructions: <img width="905" height="489" alt="image" src="https://github.com/user-attachments/assets/5b11451f-e661-4c42-a3a2-3b8878887ce2" />
Favorite Page: <img width="941" height="494" alt="image" src="https://github.com/user-attachments/assets/4756909a-b42d-4885-a0f7-a7c8e47ed835" />
Add Recipe: <img width="822" height="503" alt="image" src="https://github.com/user-attachments/assets/7dd1cf6e-b7e8-403b-882b-102176672fb8" />

## ✨ Features

- 🏠 Browse recipes with a responsive grid
- 🔎 Browse recipes by category
- 📖 View detailed recipes, ingredients and instructions
- ❤️ Add and remove favorite recipes
- 👨‍🍳 Create custom recipes
- ✏️ Edit and delete custom recipes
- 💾 Store custom recipes using AsyncStorage
- 📱 Responsive design for different screen sizes
- 🎨 Neo-Brutalist UI design

## 🛠️ Tech Stack

- React Native
- Expo
- JavaScript
- React Navigation
- Redux Toolkit
- AsyncStorage
- React Native Web
- Space Grotesk

## 📂 Project Structure

```text
FoodRecipe/
├── components/
├── data/
├── navigation/
├── redux/
├── screens/
├── theme/
├── App.js
├── index.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HonestMoth/FoodRecipe.git
cd FoodRecipe
```

### 2. Install Dependencies

```bash
npm install
```

If you encounter dependency conflicts:

```bash
npm install --force
```

### 3. Start the Application

```bash
npm run web
```

The application will run at:

```text
http://localhost:8081
```
🎨 Design
Foodie follows a Neo-Brutalist design system:
- Thick black borders
- Hard shadows
- Bold typography
- High-contrast colors
- Cream background
- Yellow, red and blue accents
- Responsive recipe cards
Color Palette
Color	Hex
Cream	#FFF8E7
Black	#111111
Yellow	#FFD43B
Red	#FF5A5F
Blue	#2563EB
Green	#7CB342


💾 Data Management
- Static recipes → JavaScript data files
- Favorites → Redux Toolkit
- Custom recipes → AsyncStorage
- No external database required
🗺️ Future Improvements
- Real image upload
- Recipe search
- User authentication
- Backend API
- Cloud database
- Recipe ratings and reviews

👨‍💻 Author
HonestMoth
GitHub:
https://github.com/HonestMoth/FoodRecipe
