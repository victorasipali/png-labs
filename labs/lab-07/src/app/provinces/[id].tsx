// Lab 5 — Tasks 5.3 / 5.4: dynamic route. Lives OUTSIDE (tabs) so it opens
// on top of the tab bar. The header title comes from the data, not the id.
import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { PROVINCES } from "../../data/provinces";

export default function ProvinceDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const province = PROVINCES.find((p) => p.id === id);

  // Guard clause: a route parameter can be anything
  if (!province) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Not found" }} />
        <Text style={styles.notFound}>Province not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: province.name }} />
      <Text style={styles.title}>{province.name}</Text>

      <View style={styles.card}>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Capital</Text>
          <Text style={styles.value}>{province.capital}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Region</Text>
          <Text style={styles.value}>{province.region}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f6fa" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F3864",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: { fontSize: 16, color: "#777777" },
  value: { fontSize: 16, fontWeight: "600" },
  notFound: { fontSize: 18, color: "#c0392b" },
});
