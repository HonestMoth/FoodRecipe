import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, BORDER, SHADOW } from "../theme/theme";

export default function RecipesFormScreen({ navigation, route }) {
  const existing = route.params?.recipeToEdit;
  const index = route.params?.recipeIndex;

  const [title, setTitle] = useState(existing?.title || existing?.recipeName || "");
  const [image, setImage] = useState(existing?.image || existing?.recipeImage || "");
  const [description, setDescription] = useState(existing?.description || existing?.recipeDescription || "");
  const [ingredients, setIngredients] = useState(existing?.ingredients?.join("\n") || "");
  const [instructions, setInstructions] = useState(existing?.instructions?.join("\n") || "");

  const save = async () => {
    if (!title.trim()) {
      Alert.alert("Recipe name required", "Please enter a recipe name.");
      return;
    }

    const raw = await AsyncStorage.getItem("customrecipes");
    const list = raw ? JSON.parse(raw) : [];

    const recipe = {
      id: existing?.id || `custom-${Date.now()}`,
      title: title.trim(),
      image: image.trim(),
      description: description.trim(),
      ingredients: ingredients.split("\n").map((x) => x.trim()).filter(Boolean),
      instructions: instructions.split("\n").map((x) => x.trim()).filter(Boolean),
      recipeName: title.trim(),
      recipeImage: image.trim(),
      recipeDescription: description.trim(),
      category: "My Recipe",
      prepTime: "30",
      servings: "2",
      calories: "400",
      difficulty: "Easy",
    };

    if (typeof index === "number") list[index] = recipe;
    else list.push(recipe);

    await AsyncStorage.setItem("customrecipes", JSON.stringify(list));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.top}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}><Text style={styles.backText}>← BACK</Text></TouchableOpacity>
        <Text style={styles.title}>{existing ? "EDIT RECIPE" : "ADD RECIPE"}</Text>
      </View>

      <View style={styles.form}>
        <Field label="RECIPE NAME" value={title} onChangeText={setTitle} placeholder="e.g. Sunday Pasta" />
        <Field label="IMAGE URL" value={image} onChangeText={setImage} placeholder="https://..." />
        <Field label="DESCRIPTION" value={description} onChangeText={setDescription} placeholder="What makes this recipe special?" multiline />
        <Field label="INGREDIENTS" value={ingredients} onChangeText={setIngredients} placeholder="One ingredient per line" multiline />
        <Field label="STEPS" value={instructions} onChangeText={setInstructions} placeholder="One step per line" multiline />
        <TouchableOpacity style={styles.save} onPress={save}><Text style={styles.saveText}>SAVE RECIPE →</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}
function Field({ label, multiline, ...props }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput {...props} multiline={multiline} textAlignVertical={multiline ? "top" : "center"} style={[styles.input, multiline && styles.multiline]} /></View>;
}
const styles=StyleSheet.create({
  screen:{flex:1,backgroundColor:COLORS.background},content:{padding:18,paddingBottom:50,maxWidth:900,width:"100%",alignSelf:"center"},
  top:{flexDirection:"row",alignItems:"center",gap:14,marginBottom:18},back:{backgroundColor:COLORS.yellow,padding:10,...BORDER,borderRadius:8},backText:{fontWeight:"900"},title:{fontSize:25,fontWeight:"900"},
  form:{backgroundColor:COLORS.surface,padding:20,...BORDER,borderRadius:16,...SHADOW},field:{marginBottom:16},label:{fontSize:10,fontWeight:"900",marginBottom:7},input:{backgroundColor:COLORS.background,padding:13,...BORDER,borderRadius:8,fontSize:14},multiline:{minHeight:100},
  save:{backgroundColor:COLORS.blue,padding:15,...BORDER,borderRadius:8,...SHADOW,alignItems:"center"},saveText:{color:COLORS.surface,fontWeight:"900"}
});