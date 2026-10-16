// Lab 5 — Task 5.2 / 5.5: About screen (now a tab)
import { StyleSheet, Text, View } from "react-native";

export default function AboutTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PNG Labs</Text>
      <Text style={styles.body}>
        IS323 Mobile App Development laboratory app, built with React Native
        and Expo Router.
      </Text>
      <Text style={styles.body}>Author: Victor Asipali</Text>
      <Text style={styles.version}>Version 1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f4f6fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F3864",
    marginBottom: 12,
  },
  body: { fontSize: 16, color: "#333333", marginBottom: 8, lineHeight: 22 },
  version: { fontSize: 13, color: "#888888", marginTop: 16 },
});
