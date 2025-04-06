import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import style from "../../assets/style/login.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import { Link } from "expo-router";
import { useAuthStore } from "../../store/authStore";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  let { register, user, token, isLoading } = useAuthStore();

  let handelRegister = async () => {
    console.log(userName, email, password);
    let result = await register(userName, email, password);
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
        <View style={style.card}>
          {/* header */}
          <View style={style.header}>
            <Text style={style.title}>BookShop🥳</Text>
            <Text style={style.subtitle}>
              Book lovers, let's shop together!
            </Text>
          </View>
          <View style={style.formContainer}>
            {/* Email */}
            <View style={style.inputGroup}>
              <Text style={style.label}>User Name</Text>
              <View style={style.inputContainer}>
                <Ionicons
                  name='person-outline'
                  size={20}
                  color={COLORS.primary}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder='Enter user name'
                  placeholderTextColor={COLORS.placeholderText}
                  value={userName}
                  onChangeText={setUserName}
                  autoCapitalize='none'
                />
              </View>
            </View>
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
              onPress={handelRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color='#fff' />
              ) : (
                <Text style={style.buttonText}>Register</Text>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <View style={style.footer}>
              <Text style={style.footerText}>Already have an account?</Text>
              <Link href='/login' style={style.signupLink} asChild>
                <Text style={style.signupLinkText}>Login</Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default signup;
