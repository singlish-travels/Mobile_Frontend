import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextInput";
import { TabsStackScreenProps } from "../navigators/TabNavigator";
import Pdf from "react-native-pdf";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const PdfViewer= ({ navigation }: TabsStackScreenProps<"Pdf">) => {
  const PdfResource = {uri : 'https://archive.org/download/diaryofawimpykidbookseriesbyjeffkinney_202004/Diary%20of%20a%20wimpy%20kid%20book01.pdf',cache:true}
  return (
    <View style = {styles.container}>
      <Pdf
        trustAllCerts = {false}
        source={PdfResource}
        style={styles.pdf}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`)
        }}
      />
    </View>
  );
};

export default PdfViewer;

const styles = StyleSheet.create({
  container : {
    flex:1
  },
  pdf:{
    flex:1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});