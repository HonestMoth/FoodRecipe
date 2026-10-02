import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { COLORS, BORDER, SHADOW } from "../theme/theme";

export default function MyRecipeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const raw = await AsyncStorage.getItem("customrecipes");
      setRecipes(raw ? JSON.parse(raw) : []);
    } catch {
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => {
    setLoading(true);
    fetchRecipes();
  }, []));

  const deleteRecipe = async (index) => {
    const updated = recipes.filter((_, i) => i !== index);
    await AsyncStorage.setItem("customrecipes", JSON.stringify(updated));
    setRecipes(updated);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color={COLORS.blue}/></View>;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}><Text style={styles.backText}>← BACK</Text></TouchableOpacity>
        <Text style={styles.title}>MY FOOD</Text>
      </View>

      <View style={styles.toolbar}>
        <Text style={styles.subtitle}>YOUR RECIPES</Text>
        <TouchableOpacity testID="addRecipeButton" onPress={() => navigation.navigate("RecipesFormScreen")} style={styles.add}><Text style={styles.addText}>+ ADD RECIPE</Text></TouchableOpacity>
      </View>

      {recipes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>NO RECIPES YET</Text>
          <Text style={styles.emptyText}>Create your first recipe and build your personal cookbook.</Text>
          <TouchableOpacity onPress={() => navigation.navigate("RecipesFormScreen")} style={styles.yellow}><Text style={styles.yellowText}>+ ADD NEW RECIPE</Text></TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item, index) => item.id ? String(item.id) : String(index)}
          contentContainerStyle={styles.list}
          renderItem={({item,index}) => (
            <View style={styles.card}>
              <TouchableOpacity testID="handlerecipeBtn" onPress={() => navigation.navigate("CustomRecipesScreen",{recipe:item})} style={styles.cardTop}>
                {item.image ? <Image source={{uri:item.image}} style={styles.image}/> : <View style={styles.noImage}><Text style={styles.noImageText}>NO IMAGE</Text></View>}
                <View style={styles.info}>
                  <Text style={styles.recipeTitle}>{item.title}</Text>
                  <Text testID="recipeDescp" style={styles.desc} numberOfLines={3}>{item.description}</Text>
                </View>
              </TouchableOpacity>
              <View testID="editDeleteButtons" style={styles.actions}>
                <TouchableOpacity onPress={() => navigation.navigate("RecipesFormScreen",{recipeToEdit:item,recipeIndex:index})} style={styles.edit}><Text style={styles.actionText}>EDIT</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => deleteRecipe(index)} style={styles.delete}><Text style={styles.actionText}>DELETE</Text></TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
const styles=StyleSheet.create({
  screen:{flex:1,backgroundColor:COLORS.background},center:{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:COLORS.background},
  header:{padding:18,flexDirection:"row",alignItems:"center",gap:14,borderBottomWidth:3,borderBottomColor:COLORS.black},back:{backgroundColor:COLORS.yellow,padding:10,...BORDER,borderRadius:8},backText:{fontWeight:"900"},title:{fontSize:25,fontWeight:"900"},
  toolbar:{padding:18,flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:10},subtitle:{fontSize:17,fontWeight:"900"},add:{backgroundColor:COLORS.yellow,padding:11,...BORDER,borderRadius:8,...SHADOW},addText:{fontWeight:"900",fontSize:11},
  list:{padding:18,gap:18,maxWidth:900,width:"100%",alignSelf:"center"},card:{backgroundColor:COLORS.surface,...BORDER,borderRadius:10,overflow:"hidden",...SHADOW},cardTop:{flexDirection:"row"},image:{width:150,height:145},noImage:{width:150,height:145,backgroundColor:COLORS.muted,alignItems:"center",justifyContent:"center"},noImageText:{fontWeight:"900",fontSize:11},info:{flex:1,padding:15},recipeTitle:{fontSize:20,fontWeight:"900"},desc:{marginTop:8,lineHeight:19,color:COLORS.textMuted},
  actions:{flexDirection:"row",borderTopWidth:3,borderTopColor:COLORS.black},edit:{flex:1,padding:13,alignItems:"center",backgroundColor:COLORS.blue},delete:{flex:1,padding:13,alignItems:"center",backgroundColor:COLORS.red},actionText:{color:COLORS.surface,fontWeight:"900"},
  empty:{flex:1,alignItems:"center",justifyContent:"center",padding:30},emptyTitle:{fontSize:26,fontWeight:"900"},emptyText:{textAlign:"center",color:COLORS.textMuted,maxWidth:400,marginTop:8},yellow:{marginTop:20,backgroundColor:COLORS.yellow,padding:15,...BORDER,borderRadius:8,...SHADOW},yellowText:{fontWeight:"900"}
});