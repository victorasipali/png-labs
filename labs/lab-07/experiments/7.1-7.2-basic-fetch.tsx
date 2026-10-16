// Lab 7 — Tasks 7.1 + 7.2: basic fetch for Lae, with try/catch/finally,
// response.ok check, error message and a "Try again" button.
// (The final weather.tsx replaces this.)
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const URL =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=-6.73&longitude=147.00&current=temperature_2m";

export default function BasicWeather() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`Server error (${response.status})`);
      }
      const json = await response.json();
      setTemperature(json.current.temperature_2m);
    } catch {
      setError("Could not load the weather. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  // [] = run once when the screen mounts
  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Pressable style={styles.button} onPress={load}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.temp}>{temperature} °C</Text>
      <Text>Lae, right now</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  temp: { fontSize: 56, fontWeight: "bold", color: "#1F3864" },
  error: { color: "#c0392b", textAlign: "center", marginBottom: 16 },
  button: {
    backgroundColor: "#1F3864",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: { color: "#ffffff", fontWeight: "600" },
});
