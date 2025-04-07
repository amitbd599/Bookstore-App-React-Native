import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import style from "../../assets/style/login.styles";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import { Link } from "expo-router";
import { useAuthStore } from "../../store/authStore";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let { login, user, token, isLoading } = useAuthStore();

  let handelLogin = async () => {
    let result = await login(email, password);

    if (!result.success) {
      Alert.alert("Error", result.error);
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.container}>
        <View style={style.topIllustration}>
          <Image
            source={require("../../assets/images/book-bro.png")}
            style={style.illustrationImage}
            contentFit='contain'
          />
        </View>
        <View style={style.card}>
          <View style={style.formContainer}>
            {/* Email */}
            <View style={style.inputGroup}>
              <Text style={style.label}>Email</Text>
              <View style={style.inputContainer}>
                <Ionicons
                  name='mail-outline'
                  size={20}
                  color={COLORS.primary}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder='Enter your email'
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize='none'
                />
              </View>
            </View>
            {/* Password */}
            <View style={style.inputGroup}>
              <Text style={style.label}>Password</Text>
              <View style={style.inputContainer}>
                <Ionicons
                  name='lock-closed-outline'
                  size={20}
                  color={COLORS.primary}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder='Enter your password'
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={style.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={COLORS.primary}
                    style={style.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* button */}
            <TouchableOpacity
              style={style.button}
              onPress={handelLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color='#fff' />
              ) : (
                <Text style={style.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <View style={style.footer}>
              <Text style={style.footerText}>Don't have an account?</Text>
              <Link href='/signup' style={style.signupLink} asChild>
                <Text style={style.signupLinkText}>Sign Up</Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default login;
