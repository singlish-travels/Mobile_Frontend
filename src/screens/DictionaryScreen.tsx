import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { TabsStackScreenProps } from "../navigators/TabNavigator";
import Colors from "../constants/Colors";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const DictionaryScreen = ({
  navigation,
}: TabsStackScreenProps<"Dictionary">) => {
  const statusBarHeight = StatusBar.currentHeight ?? 0;
  const [newWord, setNewWord] = useState("");
  const [checkedWord, setCheckedWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [printmessage, setPrintmessage] = useState("");

  const searchWord = (enteredWord: React.SetStateAction<string>) => {
    setNewWord(enteredWord);
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        marginTop: statusBarHeight,
      }}
    >
      <ImageBackground
        source={require("../../assets/2219.jpg")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              Dictionary
            </Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Search a word"
              placeholderTextColor={Colors.primary}
              textAlign="center"
              clearButtonMode="always"
              onChangeText={searchWord}
              value={newWord}
            ></TextInput>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "60%",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={() => {
                  getInfo();
                }}
              >
                <Text style={styles.buttonText}>Go !</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={() => {
                  clear();
                }}
              >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={handleAddDictionary}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                {printmessage}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  padding: 6,
                }}
              >
                Entered Word :
              </Text>
              {checkedWord === "" ? null : (
                <Text
                  style={{
                    fontSize: 20,
                    padding: 6,
                  }}
                >
                  {checkedWord}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  padding: 6,
                }}
              >
                Definition :
              </Text>
              {definition === "" ? null : (
                <Text
                  style={{
                    fontSize: 20,
                    padding: 6,
                    paddingLeft: 10,
                  }}
                >
                  {definition}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  padding: 6,
                }}
              >
                Example :
              </Text>
              {example === "" ? null : (
                <Text
                  style={{
                    fontSize: 20,
                    padding: 6,
                  }}
                >
                  {example}
                </Text>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
      <StatusBar />
    </View>
  );
};

export default DictionaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imageDesign: {
    width: "80%",
    height: "120%",
    marginLeft: 50,
    marginTop: 30,
  },
  inputBox: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    marginTop: 10,
    fontSize: 25,
  },
  buttonDesign: {
    backgroundColor: "lightblue",
    width: 100,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 5,
  },
  textDesign: {
    fontSize: 20,
    marginTop: 10,
    padding: 10,
    alignSelf: "center",
  },
});
