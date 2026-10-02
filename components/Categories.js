import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { COLORS, BORDER } from "../theme/theme";

export default function Categories({ categories, activeCategory, handleChangeCategory }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => handleChangeCategory(category)}
          style={[styles.chip, activeCategory === category && styles.active]}
        >
          <Text style={styles.text}>{category.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 4, paddingRight: 20, gap: 10 },
  chip: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...BORDER,
    borderRadius: 999,
  },
  active: { backgroundColor: COLORS.yellow },
  text: { fontSize: 11, fontWeight: "900" },
});