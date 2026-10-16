// Lab 5 — Search tab: Lab 4's search, now navigating to the detail screen.
// The search text survives going back because this screen stays mounted
// underneath the detail screen in the stack.
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import ProvinceRow from "../../components/ProvinceRow";
import { PROVINCES } from "../../data/provinces";

export default function SearchTab() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const filtered = PROVINCES.filter((p) =>
    p.name.toLowerCase().includes(query)
  );

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
        renderItem={({ item }) => (
          <ProvinceRow
            province={item}
            onPress={() =>
              router.push({
                pathname: "/provinces/[id]",
                params: { id: item.id },
              })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text style={styles.empty}>{emptyMessage}</Text>}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f4f6fa" },
  search: {
    backgroundColor: "#ffffff",
    margin: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cccccc",
    fontSize: 16,
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
