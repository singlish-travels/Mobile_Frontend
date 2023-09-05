import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextInput/AppTextInput";
import { TabsStackScreenProps } from "../navigators/TabNavigator";
import Pdf from "react-native-pdf";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const PdfViewer = ({ navigation }: TabsStackScreenProps<"Pdf">) => {
  const PdfResource = {
    uri: "https://firebasestorage.googleapis.com/v0/b/profile-image-1c78a.appspot.com/o/pdf%2FFlowcharts.pdf88a19bd5-5571-4b2f-95a3-13832e1ddfb2?alt=media&token=22e62d2d-3932-4463-ace6-49f1a0612989",
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={PdfResource}
        style={styles.pdf}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
      />
    </View>
  );
};

export default PdfViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
