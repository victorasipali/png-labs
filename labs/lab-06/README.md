# Lab 6 — Forms, Input and Validation

| File | Task |
| --- | --- |
| `experiments/6.1-6.3-email-field.tsx` | 6.1–6.3: one controlled email field, required + `@` rules, error clears on edit, red border, KeyboardAvoidingView + ScrollView |
| `src/app/(tabs)/register.tsx` | 6.4: complete four-field registration form |
| `src/app/(tabs)/_layout.tsx` | adds the Register tab |

## Task 6.1 — the two deliberate breaks

- No `onChangeText`: you can't type. The field shows state, and nothing updates state. That's a **controlled input** — value and update must both be wired.
- No `autoCapitalize="none"`: the first letter of the email capitalises, and sign-in would later fail.

## Task 6.3 — keyboard handling

```tsx
<KeyboardAvoidingView style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}>
  <ScrollView keyboardShouldPersistTaps="handled">...</ScrollView>
</KeyboardAvoidingView>
```

## Task 6.4 — how the rules are met

| Requirement | How |
| --- | --- |
| No empty fields | `validate()` checks each one first |
| Name ≥ 3 characters | `name.trim().length < 3` |
| Email has `@` and a full stop after it | `indexOf("@")` and `lastIndexOf(".")` with text between and after |
| Password ≥ 8 | `password.length < 8` |
| Passwords match | `confirm !== password` |
| Error under its own field | `renderField()` prints `errors[field]` beneath each input |
| Errors not shown on an empty form | `touched` object — set on typing or leaving the field |
| Passwords hidden | `secureTextEntry` |
| Submit disabled + faded until valid | `disabled={!isValid}` + `opacity: 0.4` |
| Success alert without password | alert shows name and email only |

## Tests

`Vi` → name error · `abc@x` → email error · `1234567` → password error · mismatched confirm → error · all valid → button lights up → alert shows name and email.

```
git add .
git commit -m "Lab 6: validated registration form"
```
