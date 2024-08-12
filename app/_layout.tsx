import { Stack } from 'expo-router';
import { Provider as JotaiProvider } from 'jotai';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toasts } from '@backpackapp-io/react-native-toast';

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <JotaiProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="index" />
        </Stack>
      </JotaiProvider>
      <Toasts />
    </GestureHandlerRootView>
  );
}
