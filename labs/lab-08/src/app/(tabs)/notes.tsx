// Lab 8 — Tasks 8.2–8.4: notes that survive a restart, delete confirmation,
// location attached to each note, and graceful handling when location is refused.
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AppState,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  getPosition,
  hasLocationPermission,
} from "../../services/location";
import { loadNotes, Note, saveNotes } from "../../services/notesStorage";

const TOWNS = ["Lae", "Port Moresby", "Mount Hagen", "Goroka", "Madang"];

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [adding, setAdding] = useState(false);

  // Location state
  const [locMessage, setLocMessage] = useState("");
  const [canAskAgain, setCanAskAgain] = useState(true);
  const [town, setTown] = useState<string | null>(null);
  const [lastPosition, setLastPosition] = useState<string>("");

  // 1. Load once when the screen first opens
  useEffect(() => {
    loadNotes()
      .then(setNotes)
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  }, []);

  // 2. Save automatically whenever notes change — but only AFTER the first
  //    load, otherwise the initial [] would overwrite the stored notes.
  useEffect(() => {
    if (loaded) saveNotes(notes);
  }, [notes, loaded]);

  // 3. If the user grants permission in Settings and comes back,
  //    clear the refusal message without reinstalling.
  useEffect(() => {
    const sub = AppState.addEventListener("change", async (state) => {
      if (state === "active" && (await hasLocationPermission())) {
        setLocMessage("");
        setCanAskAgain(true);
      }
    });
    return () => sub.remove();
  }, []);

  async function requestLocation() {
    const result = await getPosition();
    if (result.ok) {
      setLocMessage("");
      const label = `${result.latitude.toFixed(4)}, ${result.longitude.toFixed(4)}`;
      setLastPosition(label);
      return { latitude: result.latitude, longitude: result.longitude };
    }
    setCanAskAgain(result.canAskAgain);
    setLocMessage(
      result.reason === "denied"
        ? "Location access was refused, so new notes won't record where they were written. Pick a town below instead, or allow location in Settings."
        : "Your location couldn't be found (is GPS switched on?). Pick a town below instead."
    );
    return null;
  }

  async function addNote() {
    const trimmed = text.trim();
    if (trimmed === "") return;
    setAdding(true);
    const coords = await requestLocation(); // null when refused — still saves
    const note: Note = {
      id: Date.now().toString(),
      text: trimmed,
      createdAt: new Date().toISOString(),
      coords,
      place: coords ? null : town,
    };
    setNotes((prev) => [note, ...prev]); // newest first
    setText("");
    setAdding(false);
  }

  function confirmDelete(id: string) {
    Alert.alert("Delete note?", "This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setNotes((prev) => prev.filter((n) => n.id !== id)),
      },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1F3864" />
        <Text style={styles.muted}>Loading notes…</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Add a note */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Write a short note"
          returnKeyType="done"
          onSubmitEditing={addNote}
        />
        <Pressable
          style={[
            styles.addButton,
            (text.trim() === "" || adding) && styles.faded,
          ]}
          onPress={addNote}
          disabled={text.trim() === "" || adding}
        >
          {adding ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.addText}>Add</Text>
          )}
        </Pressable>
      </View>

      {/* Task 8.3: show my position */}
      <View style={styles.locationBar}>
        <Pressable style={styles.locButton} onPress={requestLocation}>
          <Text style={styles.locButtonText}>Get my location</Text>
        </Pressable>
        {lastPosition !== "" && (
          <Text style={styles.muted}>Last position: {lastPosition}</Text>
        )}
      </View>

      {/* Task 8.4: refusal handling with a fallback */}
      {locMessage !== "" && (
        <View style={styles.warning}>
          <Text style={styles.warningText}>{locMessage}</Text>
          <View style={styles.townRow}>
            {TOWNS.map((t) => (
              <Pressable
                key={t}
                onPress={() => setTown(t)}
                style={[styles.townChip, town === t && styles.townChipSelected]}
              >
                <Text
                  style={town === t ? styles.townTextSelected : styles.townText}
                >
                  {t}
                </Text>
              </Pressable>
            ))}
          </View>
          {!canAskAgain && (
            <Pressable onPress={() => Linking.openSettings()}>
              <Text style={styles.settingsLink}>Open Settings to allow location</Text>
            </Pressable>
          )}
        </View>
      )}

      <FlatList
        data={notes}
        keyExtractor={(n) => n.id}
        contentContainerStyle={notes.length === 0 && styles.emptyContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No notes yet. Add your first one above.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.noteRow}>
            <View style={styles.noteBody}>
              <Text style={styles.noteText}>{item.text}</Text>
              <Text style={styles.noteMeta}>
                {new Date(item.createdAt).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {" · "}
                {item.coords
                  ? `${item.coords.latitude.toFixed(3)}, ${item.coords.longitude.toFixed(3)}`
                  : item.place ?? "No location"}
              </Text>
            </View>
            <Pressable
              style={styles.deleteButton}
              onPress={() => confirmDelete(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f4f6fa" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  muted: { color: "#777777", marginTop: 6 },
  inputRow: { flexDirection: "row", padding: 12 },
  input: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#1F3864",
    borderRadius: 8,
    paddingHorizontal: 18,
    justifyContent: "center",
    minWidth: 70,
    alignItems: "center",
  },
  addText: { color: "#ffffff", fontWeight: "600" },
  faded: { opacity: 0.4 },
  locationBar: { paddingHorizontal: 12, paddingBottom: 8 },
  locButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#1F3864",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  locButtonText: { color: "#1F3864", fontWeight: "600" },
  warning: {
    marginHorizontal: 12,
    marginBottom: 8,
    padding: 12,
    backgroundColor: "#fff4e5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#f0b357",
  },
  warningText: { color: "#7a4b00", marginBottom: 8 },
  townRow: { flexDirection: "row", flexWrap: "wrap" },
  townChip: {
    borderWidth: 1,
    borderColor: "#1F3864",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
    backgroundColor: "#ffffff",
  },
  townChipSelected: { backgroundColor: "#1F3864" },
  townText: { color: "#1F3864", fontSize: 13 },
  townTextSelected: { color: "#ffffff", fontSize: 13 },
  settingsLink: {
    color: "#2E5C8A",
    textDecorationLine: "underline",
    marginTop: 4,
  },
  separator: { height: 1, backgroundColor: "#e0e0e0" },
  emptyContainer: { flexGrow: 1, justifyContent: "center" },
  empty: { textAlign: "center", color: "#888888", fontSize: 16, padding: 24 },
  noteRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  noteBody: { flex: 1 },
  noteText: { fontSize: 16 },
  noteMeta: { fontSize: 12, color: "#888888", marginTop: 4 },
  deleteButton: { paddingVertical: 6, paddingHorizontal: 10 },
  deleteText: { color: "#c0392b", fontWeight: "600" },
});
