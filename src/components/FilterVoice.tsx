import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import axios from "axios";
import "react-native-url-polyfill/auto";
import SoundPlayer from "react-native-sound-player";

const FilterView = ({ word_list }: { word_list: [string, string, string] }) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const Voice_CATEGORIES = [
    "en-US-1",
    "en-AU-1",
    "en-AU-2",
    "en-GB-5",
    "en-GB-6",
    "en-IN-3",
  ];
  const Taken_word_list = word_list;
  const Word = ["Word", "Definition", "Example"];
  const Speed_Voice = ["0.50", "1.00", "1.50", "2.00", "2.50", "3.00"];
  const Pitch_Voice = ["0.50", "1.00", "1.50", "2.00"];

  const [selectedChipIndex1, setSelectedChipIndex1] = useState<number | null>(
    null
  );
  const [selectedChipIndex2, setSelectedChipIndex2] = useState<number | null>(
    null
  );
  const [selectedChipIndex3, setSelectedChipIndex3] = useState<number | null>(
    null
  );
  const [selectedChipIndex4, setSelectedChipIndex4] = useState<number | null>(
    null
  );
  const handleChipClick = (index: number) => {
    setSelectedChipIndex1(index);
  };
  const handleChipClick2 = (index: number) => {
    setSelectedChipIndex2(index);
  };
  const handleChipClick3 = (index: number) => {
    setSelectedChipIndex3(index);
  };
  const handleChipClick4 = (index: number) => {
    setSelectedChipIndex4(index);
  };

  const getVoice = (text: string) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("voice_code", Voice_CATEGORIES[selectedChipIndex2]);
    encodedParams.set("text", Taken_word_list[selectedChipIndex1]);
    encodedParams.set("speed", Speed_Voice[selectedChipIndex3]);
    encodedParams.set("pitch", Pitch_Voice[selectedChipIndex4]);
    encodedParams.set("output_type", "audio_url");
    const options = {
      method: "POST",
      url: "https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "068563b624mshac6817b553a2e1ap1fb166jsn8c8cb503c815",
        "X-RapidAPI-Host": "cloudlabs-text-to-speech.p.rapidapi.com",
      },
      data: encodedParams,
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.result.audio_url);
        if (response.data.result.audio_url === undefined) {
          console.log("No audio file");
          return;
        }
        SoundPlayer.playUrl(response.data.result.audio_url);
      })
      .catch(function (error) {
        console.error(error);
      });
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
                fontSize: 25,
                fontWeight: "700",
                color: theme.colors.text,
              }}
            >
              Text to Speech
            </Text>
          </View>

          {/* Range Selector */}

          {/* Sports Category Filter */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
              Word List
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {Word.map((item, index) => {
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
              Voice Code
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 7 }}>
              {Voice_CATEGORIES.map((item, index) => {
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
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
              Speed
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 7 }}>
              {Speed_Voice.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    isSelected={selectedChipIndex3 === index}
                    label={item}
                    onItemClick={() => handleChipClick3(index)}
                  />
                );
              })}
            </View>
          </View>
          <View style={{ paddingHorizontal: 24 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
              Pitch
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 14 }}>
              {Pitch_Voice.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    isSelected={selectedChipIndex4 === index}
                    label={item}
                    onItemClick={() => handleChipClick4(index)}
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
          onPress={() => {
            getVoice("Hello");
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
              color: theme.colors.background,
            }}
          >
            Get Voice
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
            <Icons name="volume-up" size={30} color={theme.colors.text} />
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
