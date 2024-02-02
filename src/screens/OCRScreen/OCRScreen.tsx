import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TabsStackScreenProps } from "../../navigators/TabNavigator";
import { RootStackParamList } from "../../navigators/RootNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const OCRScreen = ({ navigation }: TabsStackScreenProps<"OCR">) => {
  return <SafeAreaView></SafeAreaView>;
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
    backgroundColor: "black", // Change the color as needed
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black", // Change the color as needed
    padding: 15,
    width: 250,
    height: 55,
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

export default OCRScreen;
