import { Stack } from 'expo-router';

import { StatusBar } from 'expo-status-bar';

import 'react-native-reanimated';

import Toast from 'react-native-toast-message';

import { AuthProvider } from '../utils/context/AuthContext';

import "@/global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" hidden />
      <Toast />
    </AuthProvider>
  );
}
