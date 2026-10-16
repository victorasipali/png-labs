// Lab 3 — Task 3.4: reusable component driven by props
import { StyleSheet, Text, View } from "react-native";

type StatCardProps = {
  label: string;
  value: number;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 14,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  value: { fontSize: 26, fontWeight: "bold", color: "#1F3864" },
  label: { fontSize: 12, color: "#888888", marginTop: 4 },
});
