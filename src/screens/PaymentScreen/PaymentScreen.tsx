import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { RootStackScreenProps } from "../../navigators/RootNavigator";
import jwt from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spacing from "../../constants/Spacing";
import Colors from "../../constants/Colors";
import getdetails from "../../api/details/details";
import { ScrollView } from "react-native-gesture-handler";

const PaymentScreen = ({
  navigation,
  route: {
    params: { title, price },
  },
}: RootStackScreenProps<"Payment">) => {
  const statusBarHeight = StatusBar.currentHeight ?? 0;
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [BookName, setBookName] = useState("");
  const [Price, setPrice] = useState("100");
  const [NameOnCard, setNamaOnCard] = useState("");
  const [CardNumber, setCardNumber] = useState("");
  const [ExpireDate, setExpireDate] = useState("");
  const [SecurityCode, setSecurityCode] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [Userid, setUserID] = useState("");
  const [book, setBook] = useState({} as any);

  interface DecodedToken {
    _id: string;
  }

  const fetchdata = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt(token) as DecodedToken;
      setUserID(decodedToken._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(title);
    fetchdata();
  }, []);

  const isValidExpireDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    return regex.test(date);
  };

  const handlePayment = () => {
    if (!NameOnCard) {
      Alert.alert("Error", "Name on Card is required");
      return;
    } else if (!CardNumber) {
      Alert.alert("Error", "Card Number is required");
      return;
    } else if (!ExpireDate) {
      Alert.alert("Error", "Expire Date must be in MM/YY format.");
      return;
    } else if (!isValidExpireDate(ExpireDate)) {
      Alert.alert("Error", "Expire Date is required");
      return;
    } else if (!SecurityCode) {
      Alert.alert("Error", "Security Code is required");
      return;
    } else if (SecurityCode.length > 5) {
      Alert.alert("Error", "Security Code is invalid");
      return;
    } else if (!PostalCode) {
      Alert.alert("Error", "Postal Code is required");
      return;
    }

    // Implement your payment logic here using the invoice details
    console.log("Payment process initiated for invoice:", {
      invoiceNumber,
      Userid,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topicContainer}>
        <Text style={styles.topicText}>Payment Invoice</Text>
      </View>

      <View style={{ flexDirection: "row", margin: 30, height: 50 }}>
        <View>
          <Image
            source={require("../../assets/images/discover.png")}
            style={styles.image}
          />
        </View>
        <View>
          <Image
            source={require("../../assets/images/mastercard.png")}
            style={styles.image}
          />
        </View>
        <View>
          <Image
            source={require("../../assets/images/paypal.png")}
            style={styles.image}
          />
        </View>
        <View>
          <Image
            source={require("../../assets/images/visa.png")}
            style={styles.image}
          />
        </View>
      </View>
      <ScrollView>
        <View style={{ width: "100%" }}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Book Name</Text>
            <TextInput style={styles.input} value={title} editable={false} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Payment amount LKR:</Text>
            <Text style={styles.input}> {price}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name on card</Text>
            <TextInput
              style={styles.input}
              value={NameOnCard}
              onChangeText={(text) => setNamaOnCard(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Card number</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={CardNumber}
              onChangeText={(text) => setCardNumber(text)}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Expire date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                value={ExpireDate}
                onChangeText={(text) => setExpireDate(text)}
              />
            </View>
            <View
              style={[
                styles.inputContainer,
                { flex: 1, marginLeft: 0, paddingLeft: 0 },
              ]}>
              <Text style={styles.label}>Security code</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={SecurityCode}
                onChangeText={(text) => setSecurityCode(text)}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ZIP/Postal code</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={PostalCode}
              onChangeText={(text) => setPostalCode(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.processPaymentButton}
            onPress={() => handlePayment()}>
            <Text style={styles.processPaymentButtonText}>PROCESS PAYMENT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    margin: 10,
    marginBottom: 20,
  },
  inputContainer: {
    margin: 4,
    padding: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    backgroundColor: "white", // White background color
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10, // Rounded corners
    padding: 10,
    width: "100%",
    shadowColor: "black", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // For Android shadow
    textAlign: "left",
    color: "#333", // Text color
  },
  input2: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
  processPaymentButton: {
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
  processPaymentButtonText: {
    color: Colors.onPrimary,
    textAlign: "center",
    fontSize: 20,
  },
});

export default PaymentScreen;
