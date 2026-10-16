// Root layout: header hidden on the counter, shown on the tip calculator
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="tip" options={{ title: "Tip Calculator" }} />
    </Stack>
  );
}
