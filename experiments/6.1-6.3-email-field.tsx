// Lab 6 — Tasks 6.1–6.3: a single controlled email field with validation
// and keyboard handling. (The final register.tsx replaces this.)
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

export default function EmailField() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (email.trim() === "") {
      setError("Email address is required.");
      return;
    }
    if (!email.includes("@")) {
      setError("Email address must contain an @ symbol.");
      return;
    }
    setError("");
    Alert.alert("Success", "Form is valid.");
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={[styles.input, error !== "" && styles.inputError]}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError(""); // clear as soon as the user corrects it
          }}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {error !== "" && <Text style={styles.error}>{error}</Text>}
        <Text>You typed: {email}</Text>

        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 6,
  },
  inputError: { borderColor: "#c0392b", borderWidth: 2 },
  error: { color: "#c0392b", marginBottom: 8 },
  button: {
    backgroundColor: "#1F3864",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: { color: "#ffffff", fontWeight: "600" },
});
