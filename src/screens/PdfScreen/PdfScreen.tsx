import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput, // Add TextInput for search functionality
  TouchableOpacity, // Add TouchableOpacity for search button
} from "react-native";
import Pdf from "react-native-pdf";

const PdfScreen = ({
  route: {
    params: { link },
  },
}: {
  route: {
    params: {
      link: string; // Annotate 'link' as a string type
    };
  };
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

  const PdfResource = {
    uri: link,
    cache: true,
  };

  // Function to handle the search button press
  const handleSearch = () => {
    // Implement your search logic here
    // You can use the 'searchTerm' state to search for the term in the PDF
    // You might need a PDF library or service to perform the search
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* PDF viewer */}
      <Pdf
        trustAllCerts={false}
        source={PdfResource}
        style={styles.pdf}
        onLoadComplete={(numberOfPages, _filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, _numberOfPages) => {
          setCurrentPage(page);
        }}
      />

      {/* Page number viewer */}
      <View style={styles.pageViewer}>
        <Text style={styles.pageNumber}>{currentPage}</Text>
      </View>
    </View>
  );
};

export default PdfScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingTop: 25, // Add top padding here
  },
  searchInput: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  pageViewer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: 10,
    borderRadius: 10,
  },
  pageNumber: {
    color: "white",
    fontSize: 16,
  },
});
