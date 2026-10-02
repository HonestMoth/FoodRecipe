import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { recipes } from "../data/recipes";
import { categories } from "../data/categories";
import Categories from "../components/Categories";
import Recipes from "../components/Recipes";
import { COLORS, BORDER, SHADOW } from "../theme/theme";

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const { width } = useWindowDimensions();
  const compact = width < 600;

  const foods = useMemo(
    () => activeCategory === "All" ? recipes : recipes.filter((r) => r.category === activeCategory),
    [activeCategory]
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        testID="scrollContainer"
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View testID="headerContainer" style={[styles.header, compact && styles.headerCompact]}>
          <View>
            <Text style={styles.eyebrow}>WELCOME TO</Text>
            <Text testID="titleContainer" style={[styles.title, compact && styles.titleCompact]}>FOODIE.</Text>
            <Text style={styles.subtitle}>20 recipes. Zero boring meals.</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate("Favorite")}>
              <Text style={styles.headerButtonText}>♥ FAVS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: COLORS.blue }]} onPress={() => navigation.navigate("MyRecipe")}>
              <Text style={[styles.headerButtonText, { color: COLORS.surface }]}>MY FOOD</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View testID="categoryList" style={styles.categories}>
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={setActiveCategory}
          />
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>{activeCategory === "All" ? "TRENDING NOW" : activeCategory.toUpperCase()}</Text>
          <Text style={styles.count}>{foods.length} RECIPES</Text>
        </View>

        <View testID="foodList">
          <Recipes foods={foods} categories={categories} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:COLORS.background},
  scroll:{paddingHorizontal:18,paddingTop:18,paddingBottom:40,width:"100%",maxWidth:1220,alignSelf:"center"},
  header:{backgroundColor:COLORS.surface,padding:24,...BORDER,borderRadius:18,...SHADOW,flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:20},
  headerCompact:{flexDirection:"column",alignItems:"stretch"},
  eyebrow:{fontSize:11,fontWeight:"900",letterSpacing:1},
  title:{fontSize:48,fontWeight:"900",lineHeight:50},
  titleCompact:{fontSize:38,lineHeight:40},
  subtitle:{color:COLORS.textMuted,fontSize:14,marginTop:4},
  headerActions:{flexDirection:"row",gap:9,flexWrap:"wrap"},
  headerButton:{backgroundColor:COLORS.yellow,paddingHorizontal:13,paddingVertical:11,...BORDER,borderRadius:8},
  headerButtonText:{fontSize:10,fontWeight:"900"},
  categories:{marginTop:22},
  sectionHeading:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:18},
  sectionTitle:{fontSize:21,fontWeight:"900"},
  count:{fontSize:10,fontWeight:"900",color:COLORS.textMuted},
});