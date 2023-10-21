import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { RootStackScreenProps } from "../../navigators/RootNavigator";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Link, useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import getdetails from "../../api/details/details";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt from "jwt-decode";
import addToCart from "../../api/cart/add_to_cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import addToFavorite from "../../api/favorite/addFavorite";

const openUnityLink = async () => {
  const appExist = await Linking.openURL("unitydl://mylink?blankAR");
  if (appExist) {
    await Linking.openURL("unitydl://mylink?blankAR");
  } else {
    await Linking.openURL("https://interactive-book-reader.web.app");
  }
};
const DetailsScreen = ({
  navigation,
  route: {
    params: { id },
  },
}: RootStackScreenProps<"Details">) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState(1);
  const [book, setBook] = useState({} as any);
  const [userId, setUserID] = useState("");
  const [inCart, setInCart] = useState(false);
  const [inFavorite, setInFavorite] = useState(false);

  interface DecodedToken {
    _id: string;
  }

  const fetchdata = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt(token) as DecodedToken;
      setUserID(decodedToken._id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBook = async () => {
    const data = await getdetails(id);
    setBook(data);
  };

  useEffect(() => {
    fetchBook();
    fetchdata();
  }, []);

  const AddToCart = async () => {
    setInCart(true);
    const CartData = {
      user_id: userId,
      book_id: id,
    };
    console.log(CartData);
    try {
      const responseData = await addToCart(CartData);
      if (responseData.message === "book is added successfully.") {
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addToFavoriteList = async () => {
    setInFavorite(true);
    const FavoriteData = {
      user_id: userId,
      book_id: id,
    };
    console.log(FavoriteData);

    try {
      const responseData = await addToFavorite(FavoriteData);
      if (responseData.message === "book is added successfully.") {
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeFromFavorite = async () => {
    setInFavorite(false);
  };
  const removeFromCart = async () => {
    setInCart(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: book.coverpage,
        }}
        style={{ flex: 1 }}
        resizeMode="cover"
      />

      <SafeAreaView
        edges={["top"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <StatusBar style="dark" />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            gap: 8,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 32,
              borderWidth: 3,
              borderColor: "#000",
            }}>
            <Icons name="arrow-back" size={34} color={"#000"} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            onPress={inFavorite ? removeFromFavorite : addToFavoriteList}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 3,
              borderColor: "#000",
            }}>
            <Icons
              name={inFavorite ? "favorite" : "favorite-border"}
              size={34}
              color={"#000"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={inCart ? removeFromCart : AddToCart}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 3,
              borderColor: "#000",
            }}>
            <Icons
              name={inCart ? "shopping-cart" : "add-shopping-cart"}
              size={34}
              color={"#000"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <BottomSheet
        detached
        snapPoints={[64, 500]}
        index={0}
        style={{ marginHorizontal: 10 }}
        bottomInset={insets.bottom + 10}
        backgroundStyle={{
          borderRadius: 30,
          backgroundColor: colors.background,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.text,
        }}>
        <View style={{ padding: 16, gap: 16, flex: 1 }}>
          <Text style={{ fontSize: 27, fontWeight: "700", color: colors.text }}>
            {book.title}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", gap: 2 }}>
                {new Array(5).fill("").map((_, i) => (
                  <Icons
                    key={i}
                    name={i < 3 ? "star" : "star-border"}
                    color="#facc15"
                    size={26}
                  />
                ))}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.text,
                  opacity: 0.5,
                  marginTop: 4,
                }}>
                3.0 (250K Reviews)
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                backgroundColor: colors.primary,
                padding: 6,
                borderRadius: 80,
              }}>
              <TouchableOpacity
                onPress={() => setCount((count) => Math.max(1, count - 1))}
                style={{
                  backgroundColor: colors.card,
                  width: 34,
                  aspectRatio: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 34,
                }}>
                <Icons name="remove" size={20} color={colors.text} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.background,
                }}>
                {count}
              </Text>
              <TouchableOpacity
                onPress={() => setCount((count) => Math.min(10, count + 1))}
                style={{
                  backgroundColor: colors.card,
                  width: 34,
                  aspectRatio: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 34,
                }}>
                <Icons name="add" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  width: 60,
                  aspectRatio: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#000",
                }}
                onPress={() =>
                  navigation.navigate("PdfScreen", { link: book.pdf })
                }>
                <MaterialIcons name="menu-book" size={44} color={Colors.text} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  fontSize: 28,
                  fontWeight: "400",
                  color: colors.text,
                  padding: 10,
                }}>
                Read the book...
              </Text>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  width: 60,
                  aspectRatio: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#000",
                }}
                onPress={openUnityLink}>
                <MaterialIcons
                  name="3d-rotation"
                  size={44}
                  color={Colors.text}
                />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  fontSize: 28,
                  fontWeight: "400",
                  color: colors.text,
                  padding: 10,
                }}>
                Visit AR...
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 6,
                color: colors.text,
              }}>
              Summary:
            </Text>
            <Text
              style={{ color: colors.text, opacity: 0.75 }}
              numberOfLines={3}>
              {book.summary}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.text,
              }}>
              Author: {book.author}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.text,
              }}>
              Genre: {book.genre}
            </Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default DetailsScreen;
