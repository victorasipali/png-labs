// Lab 3 — Task 3.5: tip calculator
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const TIP_OPTIONS = [5, 10, 15];

export default function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(10);
  const [people, setPeople] = useState(1);

  // TextInput always gives a string — convert and guard it
  const amount = parseFloat(bill);
  const isValid = bill.trim() !== "" && !isNaN(amount) && amount > 0;

  const tipAmount = isValid ? (amount * tip) / 100 : 0;
  const total = isValid ? amount + tipAmount : 0;
  const perPerson = isValid ? total / people : 0;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Tip Calculator</Text>

      <Text style={styles.label}>Bill amount (K)</Text>
      <TextInput
        style={styles.input}
        value={bill}
        onChangeText={setBill}
        keyboardType="numeric"
        placeholder="e.g. 100"
      />

      <Text style={styles.label}>Tip</Text>
      <View style={styles.row}>
        {TIP_OPTIONS.map((p) => (
          <Pressable
            key={p}
            onPress={() => setTip(p)}
            style={[styles.tipButton, tip === p && styles.tipSelected]}
          >
            <Text style={tip === p ? styles.tipTextSelected : styles.tipText}>
              {p}%
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Number of people</Text>
      <View style={styles.peopleRow}>
        <Pressable
          style={[styles.stepButton, people === 1 && styles.faded]}
          onPress={() => setPeople(Math.max(1, people - 1))}
          disabled={people === 1}
        >
          <Text style={styles.stepText}>−</Text>
        </Pressable>
        <Text style={styles.peopleCount}>{people}</Text>
        <Pressable
          style={styles.stepButton}
          onPress={() => setPeople(people + 1)}
        >
          <Text style={styles.stepText}>+</Text>
        </Pressable>
      </View>

      {/* Hidden until a valid bill amount has been entered */}
      {isValid && (
        <View style={styles.results}>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Tip ({tip}%)</Text>
            <Text style={styles.resultValue}>K{tipAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Total</Text>
            <Text style={styles.resultValue}>K{total.toFixed(2)}</Text>
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Per person</Text>
            <Text style={styles.perPerson}>K{perPerson.toFixed(2)}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f6fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F3864",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
  },
  row: { flexDirection: "row" },
  tipButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1F3864",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  tipSelected: { backgroundColor: "#1F3864" },
  tipText: { color: "#1F3864", fontWeight: "600" },
  tipTextSelected: { color: "#ffffff", fontWeight: "600" },
  peopleRow: { flexDirection: "row", alignItems: "center" },
  stepButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1F3864",
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: { color: "#ffffff", fontSize: 24, fontWeight: "bold" },
  faded: { opacity: 0.4 },
  peopleCount: { fontSize: 22, fontWeight: "bold", marginHorizontal: 24 },
  results: {
    marginTop: 24,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  resultLabel: { fontSize: 16, color: "#555555" },
  resultValue: { fontSize: 16, fontWeight: "600" },
  perPerson: { fontSize: 20, fontWeight: "bold", color: "#1F3864" },
});
