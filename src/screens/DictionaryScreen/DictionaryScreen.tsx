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
import { RootStackParamList } from "../../types";
import { TabsStackScreenProps } from "../../navigators/TabNavigator";
import Colors from "../../constants/Colors";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const DictionaryScreen = ({ navigation }: TabsStackScreenProps<"Cart">) => {
  const [newWord, setNewWord] = useState("");
  const [checkedWord, setCheckedWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");

  const searchWord = (enteredWord: React.SetStateAction<string>) => {
    setNewWord(enteredWord);
  };

  const getInfo = async () => {
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + newWord;

    const data = await fetch(url);
    const response = await data.json();
    var word = response[0].word;
    setCheckedWord(word);
    var def = response[0].meanings[0].definitions[0].definition;
    setDefinition(def);
    var eg = response[0].meanings[0].definitions[0].example;
    setExample(eg);
  };

  const clear = () => {
    setCheckedWord("");
    setDefinition("");
    setExample("");
    setNewWord("");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/603.jpg")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "sans-serif",
                fontVariant: ["small-caps"],
                fontWeight: "bold",
              }}
            >
              Dictionary
            </Text>
            <TextInput
              style={styles.inputBox}
              placeholder="search a word"
              placeholderTextColor={Colors.text}
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
              <Text style={styles.textDesign}>
                Entered Word :{checkedWord}{" "}
              </Text>
              <Text style={styles.textDesign}>Definition : {definition} </Text>
              <Text style={styles.textDesign}>Example : {example} </Text>
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
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    marginTop: 50,
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
    fontFamily: "sans-serif",
    fontVariant: ["small-caps"],
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 5,
  },
  speakerButton: {
    width: 50,
    height: 40,
  },
  textDesign: {
    fontSize: 20,
    marginTop: 10,
    padding: 10,
    alignSelf: "center",
  },
});
