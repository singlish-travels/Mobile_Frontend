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

  const fetchData = async () => {
    try {
      const responseData = await getWords();
      setDATA(responseData.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [word]);

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
          <Text style={styles.topicText}>Saved Words</Text>
        </View>

        <View style={styles.WordsContainer}>
          <FlatList
            data={DATA}
            renderItem={({ item,index }) => (
              <View style={[styles.wordItem,, index === DATA.length - 1 ? { marginBottom: 250 } : null]}>
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
                    color: "black",
                    alignSelf: "flex-start",
                    fontSize: 20,
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
                    fontSize: 20,
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
                  Example : {item.example}
                </Text>
              </View>
            )}
          />
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
    borderWidth: 1,
    borderRadius: 5,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "white",
    shadowOpacity: 4,
  },
  WordsContainer: {
    backgroundColor: "#FFFFF0",
  },
});
