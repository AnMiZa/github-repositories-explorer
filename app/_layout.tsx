import { Stack } from 'expo-router';
import { Provider as JotaiProvider } from 'jotai';

export default function RootLayout() {
  return (
    <JotaiProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="index" />
      </Stack>
    </JotaiProvider>
  );
}
