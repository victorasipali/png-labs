// Lab 8 — Tasks 8.1 / 8.2: AsyncStorage helpers.
// AsyncStorage stores STRINGS only: JSON.stringify going in, JSON.parse coming out.
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Note = {
  id: string;
  text: string;
  createdAt: string; // ISO date
  coords: { latitude: number; longitude: number } | null;
  place: string | null; // town chosen manually when location is refused
};

const KEY = "notes";

export async function saveNotes(notes: Note[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(notes));
}

export async function loadNotes(): Promise<Note[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    // getItem returns null on the very first launch
    return raw ? (JSON.parse(raw) as Note[]) : [];
  } catch {
    // Corrupt data should not crash the app
    return [];
  }
}
