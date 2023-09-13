import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { ReactNode, useState,useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import PriceRangeSelector from "./PriceRangeSelector";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import getAuthor from "../api/home/get_author";

const MAX_PRICE = 3000;

const FilterView = () => {
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(500);
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const BOOK_CATEGORIES = [
    "Adventure",
    "Mystery",
    "Poetry",
    "Non-Fiction",
    "Fairy Tales and Folklore",
    "Animal Stories",
  ];

  const [Author, setAuthor] = useState([]);
  

  const fetchData = async () => {
    try {
      const responseData = await getAuthor();
      setAuthor(responseData.response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <BottomSheetScrollView style={{ flex: 1 }}>
        <View style={{ paddingVertical: 24, gap: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 20,
                fontWeight: "700",
                color: theme.colors.text,
              }}
            >
              Filters
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: theme.colors.text,
                  opacity: 0.5,
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>

          {/* Range Selector */}

          <PriceRangeSelector
            minPrice={0}
            maxPrice={MAX_PRICE}
            startPrice={startPrice}
            endPrice={endPrice}
            onStartPriceChange={setStartPrice}
            onEndPriceChange={setEndPrice}
          />

          {/* Sports Category Filter */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
              Genre
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {BOOK_CATEGORIES.map((_, i) => {
                return (
                  <Chip
                    key={i}
                    itemCount={i}
                    label={BOOK_CATEGORIES[i]}
                    isSelected={i === 0}
                  />
                );
              })}
            </View>
          </View>
          {/* Color Filter */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
              Author
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {Author.map((_, i) => {
                return (
                  <Chip
                    key={i}
                    itemCount={i}
                    label={Author[i]}
                    isSelected={i === 0}
                  />
                );
              })}
            </View>
          </View>
          {/* Sleeves Filter */}
        </View>
      </BottomSheetScrollView>
      {/* Button */}

      <View
        style={{
          padding: 24,
          paddingBottom: 24 + insets.bottom,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            height: 64,
            borderRadius: 64,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.colors.background,
            }}
          >
            Apply filters
          </Text>

          <View
            style={{
              backgroundColor: theme.colors.card,
              width: 40,
              aspectRatio: 1,
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 12,
              right: 12,
              bottom: 12,
            }}
          >
            <Icons name="arrow-forward" size={24} color={theme.colors.text} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterView;

const Chip = ({
  isSelected,
  label,
  itemCount,
  left,
}: {
  isSelected: boolean;
  label: string;
  itemCount: number;
  left?: ReactNode;
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 100,
        backgroundColor: isSelected
          ? theme.colors.text
          : theme.colors.background,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {!!left && <View style={{ marginRight: 8 }}>{left}</View>}
      <Text
        style={{
          fontSize: 14,
          color: isSelected ? theme.colors.background : theme.colors.text,
        }}
      >
        {label}
      </Text>
    </View>
  );
};
