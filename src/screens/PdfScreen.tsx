import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import Pdf from "react-native-pdf";

const PdfScreen = () => {
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
