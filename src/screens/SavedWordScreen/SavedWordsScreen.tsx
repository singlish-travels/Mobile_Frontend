import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { RootStackScreenProps } from "../../navigators/RootNavigator";
import removeWord from "../../api/dictionary/remove_word";
import getWords from "../../api/dictionary/get_words";
import jwt from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

const SavedWords = ({ navigation }: RootStackScreenProps<"SavedWord">) => {
  const [word, setWord] = useState("");
  const handleDeleteWord = (id: string) => {
    Alert.alert(
      "Delete Word",
      "Are you sure you want to delete this word?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            try {
              removeWord(id);
              alert("Word Deleted Successfully");
              setWord("Word Deleted Successfully");
            } catch (error) {
              console.error("Error:", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };
  const [isLoading, setIsLoading] = useState(true);

  const DisplayHome = () => {
    navigation.navigate({ name: "TabsStack", key: "123" });
  };

  interface IDataItem {
    _id: string;
    word: string;
    meaning: string;
    example: string;
  }

  const [DATA, setDATA] = useState<IDataItem[]>([]);
  const [id, setID] = useState("");

  interface DecodedToken {
    _id: string;
  }

  const fetchData = async () => {
    setIsLoading(true); // Start loading
    try {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt(token) as DecodedToken;
      setID(decodedToken._id);
      const responseData = await getWords(id);
      setDATA(responseData.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Finish loading, whether successful or not
    }
  };

  useEffect(() => {
    fetchData();
  }, [word, id]);

  return (
    <SafeAreaView>
      <View style={styles.topicContainer}>
        <TouchableOpacity
          onPress={() => DisplayHome()}
          style={{ flexDirection: "row" }}
        >
          <Icon
            name="keyboard-arrow-left"
            style={{ paddingLeft: 5, paddingTop: 5 }}
            size={30}
            color="white"
          />
          <Text style={{ color: "white", alignSelf: "center", fontSize: 20 }}>
            Home
          </Text>
        </TouchableOpacity>
        <Text style={styles.topicText}>SAVED WORDS</Text>
      </View>

      <View style={styles.WordsContainer}>
        {isLoading ? ( // Display loading indicator while data is being fetched
          <ActivityIndicator size="large" color="#357cab" />
        ) : (
          <FlatList
            data={DATA}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.wordItem,
                  ,
                  index === DATA.length - 1 ? { marginBottom: 250 } : null,
                ]}
              >
                <TouchableOpacity onPress={() => handleDeleteWord(item._id)}>
                  <Icon
                    name="delete"
                    style={{
                      right: 5,
                      position: "absolute",
                      paddingBottom: 10,
                    }}
                    size={30}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: "#357cab",
                    alignSelf: "flex-start",
                    fontSize: 30,
                    fontWeight: "bold",
                    paddingBottom: 10,
                  }}
                >
                  {item.word}
                </Text>
                <Text
                  style={{
                    color: "black",
                    alignSelf: "flex-start",
                    fontSize: 17,
                  }}
                >
                  {item.meaning}
                </Text>
                <Text
                  style={{
                    color: "black",
                    alignSelf: "flex-start",
                    fontSize: 20,
                    paddingTop: 10,
                  }}
                >
                  EXAMPLE : {item.example}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SavedWords;

const styles = StyleSheet.create({
  topicContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "#000030",
    justifyContent: "center",
    marginTop: 50,
  },
  topicText: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
  },
  wordItem: {
    marginTop: 10,
    padding: 10,
    borderColor: "gray",
    color: "white",
    // borderWidth: 1,
    borderRadius: 5,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  WordsContainer: {
    backgroundColor: "white",
  },
});
