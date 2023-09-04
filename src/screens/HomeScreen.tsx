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
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import MasonryList from "reanimated-masonry-list";
import { BlurView } from "expo-blur";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../components/CustomBackdrop";
import FilterView from "../components/FilterView";
import { TabsStackScreenProps } from "../navigators/TabNavigator";
import { Switch } from "react-native-gesture-handler";

const BOOK_CATEGORIES = [
  "Adventure",
  "Mystery",
  "Poetry",
  "Non-Fiction",
  "Fairy Tales and Folklore",
  "Animal Stories",
];

const PROFILE_PICTURE =
  "https://c0.wallpaperflare.com/preview/1015/464/838/adorable-beautiful-boy-child.jpg";

const BOOK_LIST_DATA = [
  {
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/A18OnuYW2dL._AC_UL210_SR210,210_.jpg",
    title: "The Leaf Thief",
    price: 200,
  },
  {
    imageUrl:
      "https://marketplace.canva.com/EAD7WdPHbx8/1/0/1003w/canva-colorful-abstract-adventure-children%27s-book-cover-yT1fFarv3nc.jpg",
    title: "The Adventure of Lily",
    price: 400,
  },
  {
    imageUrl:
      "https://blog-cdn.reedsy.com/uploads/2019/12/grandude-868x1024.jpg",
    title: "Hey Grandude!",
    price: 300,
  },
  {
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5aff8a237e3c3abd03568195/8ac1a9ab-338d-4e35-b3b6-11f30425e82b/Maribel%27s-Year.jpg",
    title: "Maribel's Year",
    price: 280,
  },
  {
    imageUrl:
      "https://marketplace.canva.com/EAD7YHrjZYY/1/0/1003w/canva-blue-illustrated-stars-children%27s-book-cover-haFtaSNXXF4.jpg",
    title: "Journey To The Stars",
    price: 420,
  },
];

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
          <Image
            source={{
              uri: PROFILE_PICTURE,
            }}
            style={{ width: 65, aspectRatio: 1, borderRadius: 30 }}
            resizeMode="cover"
          />
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
              Hi, Aravinda👋
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
              Recently Added Books
            </Text>
            <TouchableOpacity>
              <Text style={{ color: colors.primary }}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", height: 200, gap: 12 }}>
            <Card
              onPress={() => {
                navigation.navigate("Details", {
                  id: "123",
                });
              }}
              price={120}
              imageUrl="https://blog-cdn.reedsy.com/uploads/2019/12/stargazing-705x1024.jpg"
            />
            <View style={{ flex: 1, gap: 12 }}>
              <Card
                onPress={() => {
                  navigation.navigate("Details", {
                    id: "456",
                  });
                }}
                price={120}
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXHiRpFKbETXd35EL-S_zWSkOhBM8eW2PslA&usqp=CAU"
              />
              <Card
                onPress={() => {
                  navigation.navigate("Details", {
                    id: "789",
                  });
                }}
                price={170}
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWF0vBdDYD-FNkcbRsj0tg1RHGjF-1iL_7fQ&usqp=CAU"
              />
            </View>
          </View>
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
                onPress={() => setCategoryIndex(index)}
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

        {/* Mesonary */}
        <MasonryList
          data={BOOK_LIST_DATA}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }: any) => (
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
                    uri: item.imageUrl,
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
                      <Icons
                        name="favorite-border"
                        size={20}
                        color={colors.text}
                      />
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
                      <Icons name="add-shopping-cart" size={18} color="#000" />
                    </TouchableOpacity>
                  </BlurView>
                </View>
              </View>
            </View>
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
        <FilterView />
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
        flex: 1,
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
      }}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
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
