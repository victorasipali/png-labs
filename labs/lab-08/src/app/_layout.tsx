// Lab 5 — root Stack. The (tabs) group sits inside it, and the detail
// route is a sibling of (tabs), so it pushes OVER the tab bar.
// Import Stack from expo-router, never from @react-navigation/stack.
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1F3864" },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="provinces/[id]" options={{ title: "Province" }} />
    </Stack>
  );
}
