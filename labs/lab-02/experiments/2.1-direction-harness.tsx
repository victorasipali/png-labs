// Lab 2 — Tasks 2.1 / 2.2: direction experiment harness.
// Copy into src/app/index.tsx, then change ONLY the three marked values
// for each row of the observation table in README.md.
import { StyleSheet, Text, View } from "react-native";

export default function LayoutLab() {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { backgroundColor: "#1F3864" }]}>
        <Text style={styles.label}>1</Text>
      </View>
      <View style={[styles.box, { backgroundColor: "#2E5C8A" }]}>
        <Text style={styles.label}>2</Text>
      </View>
      <View style={[styles.box, { backgroundColor: "#6B8FB5" }]}>
        <Text style={styles.label}>3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column", // <- change
    justifyContent: "flex-start", // <- change
    alignItems: "flex-start", // <- change
    paddingTop: 60,
  },
  box: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  label: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});
