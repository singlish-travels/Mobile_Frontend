import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactNode, useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import PriceRangeSelector from "./PriceRangeSelector";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import getAuthor from "../api/home/get_author";

const MAX_PRICE = 3000;

const FilterView = ({
  startprice,
  endprice,
  genre,
  author,
  clickable,
}: {
  startprice: (value: number) => void;
  endprice: (value: number) => void;
  genre: (value: string) => void;
  author: (value: string) => void;
  clickable: (value: boolean) => void;
}) => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedChipIndex1, setSelectedChipIndex1] = useState<number | null>(
    null
  );
  const [selectedChipIndex2, setSelectedChipIndex2] = useState<number | null>(
    null
  );
  const handleChipClick = (index: number) => {
    setSelectedChipIndex1(index);
  };
  const handleChipClick2 = (index: number) => {
    setSelectedChipIndex2(index);
  };

  const henadleFilter = () => {
    startprice(startPrice);
    endprice(endPrice);
    genre(BOOK_CATEGORIES[selectedChipIndex1]);
    author(Author[selectedChipIndex2]);
    clickable(true);
  };

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
              {BOOK_CATEGORIES.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    isSelected={selectedChipIndex1 === index}
                    label={item}
                    onItemClick={() => handleChipClick(index)}
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
              {Author.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    isSelected={selectedChipIndex2 === index}
                    label={item}
                    onItemClick={() => handleChipClick2(index)}
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
          onPress={henadleFilter}
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
  onItemClick,
}: {
  isSelected: boolean;
  label: string;
  onItemClick: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onItemClick}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 100,
          backgroundColor: isSelected ? "black" : "lightgray",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: isSelected ? "white" : "black",
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
