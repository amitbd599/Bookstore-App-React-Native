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

      const response = await fetch(
        `http://192.168.0.104:8000/api/book?page=${pageNum}&limit=5`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(`📦 Page ${pageNum}`, data.books);

      if (!response.ok)
        throw new Error(data.message || "Something went wrong.");

      setBooks((prev) => {
        const combined = refresh ? data.books : [...prev, ...data.books];
        const unique = combined.filter(
          (book, index, self) =>
            index === self.findIndex((b) => b._id === book._id)
        );
        return unique;
      });

      setPage(data.currentPage);
      setHasMore(data.currentPage < data.totalPages);
    } catch (error) {
      console.error("❌ fetchBooks error:", error.toString());
    } finally {
      if (refresh) setRefreshing(false);
      else setLoading(false);
    }
  };

  let loadMore = async () => {
    console.log("Loading more books...");
    if (hasMore) {
      const nextPage = page + 1;
      await fetchBooks(nextPage);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const uniqueBooks = books.filter(
    (book, index, self) => index === self.findIndex((b) => b._id === book._id)
  );

  console.log(uniqueBooks);

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
        <View>
          <Text style={style.caption}>{item.caption}</Text>
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
        data={uniqueBooks}
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
        ListEmptyComponent={
          <View style={style.emptyContainer}>
            <Ionicons
              name='book-outline'
              size={60}
              color={COLORS.textSecondary}
            />
            <Text style={style.emptyText}>No books found.</Text>
          </View>
        }
        onEndReached={loadMore}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
