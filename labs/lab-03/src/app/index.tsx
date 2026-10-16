// Lab 3 — Tasks 3.1–3.4: counter, extended counter, conditional rendering, props
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import StatCard from "../components/StatCard";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Task 3.2 — handlers; the count can never go below zero
  const add = () => setCount(count + 1);
  const subtract = () => {
    if (count > 0) setCount(count - 1);
  };
  const reset = () => setCount(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>

      {/* Task 3.2 — three buttons in an evenly spaced row */}
      <View style={styles.row}>
        <Pressable
          style={[styles.button, count === 0 && styles.faded]}
          onPress={subtract}
          disabled={count === 0}
        >
          <Text style={styles.buttonText}>Subtract one</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={add}>
          <Text style={styles.buttonText}>Add one</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      {/* Task 3.3 — conditional rendering */}
      <Pressable
        style={styles.toggle}
        onPress={() => setShowDetails(!showDetails)}
      >
        <Text style={styles.toggleText}>
          {showDetails ? "Hide details" : "Show details"}
        </Text>
      </Pressable>

      {showDetails && (
        <View style={styles.details}>
          <Text>The current count is {count}.</Text>
          <Text>{count > 9 ? "That is a lot of taps." : "Keep going."}</Text>
        </View>
      )}

      {/* Task 3.4 — one component, three different results */}
      <View style={styles.cards}>
        <StatCard label="Taps" value={count} />
        <StatCard label="Doubled" value={count * 2} />
        <StatCard label="Squared" value={count * count} />
      </View>

      <Link href="/tip" style={styles.link}>
        Open the tip calculator (Task 3.5)
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f4f6fa",
  },
  count: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#1F3864",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  button: {
    backgroundColor: "#1F3864",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  buttonText: { color: "#ffffff", fontWeight: "600" },
  faded: { opacity: 0.4 },
  toggle: { marginTop: 24, padding: 8 },
  toggleText: { color: "#1F3864", fontWeight: "600", fontSize: 16 },
  details: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    alignItems: "center",
  },
  cards: {
    flexDirection: "row",
    width: "100%",
    marginTop: 24,
  },
  link: {
    marginTop: 28,
    color: "#2E5C8A",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
