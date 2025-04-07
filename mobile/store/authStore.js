import { create } from "zustand";
import axios from "axios";
let baseUrl = "http://192.168.0.104:8000/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,

  register: async (userName, email, password) => {
    set({ isLoading: true });
    try {
      let response = await fetch(baseUrl + "/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });
      let data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);
      set({ token: data.token, user: data.user, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      let userJson = await AsyncStorage.getItem("user");

      let user = userJson ? JSON.parse(userJson) : null;


      set({ token, user });
    } catch (error) {
      console.log("Auth check failed: ", error);
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      set({ token: null, user: null });
    } catch (error) {
      console.log("Logout failed: ", error);
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      let response = await fetch(baseUrl + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      let data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);
      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
}));
