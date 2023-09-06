import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import Pdf from "react-native-pdf";

const PdfScreen = () => {
  const PdfResource = {
    uri: "https://firebasestorage.googleapis.com/v0/b/profile-image-1c78a.appspot.com/o/pdf%2FTractor%20Gets%20Help.pdf3f78769b-0730-4735-976e-4f64165459ba?alt=media&token=9030693b-fbeb-4291-bb4c-dda2a8bb49b8",
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

export default PdfScreen;

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
