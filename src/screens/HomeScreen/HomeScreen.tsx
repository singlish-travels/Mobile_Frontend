import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Appearance,
} from "react-native";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import MasonryList from "reanimated-masonry-list";
import { BlurView } from "expo-blur";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../components/CustomBackdrop";
import FilterView from "../../components/FilterView";
import { TabsStackScreenProps } from "../../navigators/TabNavigator";
import { Switch } from "react-native-gesture-handler";
import getPriceBook from "../../api/home/price_book";
import getGenreBook from "../../api/home/genre_book";
import getPublisher from "../../api/profile/get_user";
import jwt from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getFilterBook from "../../api/home/get_filter_book";
import getBookCart from "../../api/cart/getBook";
import getBookFavorite from "../../api/favorite/getBooks";

const BOOK_CATEGORIES = [
  "All",
  "Adventure",
  "Mystery",
  "Poetry",
  "Non-Fiction",
  "Fairy Tales and Folklore",
  "Animal Stories",
];

const PROFILE_PICTURE =
  "https://c0.wallpaperflare.com/preview/1015/464/838/adorable-beautiful-boy-child.jpg";

const HomeScreen = ({ navigation }: TabsStackScreenProps<"Home">) => {
  Appearance.addChangeListener((scheme) => {
    console.log(scheme.colorScheme);
  });
  const { colors } = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openFilterModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const [BOOK_LIST_DATA, setBOOK_LIST_DATA] = useState([]) as any;
  const [Free_Book, setFree_Book] = useState([]) as any;

  const [username, setUsername] = useState("");

  interface DecodedToken {
    _id: string;
  }

  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [clickFilter, setClickFilter] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [cart, setCart] = useState([]) as any;
  const [favorite, setFavorite] = useState([]) as any;

  const fetchFreeBooks = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt(token) as DecodedToken;
      const responseUserData = await getPublisher(decodedToken._id);
      setUsername(responseUserData.user[0].username);
      setImageLink(responseUserData.user[0].image_link);
      const responseCartData = await getBookCart(decodedToken._id);
      responseCartData.Cart.forEach((item: any) => {
        setCart((cart: any) => [...cart, item.book_id]);
      });

      const responseFavoriteData = await getBookFavorite(decodedToken._id);
      responseFavoriteData.Favorite.forEach((item: any) => {
        setFavorite((favorite: any) => [...favorite, item.book_id]);
      });

      if (clickFilter) {
        bottomSheetModalRef.current?.dismiss();
        const responseData = await getFilterBook(
          startPrice,
          endPrice,
          genre,
          author
        );
        setBOOK_LIST_DATA(responseData.response);
      } else {
        try {
          if (categoryIndex === 0) {
            const responseData = await getPriceBook(0, 10000);
            setBOOK_LIST_DATA(responseData.response);
          } else {
            const responseData = await getGenreBook(
              BOOK_CATEGORIES[categoryIndex]
            );
            setBOOK_LIST_DATA(responseData.response);
          }
          const responseData = await getPriceBook(0, 0);
          setFree_Book(responseData.response);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchFreeBooks();
  }, [categoryIndex, clickFilter, startPrice, endPrice, genre, author]);

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          paddingVertical: 25,
          gap: 25,
          paddingHorizontal: 2,
          backgroundColor: colors.background,
        }}
      >
        {/* Header Section */}
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          {imageLink === "" ? (
            <Image
              source={{
                uri: PROFILE_PICTURE,
              }}
              style={{ width: 65, aspectRatio: 1, borderRadius: 30 }}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{
                uri: imageLink,
              }}
              style={{ width: 65, aspectRatio: 1, borderRadius: 30 }}
              resizeMode="cover"
            />
          )}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                marginBottom: 1,
                color: colors.text,
              }}
              numberOfLines={1}
            >
              Hi, {username}👋
            </Text>
            <Text
              style={{ color: colors.text, opacity: 0.5 }}
              numberOfLines={2}
            >
              Explore Boundless Worlds though the books!!!
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Switch />
          </TouchableOpacity>
        </View>

        {/* Search Bar Section */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            gap: 12,
            paddingVertical: 2,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              height: 52,
              borderRadius: 52,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              paddingHorizontal: 24,
              flexDirection: "row",
              gap: 12,
            }}
          >
            <Icons
              name="search"
              size={24}
              color={colors.text}
              style={{ opacity: 0.5 }}
            />
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: colors.text,
                opacity: 0.5,
              }}
            >
              Search for books...
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openFilterModal}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              backgroundColor: colors.primary,
            }}
          >
            <Icons name="tune" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>

        {/* Grid Collection View */}
        <View style={{ paddingHorizontal: 24 }}>
          {/* Title bar */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "700", color: colors.text }}
            >
              Free Books
            </Text>
            <TouchableOpacity>
              <Text style={{ color: colors.primary }}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 2 }}
          >
            <View style={{ flexDirection: "row" }}>
              {Free_Book.map(
                (
                  book: { _id: string; price: number; coverpage: string },
                  index: React.Key
                ) => (
                  // Check if book.price is equal to 0 before rendering the Card
                  <Card
                    key={index} // Don't forget to add a unique key prop when mapping over an array
                    onPress={() => {
                      navigation.navigate("Details", {
                        id: book._id, // Pass book._id as the 'id' parameter to the "Details" page
                      });
                    }}
                    price={book.price}
                    imageUrl={book.coverpage}
                  />
                )
              )}
            </View>
          </ScrollView>
        </View>

        {/* BOOK_CATEGORIES Section */}
        <FlatList
          data={BOOK_CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            gap: 8,
          }}
          renderItem={({ item, index }) => {
            const isSelected = categoryIndex === index;
            return (
              <TouchableOpacity
                onPress={() => {
                  setCategoryIndex(index);
                  setClickFilter(false);
                }}
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 100,
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? colors.background : colors.text,
                    fontWeight: "600",
                    fontSize: 14,
                    opacity: isSelected ? 1 : 0.5,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {clickFilter ? (
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Filter View
            </Text>
          ) : null}
        </View>

        {/* Mesonary */}
        <MasonryList
          data={BOOK_LIST_DATA}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }: any) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Details", {
                  id: item._id,
                });
              }}
            >
              <View style={{ padding: 6 }}>
                <View
                  style={{
                    aspectRatio: i === 0 ? 1 : 2 / 3,
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 24,
                  }}
                >
                  <Image
                    source={{
                      uri: item.coverpage,
                    }}
                    resizeMode="cover"
                    style={StyleSheet.absoluteFill}
                  />
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        padding: 12,
                      },
                    ]}
                  >
                    <View style={{ flexDirection: "row", gap: 8, padding: 4 }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 16,
                          fontWeight: "900",
                          color: "#000",
                          textShadowColor: "rgba(0,0,0,0.2)",
                          textShadowOffset: {
                            height: 1,
                            width: 0,
                          },
                          textShadowRadius: 4,
                        }}
                      >
                        {item.title}
                      </Text>
                      <View
                        style={{
                          backgroundColor: colors.card,
                          borderRadius: 100,
                          height: 32,
                          aspectRatio: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {favorite.includes(item._id) ? (
                          <Icons
                            name="favorite"
                            size={20}
                            color={colors.text}
                          />
                        ) : (
                          <Icons
                            name="favorite-border"
                            size={20}
                            color={colors.text}
                          />
                        )}
                      </View>
                    </View>
                    <View style={{ flex: 1 }} />
                    <BlurView
                      style={{
                        flexDirection: "row",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        alignItems: "center",
                        padding: 6,
                        borderRadius: 100,
                        overflow: "hidden",
                      }}
                      intensity={20}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#fff",
                          marginLeft: 8,
                        }}
                        numberOfLines={1}
                      >
                        Rs.{item.price}
                      </Text>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderRadius: 100,
                          backgroundColor: "#fff",
                        }}
                      >
                        {cart.includes(item._id) ? (
                          <Icons name="shopping-cart" size={18} color="#000" />
                        ) : (
                          <Icons
                            name="add-shopping-cart"
                            size={18}
                            color="#000"
                          />
                        )}
                      </TouchableOpacity>
                    </BlurView>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          onEndReachedThreshold={0.1}
        />
      </SafeAreaView>

      <BottomSheetModal
        snapPoints={["85%"]}
        index={0}
        ref={bottomSheetModalRef}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.card,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <FilterView
          startprice={setStartPrice}
          endprice={setEndPrice}
          genre={setGenre}
          author={setAuthor}
          clickable={setClickFilter}
        />
      </BottomSheetModal>
    </ScrollView>
  );
};

export default HomeScreen;

const Card = ({
  price,
  imageUrl,
  onPress,
}: {
  price: number;
  imageUrl: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 150, // Set the width to 160 pixels
        height: 200, // Set a fixed height
        marginRight: 16,
        borderRadius: 24, // Apply borderRadius to round corners
        overflow: "hidden", // Clip content to the rounded corners
      }}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: "rgba(0,0,0,0.25)",
          borderRadius: 100,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
          Rs.{price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
