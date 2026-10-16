// Lab 2 — Task 2.3: proportional widths.
// Row direction, boxes use flex instead of a fixed width.
// Box 1 overrides flex to 2 using the array style syntax.
import { StyleSheet, Text, View } from "react-native";

export default function FlexRatio() {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { flex: 2, backgroundColor: "#1F3864" }]}>
        <Text style={styles.label}>1 (flex 2)</Text>
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
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 60,
  },
  box: {
    flex: 1, // was width: 80
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  label: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
