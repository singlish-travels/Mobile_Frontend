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
  FlatList,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { TabsStackScreenProps } from "../../navigators/TabNavigator";
import getPublisher from "../../api/profile/get_user";
import updateReader from "../../api/profile/update_user";
import jwt from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spacing from "../../constants/Spacing";
import Colors from "../../constants/Colors";
import getCart from "../../api/cart/get_cart";
import getFavorite from "../../api/favorite/get_favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import FontSize from "../../constants/FontSize";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const CartScreen = ({ navigation }: TabsStackScreenProps<"Cart">) => {
  const statusBarHeight = StatusBar.currentHeight ?? 0;
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [selected, setSelected] = useState(1);

  const [id, setID] = useState("");

  interface DecodedToken {
    _id: string;
  }

  const ReadBook = () => {};
  const [CartBook, setCartBook] = useState([]);
  const [FavoriteBook, setFavoriteBook] = useState([]);

  const fetchdata = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt(token) as DecodedToken;
      setID(decodedToken._id);

      const response = await getCart(decodedToken._id);
      const response2 = await getFavorite(decodedToken._id);
      console.log(response.Cart);
      setCartBook(response.Cart);
      setFavoriteBook(response2.Favorite);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const deleteFromList = async (id: string) => {
    if (selected == 1) {
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
                // removeWord(id);
                alert("Word Deleted Successfully");
                //setWord("Word Deleted Successfully");
              } catch (error) {
                console.error("Error:", error);
              }
            },
            style: "destructive",
          },
        ],
        { cancelable: true }
      );
    }
    if (selected == 2) {
      //delete function for cart book
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.topicContainer}>
        <Text style={styles.topicText}>My Books</Text>
      </View>
      <View style={styles.selector}>
        <TouchableOpacity
          style={{ height: 65, width: "50%" }}
          onPress={() => {
            setSelected(1);
            fetchdata();
          }}>
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
          style={{ height: 65, width: "50%" }}
          onPress={() => {
            setSelected(2);
            fetchdata();
          }}>
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

      <FlatList
        data={selected == 1 ? FavoriteBook : CartBook}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                height: "auto",
                flex: 1,
                alignSelf: "flex-start",
                paddingTop: 20,
                paddingHorizontal: 10,
                borderBottomWidth: 3,
                borderBottomColor: "#b5bcc9",
              }}>
              <View style={{ width: "30%" }}>
                <Image
                  source={{
                    uri: item.book_details.coverpage, //uri: item.coverpage,
                  }}
                  style={{
                    flex: 1,
                    width: "100%",
                  }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 4, padding: 4 }}>
                <TouchableOpacity
                  onPress={() => deleteFromList(item.book_details._id)}>
                  <Icon
                    name="delete-outline"
                    style={{ fontSize: 35, marginLeft: "85%" }}></Icon>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {item.book_details.title}
                </Text>
                <Text></Text>
                <Text style={{ fontSize: 18 }}>
                  Author : {item.book_details.author}
                </Text>
                <Text style={{ fontSize: 18 }}>
                  genre : {item.book_details.genre}
                </Text>
                <Text></Text>

                <TouchableOpacity
                  onPress={() =>
                    selected == 1
                      ? navigation.navigate("PdfScreen", {
                          link: item.book_details.pdf,
                        })
                      : navigation.navigate("Payment", {
                          title: item.book_details.title,
                          price: item.book_details.price,
                        })
                  }
                  style={{
                    padding: 14,
                    backgroundColor: Colors.primary,
                    marginHorizontal: Spacing * 5,
                    borderRadius: 30,
                    shadowColor: "black",
                    shadowOffset: {
                      width: 200,
                      height: 10,
                    },
                    shadowOpacity: 10,
                    shadowRadius: 10,
                    elevation: 14, // Android
                  }}>
                  {selected == 1 ? (
                    <Text
                      style={{
                        color: Colors.onPrimary,
                        textAlign: "center",
                        fontSize: 20,
                      }}>
                      Read Now
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: Colors.onPrimary,
                        textAlign: "center",
                        fontSize: 20,
                      }}>
                      Buy now
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      />
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
  Button: {
    width: "30%",
    padding: Spacing * 2,
    backgroundColor: Colors.primary,
    marginVertical: Spacing * 3,
    marginHorizontal: Spacing * 5,
    borderRadius: 130,
    shadowColor: "black",
    shadowOffset: {
      width: 200,
      height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 14, // Android
  },
  ButtonText: {
    color: Colors.onPrimary,
    textAlign: "center",
    fontSize: 20,
  },
});
