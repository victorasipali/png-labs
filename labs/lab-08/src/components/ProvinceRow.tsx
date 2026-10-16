// Lab 5 — ProvinceRow now accepts onPress so tapping opens the detail screen
import { Pressable, StyleSheet, Text } from "react-native";
import { Province } from "../data/provinces";

type ProvinceRowProps = {
  province: Province;
  onPress: () => void;
};

export default function ProvinceRow({ province, onPress }: ProvinceRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <Text style={styles.name}>{province.name}</Text>
      <Text style={styles.details}>
        {province.capital} · {province.region}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  rowPressed: { backgroundColor: "#e9eef5" },
  name: { fontSize: 17, fontWeight: "600", color: "#1F3864" },
  details: { fontSize: 14, color: "#777777", marginTop: 2 },
});
