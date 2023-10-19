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
      <SafeAreaView>
        <View>

        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
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
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      width: '100%',
    },
  });
  
  export default PaymentScreen;
  
