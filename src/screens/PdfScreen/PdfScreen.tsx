import {
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import React from "react";
import Pdf from "react-native-pdf";

const PdfScreen = ({route: {params: { link },}}) => {
  const PdfResource = {
    uri: link,
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
