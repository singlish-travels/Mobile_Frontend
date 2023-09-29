import React, { useState,useEffect,useRef,useCallback } from "react";
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
import "react-native-url-polyfill/auto";
import jwt from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../components/CustomBackdrop";
import FilterVoice from "../../components/FilterVoice";
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";

const DictionaryScreen = ({
  navigation,
}: TabsStackScreenProps<"Dictionary">) => {
  const [newWord, setNewWord] = useState("");
  const [checkedWord, setCheckedWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [printmessage, setPrintmessage] = useState("");

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openFilterModal = useCallback(() => {
    if (definition === "") {
      setPrintmessage("Please enter a word to get voice");
      return;
    }
    bottomSheetModalRef.current?.present();
  }, []);
  const { colors } = useTheme();

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
        <TouchableOpacity
            onPress={openFilterModal}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              backgroundColor: colors.primary,
            }}
          >
            <Icons name="volume-up" size={30} color={colors.background}/>
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
        </View>
        <Text style={{ fontSize: 20, paddingLeft: 20, paddingTop: 10 }}>
          {example}
        </Text>
      </View>

      <BottomSheetModal
        snapPoints={["90%"]}
        index={0}
        ref={bottomSheetModalRef}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.card,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <FilterVoice word_list={[checkedWord,definition,example]}/>
      </BottomSheetModal>
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
