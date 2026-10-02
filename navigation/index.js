import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import MyRecipeScreen from "../screens/MyRecipeScreen";
import RecipesFormScreen from "../screens/RecipesFormScreen";
import CustomRecipesScreen from "../screens/CustomRecipesScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
        <Stack.Screen name="MyRecipe" component={MyRecipeScreen} />
        <Stack.Screen name="RecipesFormScreen" component={RecipesFormScreen} />
        <Stack.Screen name="CustomRecipesScreen" component={CustomRecipesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}