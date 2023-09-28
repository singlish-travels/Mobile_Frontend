import React, { useState,useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { TabsStackScreenProps } from "../../navigators/TabNavigator";
import saveWord from "../../api/dictionary/save_word";
import axios from "axios";
import "react-native-url-polyfill/auto";
import SoundPlayer from "react-native-sound-player";
import jwt from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

const DictionaryScreen = ({
  navigation,
}: TabsStackScreenProps<"Dictionary">) => {
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
    setPrintmessage("");
  };

  const clear = () => {
    setCheckedWord("");
    setDefinition("");
    setExample("");
    setNewWord("");
    setPrintmessage("");
  };

  const getVoice = (text: string) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("voice_code", "en-US-1");
    encodedParams.set("text", text);
    encodedParams.set("speed", "1.00");
    encodedParams.set("pitch", "1.00");
    encodedParams.set("output_type", "audio_url");
    const options = {
      method: 'POST',
      url: 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '536bd4fffcmsh099f5a1d3f6ddb1p1cc931jsn60e86fc996a5',
        'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
      },
      data: encodedParams,
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.result.audio_url);
        if (response.data.result.audio_url === undefined) {
          console.log("No audio file");
          return;
        }
        SoundPlayer.playUrl(response.data.result.audio_url);
      })
      .catch(function (error) {
        console.error(error);
      });
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
      user_id: id,
      word: checkedWord,
      meaning: definition,
      example: example,
    };
    // console.log(dictionaryData);
    try {
      const responseData = await saveWord(dictionaryData);
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
  interface DecodedToken {
    _id: string;
  }
  const [id, setID] = useState("");

  const fetchdata = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt(token) as DecodedToken;
      setID(decodedToken._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

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
          placeholderTextColor="black"
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
        {/* <TouchableOpacity style={styles.button} onPress={getVoice}>
          <Text style={styles.buttonText}>Voice</Text>
        </TouchableOpacity> */}
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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

          {checkedWord === "" ? null : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => {
            getVoice(checkedWord);
          }}>
                <Text>
                  <Icon
                    name="volume-up"
                    style={{ paddingTop: 20, paddingLeft: 30 }}
                    size={30}
                    color="black"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          {definition === "" ? null : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => {
            getVoice(definition);
          }}>
                <Text>
                  <Icon
                    name="volume-up"
                    style={{ paddingTop: 20, paddingLeft: 30 }}
                    size={30}
                    color="black"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Text style={{ fontSize: 20, paddingLeft: 20, paddingTop: 10 }}>
          {definition}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          {example === "" ? null : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => {
            getVoice(example);
          }}>
                <Text>
                  <Icon
                    name="volume-up"
                    style={{ paddingTop: 20, paddingLeft: 30 }}
                    size={30}
                    color="black"
                  />
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15,
    boxShadow: "5px 5px 10px 0 rgba(0, 0, 0, 0.9)",
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
    backgroundColor: "white",
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
