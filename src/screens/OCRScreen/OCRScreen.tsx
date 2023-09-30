import React, { useState } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { TabsStackScreenProps } from "../../navigators/TabNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { TouchableOpacity } from "react-native-gesture-handler";
const axios = require("axios");

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const OCRScreen = ({ navigation }: TabsStackScreenProps<"OCR">) => {
  const [selectImage, setSelectImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [image,setImage] = useState(null);

  const getText = async () => {
    const url = "https://text-analysis12.p.rapidapi.com/text-mining/api/v1.1";
    const data = new FormData();
    data.append("input_file", selectImage);
    data.append("language", "english");

    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': '44108d15b5mshd58f9ad61fb81bbp1bde0cjsn28bbeb797e89',
            'X-RapidAPI-Host': 'text-analysis12.p.rapidapi.com'
        },
        body: data
    };
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const ImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
      },
      (response) => {
        setSelectImage(response.assets[0].uri);
        setImage(response.assets);
        setImageName(response.assets[0].fileName);
        console.log(response);
      }
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selectImage !== "" ? (
        <View
          style={{
            height: 400,
            width: "90%",
          }}
        >
          <Image
            style={{
              height: 400,
              width: "100%",
            }}
            source={{ uri: selectImage }}
            resizeMode="contain" // Experiment with different values
          />
        </View>
      ) : null}
      <TouchableOpacity
        style={{
          marginTop: 20,
          height: 50,
          width: 200,
          backgroundColor: "skyblue",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
        onPress={() => {
          ImagePicker();
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: 20,
          height: 50,
          width: 200,
          backgroundColor: "skyblue",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
        onPress={() => {
          getText();
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Get Text</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OCRScreen;
