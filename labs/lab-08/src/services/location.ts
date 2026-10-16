// Lab 8 — Tasks 8.3 / 8.4: location with proper permission handling
import * as Location from "expo-location";

export type PositionResult =
  | { ok: true; latitude: number; longitude: number }
  | { ok: false; reason: "denied" | "unavailable"; canAskAgain: boolean };

// Asks for permission every call, so granting it later (in Settings)
// starts working without reinstalling the app.
export async function getPosition(): Promise<PositionResult> {
  try {
    const perm = await Location.requestForegroundPermissionsAsync();
    if (perm.status !== "granted") {
      return { ok: false, reason: "denied", canAskAgain: perm.canAskAgain };
    }
    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      ok: true,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch {
    // Permission granted but GPS off / no fix
    return { ok: false, reason: "unavailable", canAskAgain: true };
  }
}

// Checks without showing a prompt (used when the app returns to the foreground)
export async function hasLocationPermission() {
  const perm = await Location.getForegroundPermissionsAsync();
  return perm.status === "granted";
}
