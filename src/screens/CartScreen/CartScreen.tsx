import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  Button,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { TabsStackScreenProps } from "../../navigators/TabNavigator";
import getPublisher from "../../api/profile/get_user";
import updateReader from "../../api/profile/update_user";
import jwt from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const CartScreen = ({ navigation }: TabsStackScreenProps<"Payment">) => {
  const statusBarHeight = StatusBar.currentHeight ?? 0;
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [selected, setSelected] = useState(1);

  const [id, setID] = useState("");

  interface DecodedToken {
    _id: string;
  }

  const fetchdata = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt(token) as DecodedToken;
      setID(decodedToken._id);

      const responseData = await getPublisher(decodedToken._id);
      setName(responseData.user[0].name);
      setemail(responseData.user[0].email);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: statusBarHeight,
      }}>
      <View style={styles.topicContainer}>
        <Text style={styles.topicText}>My Books</Text>
      </View>
      <View style={styles.selector}>
        <TouchableOpacity
          style={{ height: 80, width: "50%" }}
          onPress={() => setSelected(1)}>
          <View
            style={[
              styles.button,
              selected === 1
                ? { borderBottomWidth: 3, borderBottomColor: "blue" }
                : null,
            ]}>
            <Text style={styles.text}>Favorites</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 80, width: "50%" }}
          onPress={() => setSelected(2)}>
          <View
            style={[
              styles.button,
              selected === 2
                ? { borderBottomWidth: 3, borderBottomColor: "blue" }
                : null,
            ]}>
            <Text style={styles.text}>Cart</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "White",
  },
  topicContainer: {
    width: "100%",
    height: "auto",
    padding: 20,
    backgroundColor: "#000030",
    justifyContent: "flex-start",
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  topicText: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    fontFamily: "Times New Roman",
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f7fa",
  },
  selector: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    ...Platform.select({
      android: {
        elevation: 5, // Add shadow for Android
      },
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4, // Add shadow for iOS
      },
    }),
  },
});
