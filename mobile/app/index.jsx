import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Index() {
  let { user, token, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);


  let logoutFun = () => {
    logout();
  };

  return (
    <View>
      <Link href={"/(auth)/login"}>Login</Link>
      <Link href={"/(auth)/signup"}>signup</Link>

      {token && <Text>Welcome {user?.userName}</Text>}

      <TouchableOpacity onPress={logoutFun}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
