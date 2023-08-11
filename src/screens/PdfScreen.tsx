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
  import { RootStackScreenProps } from "../navigators/RootNavigator";
  
  type Props = NativeStackScreenProps<RootStackParamList, "Login">;
  const PdfScreen = ({
    navigation,
    route: {
      params: { id },
    },
  }: RootStackScreenProps<"Pdf">) => {
    const PdfResource = {uri : 'https://www.africau.edu/images/default/sample.pdf',cache:true}
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

  
  export default PdfScreen;
  
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