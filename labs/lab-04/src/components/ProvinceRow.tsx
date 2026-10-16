// Lab 4 — Task 4.4 Part 1: the extracted row, typed props
import { StyleSheet, Text, View } from "react-native";
import { Province } from "../data/provinces";

type ProvinceRowProps = {
  province: Province;
};

export default function ProvinceRow({ province }: ProvinceRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{province.name}</Text>
      <Text style={styles.details}>
        {province.capital} · {province.region}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  name: { fontSize: 17, fontWeight: "600", color: "#1F3864" },
  details: { fontSize: 14, color: "#777777", marginTop: 2 },
});
