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

  const FavoritBook = [
    {
      _id: "64f086512933ca622e011ab4",
      title: "Stranger in the forest",
      author: "Nigel Toeg",
      genre: "Non-Fiction",
      summary: "This is the book about bear",
      price: { $numberInt: "299" },
      pdf: "https://firebasestorage.googleapis.com/v0/b/profile-image-1c78a.appspo…",
      coverpage:
        "https://firebasestorage.googleapis.com/v0/b/profile-image-1c78a.appspot.com/o/images%2FScreenshot%202023-08-31%20175134.png74aa8205-ef2c-4c4c-825b-4e93feaaaaf8?alt=media&token=34e60b7a-cdb2-4781-ace8-aadc1d811c9f",
    },
    {
      _id: { $oid: "64f9803c0c5fb2ac72d397e4" },
      title: "Caption Fantastic Story",
      author: "T. Albert",
      genre: "Mystery",
      summary: "This is book is about life of a king.",
      price: { $numberInt: "0" },
      pdf: "https://firebasestorage.googleapis.com/v0/b/profile-image-1c78a.appspot.com/o/pdf%2F010-CAPTAIN-FANTASTIC-Free-Childrens-Book-By-Monkey-Pen.pdfab984204-fb0e-46f2-80b5-c4dbb4acb770?alt=media&token=0c5c316c-1be3-4556-9b40-94f103bfc2e4",
      coverpage:
        "https://firebasestorage.googleapis.com/v0/b/profile-image-1c78a.appspot.com/o/images%2F002_86a9c8a3-d746-4bc3-bf41-4471627a7cfb.jpg4e973a84-3132-4c1a-9679-34ee1e1291cb?alt=media&token=194595bf-b1ce-419d-af15-61664b316b74",
      ISBN: "6354",
      publisher_id: { $oid: "64f04f0216a235cf299477b6" },
      createdAt: { $date: { $numberLong: "1694072892916" } },
      updatedAt: { $date: { $numberLong: "1694604979637" } },
      __v: { $numberInt: "0" },
    },
    {
      _id: { $oid: "650332614414689c446ddfbc" },
      title: "Gulliver's Travel",
      author: "Jonathan Swift",
      genre: "Fairy Tales and Folklore",
      summary:
        '"Gulliver\'s Travels" is a satirical novel by Jonathan Swift, following the adventures of Lemuel Gulliver in various fantastical lands, offering a sharp critique of human society and politics through imaginative storytelling.',
      price: { $numberInt: "1546" },
      pdf: "https://firebasestorage.googleapis.com/v0/b/profile-image-1c78a.appspot.com/o/pdf%2F02.%20Gulliver's%20travels%20author%20Jonathan%20Swift.pdfde8ab200-6ff2-4cdd-905a-17e8a01d4b97?alt=media&token=0ce3d35d-6ab2-43c8-b06c-5f22c3dc5e76",
      coverpage:
        "https://firebasestorage.googleapis.com/v0/b/profile-image-1c78a.appspot.com/o/images%2FGulliversTravle.jpg59b6df8d-ad3a-45a7-af6b-6d74c0b0fbbe?alt=media&token=5a1faf94-cb3e-4564-90f3-ba51b7216fa9",
      ISBN: "2513",
      publisher_id: { $oid: "64f04f0216a235cf299477b6" },
      createdAt: { $date: { $numberLong: "1694708321473" } },
      updatedAt: { $date: { $numberLong: "1694708321473" } },
      __v: { $numberInt: "0" },
    },
  ];

  const CartBook = [
    {
      _id: { $oid: "65032edea9bee9764ffa6336" },
      title: "Children's Stories with a moral",
      author: "Sergey Nikolov",
      genre: "Adventure",
      summary:
        "There once lived an old man on the shore of a beautiful sea. All day wove nets and caught fish...",
      price: { $numberInt: "250" },
      pdf: "https://firebasestorage.googleapis.com/v0/b/profile-image-1c78a.appspot.com/o/pdf%2Fchildrens-stories-with-a-moral-by-sergey-nikolov.pdf90103fd0-27a8-4ac3-b4c4-5a283f95d08a?alt=media&token=cba75576-f44b-437d-acdc-aeddb6fc99ef",
      coverpage:
        "https://firebasestorage.googleapis.com/v0/b/profile-image-1c78a.appspot.com/o/images%2Fchildrens-stories-with-a-moral-ebook.jpgb16fa4f7-fbf2-4479-a5a8-c7ccb44813c0?alt=media&token=276eaf79-f1ea-4ce2-9213-760d5f5dc7f8",
      ISBN: "3627",
      publisher_id: { $oid: "64f04f0216a235cf299477b6" },
      createdAt: { $date: { $numberLong: "1694707422246" } },
      updatedAt: { $date: { $numberLong: "1694707422246" } },
      __v: { $numberInt: "0" },
    },
    {
      _id: { $oid: "650332614414689c446ddfbc" },
      title: "Gulliver's Travel",
      author: "Jonathan Swift",
      genre: "Fairy Tales and Folklore",
      summary:
        '"Gulliver\'s Travels" is a satirical novel by Jonathan Swift, following the adventures of Lemuel Gulliver in various fantastical lands, offering a sharp critique of human society and politics through imaginative storytelling.',
      price: { $numberInt: "1546" },
      pdf: "https://firebasestorage.googleapis.com/v0/b/profile-image-1c78a.appspot.com/o/pdf%2F02.%20Gulliver's%20travels%20author%20Jonathan%20Swift.pdfde8ab200-6ff2-4cdd-905a-17e8a01d4b97?alt=media&token=0ce3d35d-6ab2-43c8-b06c-5f22c3dc5e76",
      coverpage:
        "https://firebasestorage.googleapis.com/v0/b/profile-image-1c78a.appspot.com/o/images%2FGulliversTravle.jpg59b6df8d-ad3a-45a7-af6b-6d74c0b0fbbe?alt=media&token=5a1faf94-cb3e-4564-90f3-ba51b7216fa9",
      ISBN: "2513",
      publisher_id: { $oid: "64f04f0216a235cf299477b6" },
      createdAt: { $date: { $numberLong: "1694708321473" } },
      updatedAt: { $date: { $numberLong: "1694708321473" } },
      __v: { $numberInt: "0" },
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
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

      <FlatList
        data={selected == 1 ? FavoritBook : CartBook}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                height: 450,
                flex: 1,
                alignSelf: "flex-start",
                padding: 20,
              }}>
              <View style={{}}>
                <Image
                  source={{
                    uri: item.coverpage,
                  }}
                  style={{
                    flex: 1,
                    height: 450,
                    width: 300,
                    justifyContent: "flex-start",
                  }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ flex: 4, padding: 20 }}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  {item.title}
                </Text>
                <Text></Text>
                <Text></Text>
                <Text style={{ fontSize: 18 }}>Author : {item.author}</Text>
                <Text style={{ fontSize: 18 }}>genre : {item.genre}</Text>
                <Text></Text>
                <Text></Text>

                <TouchableOpacity
                  onPress={() =>
                    selected == 1
                      ? navigation.navigate("PdfScreen", { link: item.pdf })
                      : navigation.navigate("Payment", {
                          title: item.title,
                          price: item.price.$numberInt,
                        })
                  }
                  style={{
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
  image: {
    height: 200,
    width: 300,
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
