// Lab 1 — Tasks 1.4 (Student ID card) and 1.5 (status strip + footer row)
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

const STUDENT_NO = "24704690";

export default function StudentIdCard() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        {/* Task 1.5: coloured status strip */}
        <View style={styles.statusStrip} />

        <View style={styles.content}>
          <Image
            source={{ uri: "https://picsum.photos/300" }}
            style={styles.photo}
          />
          <Text style={styles.name}>Victor Asipali</Text>
          <Text style={styles.number}>{STUDENT_NO}</Text>
          <Text style={styles.programme}>
            Bachelor of Business in IT · Year 3
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() =>
              Alert.alert("Verified", `Student number: ${STUDENT_NO}`)
            }
          >
            <Text style={styles.buttonText}>Verify</Text>
          </Pressable>
        </View>

        {/* Task 1.5: row of three small items */}
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Text style={styles.footerLabel}>Faculty</Text>
            <Text style={styles.footerValue}>Business</Text>
          </View>
          <View style={styles.footerItem}>
            <Text style={styles.footerLabel}>Campus</Text>
            <Text style={styles.footerValue}>Lae</Text>
          </View>
          <View style={styles.footerItem}>
            <Text style={styles.footerLabel}>Expires</Text>
            <Text style={styles.footerValue}>12/2026</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9eef5",
  },
  card: {
    width: "85%",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    overflow: "hidden", // clips the strip to the rounded corners
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  statusStrip: {
    height: 10,
    backgroundColor: "#2e9e4f",
  },
  content: {
    alignItems: "center",
    padding: 24,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  number: {
    fontSize: 14,
    color: "#777777",
    marginBottom: 4,
  },
  programme: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1F3864",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonPressed: { opacity: 0.6 },
  buttonText: { color: "#ffffff", fontWeight: "600" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  footerItem: { alignItems: "center" },
  footerLabel: { fontSize: 11, color: "#888888" },
  footerValue: { fontSize: 13, fontWeight: "600" },
});
