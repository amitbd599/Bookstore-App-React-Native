import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View>
      <Link href={"/(auth)/login"}>Login</Link>
      <Link href={"/(auth)/signup"}>signup</Link>
    </View>
  );
}
