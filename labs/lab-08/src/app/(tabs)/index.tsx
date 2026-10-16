// Lab 5 — Provinces tab: full list, each row opens its own detail screen
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ProvinceRow from "../../components/ProvinceRow";
import { PROVINCES } from "../../data/provinces";

export default function ProvincesTab() {
  const router = useRouter();

  return (
    <FlatList
      style={styles.list}
      data={PROVINCES}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProvinceRow
          province={item}
          onPress={() =>
            router.push({ pathname: "/provinces/[id]", params: { id: item.id } })
          }
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <Text style={styles.header}>{PROVINCES.length} provinces</Text>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>No provinces available.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: "#f4f6fa" },
  header: {
    fontSize: 14,
    color: "#777777",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  separator: { height: 1, backgroundColor: "#e0e0e0" },
  empty: { textAlign: "center", color: "#888888", marginTop: 40 },
});
