import React, { useState } from "react";
import { SafeAreaView, View, Text, Image,ScrollView } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { TabsStackScreenProps } from "../../navigators/TabNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextRecognition from '@react-native-ml-kit/text-recognition';
// const axios = require("axios");

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const OCRScreen = ({ navigation }: TabsStackScreenProps<"OCR">) => {
  const [selectImage, setSelectImage] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);

  const getText = async () => {
    const result = await TextRecognition.recognize(selectImage);
    setText(result.text);
    console.log(result.text);   
  };

  const ImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
      },
      (response) => {
        setImage(response);
        setSelectImage(response.assets[0].uri);
        console.log(response);
      }
    );
  };

  return (
    <ScrollView>
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
            paddingTop: 20,
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
      {text !== null ? (
        <View
          style={{
            height: 400,
            width: "90%",
          }}
        >
          <Text>{text}</Text>
        </View>
      ) : null}
    </SafeAreaView>
    </ScrollView>
  );
};

export default OCRScreen;
