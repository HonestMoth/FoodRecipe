import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { COLORS, BORDER, SHADOW } from "../theme/theme";

export default function FavoriteScreen({ navigation }) {
  const favorites = useSelector((s) => s.favorites.favoriterecipes);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}><Text style={styles.backText}>← BACK</Text></TouchableOpacity>
        <Text style={styles.title}>FAVORITES</Text>
      </View>
      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>NO FAVORITE RECIPES YET!</Text>
          <Text style={styles.emptyText}>Save recipes you want to cook later.</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}><Text style={styles.buttonText}>GO BACK</Text></TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => String(item.idFood)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}>
              <Image source={{ uri: item.recipeImage }} style={styles.image}/>
              <View style={styles.info}>
                <Text style={styles.category}>{item.category.toUpperCase()}</Text>
                <Text style={styles.recipeTitle}>{item.recipeName}</Text>
                <Text style={styles.desc} numberOfLines={2}>{item.recipeDescription}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
const styles=StyleSheet.create({
  screen:{flex:1,backgroundColor:COLORS.background},
  header:{padding:18,flexDirection:"row",alignItems:"center",gap:14,borderBottomWidth:3,borderBottomColor:COLORS.black},
  back:{backgroundColor:COLORS.yellow,padding:10,...BORDER,borderRadius:8},
  backText:{fontWeight:"900"},title:{fontSize:25,fontWeight:"900"},
  list:{padding:18,gap:14,maxWidth:900,width:"100%",alignSelf:"center"},
  card:{backgroundColor:COLORS.surface,...BORDER,borderRadius:13,overflow:"hidden",flexDirection:"row",...SHADOW},
  image:{width:145,height:130},info:{flex:1,padding:14},
  category:{fontSize:9,fontWeight:"900",color:COLORS.blue},recipeTitle:{fontSize:20,fontWeight:"900",marginTop:4},
  desc:{color:COLORS.textMuted,marginTop:5,lineHeight:18},
  empty:{flex:1,alignItems:"center",justifyContent:"center",padding:30},
  emptyTitle:{fontSize:25,fontWeight:"900",textAlign:"center"},emptyText:{color:COLORS.textMuted,marginTop:8},
  button:{marginTop:20,backgroundColor:COLORS.yellow,padding:14,...BORDER,borderRadius:8,...SHADOW},
  buttonText:{fontWeight:"900"}
});