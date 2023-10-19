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
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { TabsStackScreenProps } from "../../navigators/TabNavigator";
import getPublisher from "../../api/profile/get_user";
import updateReader from "../../api/profile/update_user";
import jwt from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Padding } from "@mui/icons-material";



type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const PaymentScreen = ({ navigation }: TabsStackScreenProps<"Profile">) => {
  const statusBarHeight = StatusBar.currentHeight ?? 0;
  const [BookName, setBookName] = useState("");
  const [Price, setPrice] = useState("");
  const [NameOnCard, setNamaOnCard] = useState("");
  const [CardNumber, setCardNumber] = useState("");
  const [ExpireDate, setExpireDate] = useState("");
  const [SecurityCode, setSecurityCode] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [id, setID] = useState("");

  interface DecodedToken {
    _id: string;
  }

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

  
 
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [amount, setAmount] = useState('');
  
    const handlePayment = () => {
      // Implement your payment logic here using the invoice details
      console.log('Payment process initiated for invoice:', {
        invoiceNumber,
        amount,
      });
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style = {styles.topicContainer}>
          <Text style={styles.topicText}>Payment Invoice</Text>
          </View>
          <View style={{flexDirection:"row",margin:30,height:50}}>
            <View>
                    <Image
            source={require('../../assets/images/discover.png')} 
            style={styles.image}
          />
          </View>
          <View>
                    <Image
            source={require('../../assets/images/mastercard.png')} 
            style={styles.image}
          />
          </View>
          <View>
                    <Image
            source={require('../../assets/images/paypal.png')} 
            style={styles.image}
          />
          </View>
          <View>
                    <Image
            source={require('../../assets/images/visa.png')} 
            style={styles.image}
          />
          </View>
          </View>


<View style={{width:"100%"}}>
        <View style={styles.inputContainer}>
                <Text style={styles.label}>Name on card</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={invoiceNumber}
                  onChangeText={(text) => setInvoiceNumber(text)}
                />
              
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Card number</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={invoiceNumber}
                  onChangeText={(text) => setInvoiceNumber(text)}
                />
              
              </View>
              <View style={{flexDirection:"row"}}>
              <View style={[styles.inputContainer, { flex: 1 ,marginRight:0,paddingRight:0}]}>
                <Text style={styles.label}>Expiry date</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="MM/YY"
                  value={invoiceNumber}
                  onChangeText={(text) => setInvoiceNumber(text)}
                />
                </View>
                <View style={[styles.inputContainer, { flex: 1 ,marginLeft:0,paddingLeft:0}]}>
                <Text style={styles.label}>Security code</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={invoiceNumber}
                  onChangeText={(text) => setInvoiceNumber(text)}
                />
                </View>

              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>ZIP/Postal code</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={invoiceNumber}
                  onChangeText={(text) => setInvoiceNumber(text)}
                />
              
              </View>

              <TouchableOpacity
        style={styles.payNowButton}
        onPress={handlePayment}
      >
        <Text style={styles.payNowButtonText}>Pay Now</Text>
      </TouchableOpacity>

      </View>


      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    topicContainer: {
      width: "100%",
      height: "auto",
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
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    heading: {
      fontSize: 24,
      marginBottom: 20,
    },
    image: {
      margin:10,
      marginBottom: 20,
    },
    inputContainer: {
      margin: 4,
      padding:8,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      width: '100%',
    },
    payNowButton: {
      marginTop:20,
      backgroundColor: '#3498db', // Button background color
      padding: 15,
      borderRadius: 5, // Rounded corners
    },
    payNowButtonText: {
      fontSize: 18,
      color: 'white', // Button text color
      textAlign: 'center',
    },
  });
  
  export default PaymentScreen;
  
