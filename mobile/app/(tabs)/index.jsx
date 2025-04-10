import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Image } from "expo-image";
import style from "../../assets/style/home.styles";
import COLORS from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
const index = () => {
  let { token } = useAuthStore();
  let [books, setBooks] = useState([]);
  let [loading, setLoading] = useState(true);
  let [refreshing, setRefreshing] = useState(false);
  let [page, setPage] = useState(1);
  let [hasMore, setHasMore] = useState(true);

  let fetchBooks = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true);
      else if (pageNum === 1) setLoading(true);

      let response = await fetch(
        `http://192.168.0.104:8000/api/book?page=${pageNum}&limit=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }
      setBooks((prevBooks) => [...prevBooks, ...data.books]);
      setHasMore(data.currentPage < data.totalPages);
      setPage(pageNum);
    } catch (error) {
      console.log(error.toString());
      setLoading(false);
    } finally {
      if (refresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  let loadMore = async () => {};

  useEffect(() => {
    fetchBooks();
  }, []);

  console.log(books[0]?.user?.profileImage);

  let renderItem = ({ item }) => {
    return (
      <View style={style.bookCard}>
        <View style={style.bookHeader}>
          <View style={style.userInfo}>
            <Image source={item?.user?.profileImage} style={style.avatar} />
            <Text style={style.username}>{item.user.userName}</Text>
          </View>
        </View>
        <View style={style.bookImageContainer}>
          <Image
            source={item.image}
            style={style.bookImage}
            contentFit='cover'
          />
        </View>
        <View style={style.bookDetails}>
          <Text style={style.bookTitle}>{item.title}</Text>
          <View style={style.ratingContainer}>
            {renderRatingStars(item.rating)}
          </View>
        </View>
      </View>
    );
  };

  let renderRatingStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={24}
          color={i <= rating ? "#f4b400" : COLORS.textSecondary}
        />
      );
    }
    return stars;
  };

  return (
    <View style={style.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={style.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={style.header}>
            <Text style={style.headerTitle}>Books</Text>
            <Text style={style.headerSubtitle}>
              Discover new books and share your.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
