import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";
import { COLORS, BORDER, SHADOW } from "../theme/theme";

export default function RecipeDetailScreen({ navigation, route }) {
  const recipe = route.params?.recipe || route.params;
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const compact = width < 650;
  const favorite = useSelector((s) => s.favorites.favoriterecipes.some((r) => r.idFood === recipe.idFood));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scroll}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}><Text style={styles.backText}>← BACK</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(toggleFavorite(recipe))} style={[styles.favorite, favorite && styles.favoriteActive]}>
          <Text style={styles.favoriteText}>{favorite ? "♥ SAVED" : "♡ SAVE"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.heroCard}>
        <Image testID="imageContainer" source={{ uri: recipe.recipeImage }} style={[styles.heroImage, compact && styles.heroImageCompact]} />
        <View style={styles.heroContent}>
          <Text testID="recipeCategory" style={styles.category}>{recipe.category.toUpperCase()}</Text>
          <Text testID="recipeTitle" style={[styles.title, compact && styles.titleCompact]}>{recipe.recipeName}</Text>
          <Text style={styles.description}>{recipe.recipeDescription}</Text>
          <View testID="miscContainer" style={styles.stats}>
            <Stat label="TIME" value={`${recipe.prepTime} MIN`} />
            <Stat label="SERVES" value={recipe.servings} />
            <Stat label="CALORIES" value={recipe.calories} />
            <Stat label="LEVEL" value={recipe.difficulty} />
          </View>
        </View>
      </View>

      <View style={[styles.columns, compact && styles.columnsCompact]}>
        <View testID="sectionContainer" style={styles.section}>
          <Text style={styles.sectionTitle}>INGREDIENTS</Text>
          <View testID="ingredientsList">
            {recipe.ingredients.map((item, i) => (
              <View key={`${item}-${i}`} style={styles.ingredient}>
                <Text style={styles.dot}>+</Text>
                <Text style={styles.ingredientText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HOW TO MAKE IT</Text>
          {recipe.instructions.map((step, i) => (
            <View key={`${step}-${i}`} style={styles.step}>
              <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{i + 1}</Text></View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function Stat({ label, value }) {
  return <View style={styles.stat}><Text style={styles.statLabel}>{label}</Text><Text style={styles.statValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:COLORS.background},
  scroll:{padding:18,paddingBottom:50,maxWidth:1180,width:"100%",alignSelf:"center"},
  topBar:{flexDirection:"row",justifyContent:"space-between",marginBottom:18,gap:10},
  back:{backgroundColor:COLORS.yellow,paddingHorizontal:13,paddingVertical:10,...BORDER,borderRadius:8},
  backText:{fontWeight:"900"},
  favorite:{backgroundColor:COLORS.surface,paddingHorizontal:13,paddingVertical:10,...BORDER,borderRadius:8},
  favoriteActive:{backgroundColor:COLORS.red},
  favoriteText:{fontWeight:"900"},
  heroCard:{backgroundColor:COLORS.surface,...BORDER,borderRadius:18,overflow:"hidden",...SHADOW},
  heroImage:{width:"100%",height:390},
  heroImageCompact:{height:260},
  heroContent:{padding:24},
  category:{alignSelf:"flex-start",backgroundColor:COLORS.yellow,paddingHorizontal:8,paddingVertical:5,...BORDER,fontSize:10,fontWeight:"900"},
  title:{fontSize:48,fontWeight:"900",lineHeight:50,marginTop:12},
  titleCompact:{fontSize:34,lineHeight:37},
  description:{fontSize:16,lineHeight:24,color:COLORS.textMuted,marginTop:8,maxWidth:800},
  stats:{flexDirection:"row",flexWrap:"wrap",gap:10,marginTop:20},
  stat:{minWidth:105,backgroundColor:COLORS.background,padding:12,...BORDER,borderRadius:9},
  statLabel:{fontSize:9,fontWeight:"900"},
  statValue:{fontSize:14,fontWeight:"900",marginTop:4},
  columns:{flexDirection:"row",gap:18,marginTop:22},
  columnsCompact:{flexDirection:"column"},
  section:{flex:1,backgroundColor:COLORS.surface,padding:20,...BORDER,borderRadius:16},
  sectionTitle:{fontSize:19,fontWeight:"900",marginBottom:14},
  ingredient:{flexDirection:"row",gap:10,marginBottom:10,alignItems:"flex-start"},
  dot:{backgroundColor:COLORS.yellow,...BORDER,width:25,height:25,textAlign:"center",lineHeight:19,fontWeight:"900"},
  ingredientText:{flex:1,fontSize:14,lineHeight:21},
  step:{flexDirection:"row",gap:12,marginBottom:15},
  stepNumber:{backgroundColor:COLORS.blue,width:32,height:32,borderRadius:16,alignItems:"center",justifyContent:"center"},
  stepNumberText:{color:COLORS.surface,fontWeight:"900"},
  stepText:{flex:1,fontSize:14,lineHeight:22},
});