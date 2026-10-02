import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, BORDER, SHADOW } from "../theme/theme";

export default function CustomRecipesScreen({ navigation, route }) {
  const recipe = route.params?.recipe;
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View testID="topButtonsContainer" style={styles.top}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}><Text style={styles.backText}>← BACK</Text></TouchableOpacity>
        <TouchableOpacity style={styles.favorite}><Text style={styles.favoriteText}>♡ SAVE</Text></TouchableOpacity>
      </View>
      <View style={styles.card}>
        {recipe?.image || recipe?.recipeImage ? <Image testID="imageContainer" source={{uri: recipe.image || recipe.recipeImage}} style={styles.image}/> : <View testID="imageContainer" style={styles.placeholder}><Text style={styles.placeholderText}>NO IMAGE</Text></View>}
        <View testID="contentContainer" style={styles.body}>
          <Text style={styles.tag}>MY RECIPE</Text>
          <Text style={styles.title}>{recipe?.title || recipe?.recipeName}</Text>
          <Text style={styles.description}>{recipe?.description || recipe?.recipeDescription}</Text>
          <Text style={styles.section}>INGREDIENTS</Text>
          {(recipe?.ingredients || []).map((x,i)=><Text key={i} style={styles.line}>+ {x}</Text>)}
          <Text style={styles.section}>STEPS</Text>
          {(recipe?.instructions || []).map((x,i)=><Text key={i} style={styles.step}>{i+1}. {x}</Text>)}
        </View>
      </View>
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  screen:{flex:1,backgroundColor:COLORS.background},content:{padding:18,paddingBottom:50,maxWidth:1000,width:"100%",alignSelf:"center"},
  top:{flexDirection:"row",justifyContent:"space-between",marginBottom:18},back:{backgroundColor:COLORS.yellow,padding:10,...BORDER,borderRadius:8},backText:{fontWeight:"900"},favorite:{backgroundColor:COLORS.surface,padding:10,...BORDER,borderRadius:8},favoriteText:{fontWeight:"900"},
  card:{backgroundColor:COLORS.surface,...BORDER,borderRadius:18,overflow:"hidden",...SHADOW},image:{width:"100%",height:360},placeholder:{height:220,alignItems:"center",justifyContent:"center",backgroundColor:COLORS.muted},placeholderText:{fontWeight:"900"},
  body:{padding:24},tag:{alignSelf:"flex-start",backgroundColor:COLORS.yellow,padding:6,...BORDER,fontSize:9,fontWeight:"900"},title:{fontSize:38,fontWeight:"900",marginTop:12},description:{color:COLORS.textMuted,lineHeight:22,marginTop:7},section:{fontSize:18,fontWeight:"900",marginTop:24,marginBottom:10},line:{fontSize:14,lineHeight:22},step:{fontSize:14,lineHeight:22,marginBottom:8}
});