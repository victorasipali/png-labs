// Lab 2 — Task 2.4: Layout A (header bar), Layout B (stats row), Layout C (floating button)
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function ThreeLayouts() {
  return (
    <View style={styles.screen}>
      {/* Layout A — header bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PNG Labs</Text>
        <Text style={styles.headerMenu}>Menu</Text>
      </View>

      {/* Layout B — statistics row */}
      <View style={styles.statsRow}>
        <View style={styles.statColumn}>
          <Text style={styles.statNumber}>22</Text>
          <Text style={styles.statCaption}>Provinces</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statColumn}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statCaption}>Regions</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statColumn}>
          <Text style={styles.statNumber}>800+</Text>
          <Text style={styles.statCaption}>Languages</Text>
        </View>
      </View>

      <Text style={styles.body}>
        Other screen content goes here. The floating button stays pinned to the
        bottom-right corner above it.
      </Text>

      {/* Layout C — floating button: last child so it draws on top */}
      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={() => Alert.alert("Floating button", "You tapped +.")}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f6fa",
  },

  // Layout A
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1F3864",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 14,
  },
  headerTitle: { color: "#ffffff", fontSize: 20, fontWeight: "bold" },
  headerMenu: { color: "#ffffff", fontSize: 16 },

  // Layout B
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    margin: 16,
    paddingVertical: 16,
    borderRadius: 10,
    elevation: 2,
  },
  statColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: { fontSize: 28, fontWeight: "bold", color: "#1F3864" },
  statCaption: { fontSize: 12, color: "#888888", marginTop: 4 },
  divider: {
    width: 1,
    backgroundColor: "#dddddd",
  },

  body: { paddingHorizontal: 16, color: "#555555" },

  // Layout C
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28, // half the width = circle
    backgroundColor: "#1F3864",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabPressed: { opacity: 0.7 },
  fabText: { color: "#ffffff", fontSize: 28, lineHeight: 30 },
});
