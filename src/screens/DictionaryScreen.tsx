import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { TabsStackScreenProps } from "../navigators/TabNavigator";

const DictionaryScreen = ({
  navigation,
}: TabsStackScreenProps<"Dictionary">) => {
  const statusBarHeight = StatusBar.currentHeight ?? 0;
  const [newWord, setNewWord] = useState("");
  const [checkedWord, setCheckedWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [printmessage, setPrintmessage] = useState("");

  const DisplaySavedWords = () => {
    navigation.navigate("SavedWord");
  };

  const getInfo = async () => {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;

    const data = await fetch(url);
    const response = await data.json();
    let word = response[0].word;
    setCheckedWord(word);
    let def = response[0].meanings[0].definitions[0].definition;
    setDefinition(def);
    let eg = response[0].meanings[0].definitions[0].example;
    setExample(eg);
  };

  const clear = () => {
    setCheckedWord("");
    setDefinition("");
    setExample("");
    setNewWord("");
    setPrintmessage("");
  };

  const handleAddDictionary = async () => {
    if (checkedWord === "") {
      console.log("Word is required");
      return;
    }
    if (definition === "") {
      console.log("Definition is required");
      return;
    }
    if (example === "") {
      console.log("Example is required");
      return;
    }
    const dictionaryData = {
      user_id: "64f6f556104f2b6525e78793",
      word: checkedWord,
      meaning: definition,
      example: example,
    };
    console.log(dictionaryData);
    try {
      const response = await fetch(
        "http://192.168.8.122:3001/api/dictionary/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dictionaryData),
        }
      );
      const responseData = await response.json();
      if (responseData.message === "Word is added successfully.") {
        setPrintmessage(responseData.message);
      } else {
        setPrintmessage(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const searchWord = (enteredWord: React.SetStateAction<string>) => {
    setNewWord(enteredWord);
  };

  return (
    <SafeAreaView>
      <View style={styles.topicContainer}>
        <TouchableOpacity
          onPress={() => DisplaySavedWords()}
          style={{ flexDirection: "row" }}
        >
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize: 20,
              paddingLeft: 195,
            }}
          >
            Saved Words
          </Text>
          <Icon
            name="keyboard-arrow-right"
            style={{ paddingTop: 5 }}
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.topicText}>Dictionary</Text>
      </View>

      <View style={styles.textSearch}>
        <TextInput
          style={styles.inputBox}
          placeholder="Enter text"
          placeholderTextColor="gray"
          clearButtonMode="always"
          onChangeText={searchWord}
          value={newWord}
        ></TextInput>

        <TouchableOpacity
          onPress={() => {
            getInfo();
          }}
        >
          <Icon
            name="search"
            style={{ paddingLeft: 5, paddingTop: 10 }}
            size={50}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddDictionary}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.WordMeaning}>
        {printmessage === "" ? null : (
          <Text
            style={{
              fontSize: 20,
              paddingLeft: 20,
              paddingTop: 10,
              color: "green",
            }}
          >
            {printmessage}
          </Text>
        )}
        <Text
          style={{
            fontSize: 30,
            paddingLeft: 20,
            paddingTop: 20,
            fontWeight: "bold",
          }}
        >
          {checkedWord}
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 20,
            paddingTop: checkedWord ? 0 : 23,
            fontWeight: "bold",
          }}
        >
          ___________________
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 20,
            paddingTop: 20,
            fontWeight: "bold",
          }}
        >
          Definition :
        </Text>
        <Text style={{ fontSize: 20, paddingLeft: 20, paddingTop: 10 }}>
          {definition}
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingLeft: 20,
            paddingTop: 20,
            fontWeight: "bold",
          }}
        >
          Example :
        </Text>
        <Text style={{ fontSize: 20, paddingLeft: 20, paddingTop: 10 }}>
          {example}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DictionaryScreen;

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
  textSearch: {
    height: 100,
    backgroundColor: "#bab9c7",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15,
  },
  inputBox: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    marginTop: 10,
    fontSize: 20,
    paddingLeft: 15,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
    width: 100,
    margin: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#bab9c7",
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  WordMeaning: {
    height: "100%",
    backgroundColor: "white",
  },
});
