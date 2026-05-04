
import { Slot, Stack } from 'expo-router';
import '../global.css';
import { AuthProvider } from '@/modules/auth/context';

export default function RootLayout() {

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(user)" options={{ headerShown: false}} />
    </Stack>
    </AuthProvider>
  );
}
