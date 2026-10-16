// Lab 6 — Task 6.4: complete registration form
// One object for values, one validate() that returns an errors object,
// one "touched" object so errors don't all appear on an empty form.
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
  TextInputProps,
  View,
} from "react-native";

type Form = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

type Field = keyof Form;
type Errors = Partial<Record<Field, string>>;
type Touched = Partial<Record<Field, boolean>>;

const EMPTY: Form = { name: "", email: "", password: "", confirm: "" };

function validate(f: Form): Errors {
  const e: Errors = {};

  if (f.name.trim() === "") e.name = "Full name is required.";
  else if (f.name.trim().length < 3)
    e.name = "Full name must be at least 3 characters.";

  // Must contain an @ and a full stop somewhere after it (with text between)
  const email = f.email.trim();
  const at = email.indexOf("@");
  const dot = email.lastIndexOf(".");
  if (email === "") e.email = "Email address is required.";
  else if (at < 1 || dot < at + 2 || dot === email.length - 1)
    e.email = "Enter a valid email, e.g. name@unitech.ac.pg.";

  if (f.password === "") e.password = "Password is required.";
  else if (f.password.length < 8)
    e.password = "Password must be at least 8 characters.";

  if (f.confirm === "") e.confirm = "Please confirm your password.";
  else if (f.confirm !== f.password) e.confirm = "Passwords do not match.";

  return e;
}

export default function RegisterScreen() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [touched, setTouched] = useState<Touched>({});

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  function update(field: Field, value: string) {
    setForm({ ...form, [field]: value });
    setTouched({ ...touched, [field]: true });
  }

  function handleSubmit() {
    if (!isValid) return;
    // Summary shows name and email — never the password
    Alert.alert(
      "Registration successful",
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}`
    );
    setForm(EMPTY);
    setTouched({});
  }

  // Renders one labelled field with its own error directly beneath it
  function renderField(
    field: Field,
    label: string,
    inputProps: TextInputProps = {}
  ) {
    const showError = touched[field] && errors[field];
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={[styles.input, showError ? styles.inputError : null]}
          value={form[field]}
          onChangeText={(text) => update(field, text)}
          onBlur={() => setTouched({ ...touched, [field]: true })}
          {...inputProps}
        />
        {showError ? <Text style={styles.error}>{errors[field]}</Text> : null}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create an account</Text>

        {renderField("name", "Full name", {
          placeholder: "e.g. Victor Asipali",
          autoCapitalize: "words",
        })}
        {renderField("email", "Email address", {
          placeholder: "name@example.com",
          keyboardType: "email-address",
          autoCapitalize: "none",
          autoCorrect: false,
        })}
        {renderField("password", "Password", {
          placeholder: "At least 8 characters",
          secureTextEntry: true,
          autoCapitalize: "none",
        })}
        {renderField("confirm", "Confirm password", {
          placeholder: "Type it again",
          secureTextEntry: true,
          autoCapitalize: "none",
        })}

        <Pressable
          style={({ pressed }) => [
            styles.submit,
            !isValid && styles.submitDisabled,
            pressed && isValid && styles.submitPressed,
          ]}
          disabled={!isValid}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Register</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#f4f6fa" },
  form: { padding: 20, paddingBottom: 60 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F3864",
    marginBottom: 16,
  },
  field: { marginBottom: 14 },
  label: { fontSize: 14, color: "#555555", marginBottom: 6 },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: { borderColor: "#c0392b", borderWidth: 2 },
  error: { color: "#c0392b", fontSize: 13, marginTop: 4 },
  submit: {
    backgroundColor: "#1F3864",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitDisabled: { opacity: 0.4 },
  submitPressed: { opacity: 0.7 },
  submitText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
});
