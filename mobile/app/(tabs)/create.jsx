import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import style from "../../assets/style/create.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@/store/authStore";

const create = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState(false);

  let { login, token } = useAuthStore();

  let router = useRouter();

  const pickImage = async () => {
    try {
      let { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Sorry, we need camera permissions to take photos.");
        return;
      }
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }

      if (result.assets[0].base64) {
        setImageBase64(result.assets[0].base64);
      } else {
        let base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: "base64",
        });
        setImageBase64(base64);
      }
    } catch (error) {
      console.log("Error picking image: ", error);
      Alert.alert("Error picking image", error.message);
    }
  };

  let renderRatingPicker = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={style.starButton}
        >
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary}
            style={style.ratingIcon}
          />
        </TouchableOpacity>
      );
    }

    return <View style={style.ratingContainer}>{stars}</View>;
  };

  let handelSubmit = async () => {
    if (!title || !caption || !imageBase64 || !rating) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    try {
      setLoading(true);
      let uriParts = image.split(".");
      let fileType = uriParts[uriParts.length - 1];
      let imageType = fileType
        ? `image/${fileType.toLocaleLowerCase()}`
        : "image/jpeg";
      let imageDataUrl = `data:${imageType};base64,${imageBase64}`;
      let response = await fetch("http://192.168.0.104:8000/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          caption,
          rating,
          image: imageDataUrl,
        }),
      });
      let data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      Alert.alert("Success", "Book recommendation submitted successfully.");
      setTitle("");
      setCaption("");
      setImage("");
      setImageBase64("");
      setRating(3);
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log("Error submitting form: ", error);
      Alert.alert("Error", "Failed to submit the form. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={style.container}
        style={style.scrollViewStyle}
      >
        <View style={style.card}>
          {/* header */}
          <View style={style.header}>
            <Text style={style.title}>Add Book Recommendation</Text>
            <Text style={style.subtitle}>
              Share your favorite reads with others
            </Text>
          </View>

          <View style={style.form}>
            {/* Book title */}
            <View style={style.formGroup}>
              <Text style={style.label}>Book Title</Text>
              <View style={style.inputContainer}>
                <Ionicons
                  name='book-outline'
                  size={20}
                  color={COLORS.textSecondary}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder='Enter book title'
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* Rating */}
            <View style={style.formGroup}>
              <Text style={style.label}>Your Rating</Text>
              {renderRatingPicker()}
            </View>

            {/* Image */}
            <View style={style.formGroup}>
              <Text style={style.label}>Book Image</Text>
              <TouchableOpacity style={style.imagePicker} onPress={pickImage}>
                {image ? (
                  <Image
                    style={style.previewImage}
                    source={{ uri: image }}
                    resizeMode='cover'
                  />
                ) : (
                  <View style={style.placeholderContainer}>
                    <Ionicons
                      name='image-outline'
                      size={40}
                      color={COLORS.textSecondary}
                    />
                    <Text style={style.placeholderText}>Select image</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Caption */}
            <View style={style.formGroup}>
              <Text style={style.label}>Book Caption</Text>

              <TextInput
                style={style.textArea}
                placeholder='Write your review or thought about this book...'
                placeholderTextColor={COLORS.placeholderText}
                value={caption}
                onChangeText={setCaption}
                multiline={true}
              />
            </View>

            {/* Button */}
            <TouchableOpacity
              style={style.button}
              onPress={handelSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons
                    name='book-outline'
                    size={20}
                    color={COLORS.white}
                    style={style.buttonIcon}
                  />

                  <Text style={style.buttonText}>Submit</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default create;

const styles = StyleSheet.create({});
