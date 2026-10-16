// Lab 4 — Tasks 4.2–4.4: FlatList with separator, header, empty state, search
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import ProvinceRow from "../components/ProvinceRow";
import { PROVINCES } from "../data/provinces";

export default function ProvinceList() {
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  // Filtered copy — PROVINCES itself is never modified
  const filtered = PROVINCES.filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  // Two different empty messages (Task 4.4 Part 3)
  const emptyMessage =
    PROVINCES.length === 0
      ? "No provinces available."
      : `No province matches "${search.trim()}".`;

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder="Search provinces"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProvinceRow province={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <Text style={styles.header}>
            Provinces ({filtered.length} of {PROVINCES.length})
          </Text>
        }
        ListEmptyComponent={<Text style={styles.empty}>{emptyMessage}</Text>}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f6fa",
    paddingTop: 50,
  },
  search: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cccccc",
    fontSize: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F3864",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  separator: { height: 1, backgroundColor: "#e0e0e0" },
  empty: {
    textAlign: "center",
    color: "#888888",
    fontSize: 16,
    marginTop: 40,
    paddingHorizontal: 16,
  },
});
