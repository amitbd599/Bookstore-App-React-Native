import {
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

import style from "../../assets/style/create.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/colors";

const create = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState("");

  let router = useRouter();

  let pickImage = () => {};
  let handelSubmit = () => {};
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
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default create;

const styles = StyleSheet.create({});
