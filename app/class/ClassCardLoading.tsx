import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const ClassCardSkeleton = () => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.avatarPlaceholder} />
        <View style={styles.textContainer}>
          <View style={styles.textPlaceholderLarge} />
          <View style={styles.textPlaceholder} />
          <View style={styles.textPlaceholder} />
          <View style={styles.textPlaceholderSmall} />
        </View>
      </View>
      <View style={styles.buttonPlaceholder} />
    </View>
  );
};

const ClassesScreenSkeleton = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.dateSelectorPlaceholder} />
      <Text style={styles.headerPlaceholder}>Classes Available</Text>
      {Array.from({ length: 4 }).map((_, index) => (
        <ClassCardSkeleton key={index} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  dateSelectorPlaceholder: {
    height: 50,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 20,
  },
  headerPlaceholder: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e0e0e0",
    marginBottom: 12,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e0e0",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  textPlaceholderLarge: {
    width: "60%",
    height: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 6,
  },
  textPlaceholder: {
    width: "80%",
    height: 14,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 6,
  },
  textPlaceholderSmall: {
    width: "40%",
    height: 14,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  buttonPlaceholder: {
    width: 70,
    height: 30,
    backgroundColor: "#d1fae5",
    borderRadius: 8,
  },
});

export default ClassesScreenSkeleton;