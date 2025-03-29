import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName='login'
    ></Stack>
  );
};

export default AuthLayout;
