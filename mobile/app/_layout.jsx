import { Stack } from "expo-router";
import SafeScreen from "../components/SafeScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }} initialRouteName='(auth)'>
          <Stack.Screen name='index' />
          <Stack.Screen name='(auth)' />
        </Stack>
      </SafeScreen>
      <StatusBar style='dark' />
    </SafeAreaProvider>
  );
}
