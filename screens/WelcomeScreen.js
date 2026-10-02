import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { COLORS, BORDER, SHADOW } from "../theme/theme";

export default function WelcomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const compact = width < 520;

  return (
    <View style={styles.screen}>
      <View style={[styles.hero, compact && styles.heroCompact]}>
        <Text style={styles.kicker}>FOODIE / V2.0</Text>
        <Text style={[styles.title, compact && styles.titleCompact]}>GOOD FOOD.</Text>
        <Text style={[styles.title, compact && styles.titleCompact]}>BOLD IDEAS.</Text>
        <Text style={styles.subtitle}>A playful recipe space built with a Neo-Brutalist design system.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace("Home")}>
          <Text style={styles.buttonText}>EXPLORE RECIPES →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen:{flex:1,backgroundColor:COLORS.yellow,alignItems:"center",justifyContent:"center",padding:20},
  hero:{width:"100%",maxWidth:760,backgroundColor:COLORS.surface,padding:42,...BORDER,borderRadius:20,...SHADOW},
  heroCompact:{padding:26},
  kicker:{fontSize:12,fontWeight:"900",marginBottom:18},
  title:{fontSize:64,fontWeight:"900",lineHeight:62},
  titleCompact:{fontSize:43,lineHeight:43},
  subtitle:{fontSize:16,lineHeight:24,color:COLORS.textMuted,maxWidth:550,marginTop:18},
  button:{alignSelf:"flex-start",backgroundColor:COLORS.red,paddingHorizontal:20,paddingVertical:15,marginTop:26,...BORDER,borderRadius:9,...SHADOW},
  buttonText:{fontWeight:"900",color:COLORS.surface},
});