import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import style from "../../assets/style/login.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import { Link } from "expo-router";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let handelLogin = () => {};

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
                  onChange={setUserName}
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
                  onChange={setEmail}
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
                  onChange={setPassword}
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
