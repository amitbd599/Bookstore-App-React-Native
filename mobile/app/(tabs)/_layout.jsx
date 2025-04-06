import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const TabLayout = () => {
  let insets = useSafeAreaInsets();
  return (
    <Tabs
      initialRouteName='create'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        headerTitleStyle: {
          color: COLORS.primary,
          fontWeight: "600",
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingTop: 5,
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='home-outline' size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name='create'
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name='add-circle-outline' size={24} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name='person-outline' size={24} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
