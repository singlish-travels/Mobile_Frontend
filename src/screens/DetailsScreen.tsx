import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { RootStackScreenProps } from "../navigators/RootNavigator";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialIcons } from '@expo/vector-icons';

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

const DetailsScreen = ({
  navigation,
  route: {
    params: { id },
  },
}: RootStackScreenProps<"Details">) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(SIZES[0]);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: "https://wimpykid.com/wp-content/uploads/2023/02/DWK18_3D-Cover_HiRes.png",
        }}
        style={{ flex: 1 }}
      />

      <SafeAreaView
        edges={["top"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0 }}
      >
        <StatusBar style="dark" />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            gap: 8,
          }}
        >
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
            }}
          >
            <Icons name="arrow-back" size={34} color={"#000"} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 3,
              borderColor: "#000",
            }}
          >
            <Icons name="favorite-border" size={34} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 3,
              borderColor: "#000",
            }}
          >
            <Icons name="add-shopping-cart" size={34} color={"#000"} />
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
        }}
      >
        <View style={{ padding: 16, gap: 16, flex: 1 }}>
          <Text style={{ fontSize: 27, fontWeight: "700", color: colors.text }}>
            Diary of a Wimpy Kid
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
                }}
              >
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
              }}
            >
              <TouchableOpacity
                onPress={() => setCount((count) => Math.max(1, count - 1))}
                style={{
                  backgroundColor: colors.card,
                  width: 34,
                  aspectRatio: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 34,
                }}
              >
                <Icons name="remove" size={20} color={colors.text} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.background,
                }}
              >
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
                }}
              >
                <Icons name="add" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View>            
            <View style={{ flexDirection: "row", alignItems: "center" }}>  
            <TouchableOpacity style={{
              width: 60,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#000",
            }}
          >       
            <MaterialIcons name="menu-book" size={44} color="black" />
            </TouchableOpacity>   
              <Text
                style={{
                  flex: 1,
                  fontSize: 28,
                  fontWeight: "400",
                  color: colors.text,
                  padding: 10,
                }}
              >
                   Read the book...
              </Text>                      
            </View>            
          </View>
          <View>            
            <View style={{ flexDirection: "row", alignItems: "center" }}>  
            <TouchableOpacity style={{
              width: 60,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#000",
            }}
          >       
            <MaterialIcons name="volume-up" size={44} color="black" />
            </TouchableOpacity>   
              <Text
                style={{
                  flex: 1,
                  fontSize: 28,
                  fontWeight: "400",
                  color: colors.text,
                  padding: 10,
                }}
              >
                   Get the Audio...
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
              }}
            >
              Summary:
            </Text>
            <Text
              style={{ color: colors.text, opacity: 0.75 }}
              numberOfLines={3}
            >
              Diary of a Wimpy Kid is a humorous and engaging coming-of-age book series that follows the misadventures of a middle school boy named Greg Heffley as he navigates the challenges of growing up.
            </Text>
          </View>
          <View>
            <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.text,
            }}>
                Author: Jeff Kinney
            </Text>
          </View>
          <View>
            <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.text,
            }}>
                Characters: Greg Heffley, Rowley Jefferson, Rodrick, Susan
            </Text>
          </View>     
        </View>
      </BottomSheet>
    </View>
  );
};

export default DetailsScreen;