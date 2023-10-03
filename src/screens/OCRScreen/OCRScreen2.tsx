import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
//import { TouchableOpacity } from "react-native-gesture-handler";
import TextRecognition from '@react-native-ml-kit/text-recognition';
 const axios = require("axios");

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const OCRScreen2 = ({ navigation }: TabsStackScreenProps<"OCR">) => {
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
      }}
    >
      <View style={styles.topicContainer}>
        <Text style={styles.topicText}>Image to Text</Text>
      </View>
      <ScrollView >
        {selectImage !== "" ? (
          <View
            style={{
              width: "100%",
              paddingTop: 20,
            }}
          >
            <Image
              style={{
                height: "100%",
                width: "100%",
              }}
              source={{ uri: selectImage }}
              resizeMode="contain" // Experiment with different values
            />
          </View>
        ) : null}

        <View
          style={{
            alignItems: "center",
            marginTop: selectImage == "" ? 150 : 0,
          }}
        >
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={() => {
              ImagePicker();
            }}
          >
            <AntDesign name="picture" size={30} color="white" />
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              getText();
            }}
          >
            <Text style={styles.buttonText}>Get Text</Text>
            <FontAwesome
              name="angle-right"
              size={25}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        {text !== null ? (
          <View
            style={{
              height: "auto",
              width: "100%",
              backgroundColor: "#e1e8f2",
              padding : 20,
              marginTop: 30,
            }}
          >
            <Text style={{fontSize:20}} >{text}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topicContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "#000030",
    justifyContent: "center",
  },
  topicText: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
  },
  galleryButton: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    backgroundColor: "#03a1fc", // Change the color as needed
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue", // Change the color as needed
    padding: 15,
    width: 300,
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
  icon: {
    marginLeft: 10, // Adjust as needed for spacing
  },
});

export default OCRScreen2;
