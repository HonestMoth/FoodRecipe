import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { COLORS, BORDER, SHADOW } from "../theme/theme";

export default function Recipes({ foods, navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 760;
  const columns = isWide ? 4 : width >= 500 ? 3 : 2;
  const gap = 14;
  const horizontalPadding = width >= 760 ? 0 : 2;
  const cardWidth = (Math.min(width, 1180) - horizontalPadding * 2 - gap * (columns - 1)) / columns;

  return (
    <View testID="recipesDisplay">
      <FlatList
        data={foods}
        numColumns={columns}
        scrollEnabled={false}
        key={columns}
        keyExtractor={(item) => String(item.idFood)}
        columnWrapperStyle={columns > 1 ? { gap, marginBottom: 0 } : undefined}
        renderItem={({ item }) => (
          <TouchableOpacity
            testID="articleDisplay"
            onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
            style={[styles.card, { width: cardWidth }]}
          >
            <Image source={{ uri: item.recipeImage }} style={styles.image} />
            <View style={styles.content}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.category.toUpperCase()}</Text>
              </View>
              <Text style={styles.title} numberOfLines={2}>{item.recipeName}</Text>
              <Text style={styles.description} numberOfLines={2}>{item.recipeDescription}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.meta}>{item.prepTime} MIN</Text>
                <Text style={styles.meta}>{item.difficulty.toUpperCase()}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    marginBottom: 16,
    marginRight: 0,
    ...BORDER,
    borderRadius: 14,
    overflow: "hidden",
    ...SHADOW,
  },
  image: { width: "100%", height: 155 },
  content: { padding: 12 },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: COLORS.black,
    marginBottom: 8,
  },
  tagText: { fontSize: 9, fontWeight: "900" },
  title: { fontSize: 18, fontWeight: "900", color: COLORS.black },
  description: { fontSize: 12, color: COLORS.textMuted, marginTop: 6, lineHeight: 17 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  meta: { fontSize: 10, fontWeight: "900", color: COLORS.blue },
});