import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../../components/AppTextInput/AppTextInput";
import { RootStackScreenProps } from "../../navigators/RootNavigator";

const RegisterScreen = ({ navigation }: RootStackScreenProps<"Register">) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errormessage, setErrormessage] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    if (name === "") {
      setErrormessage("Name is required");
      return;
    }
    if (email === "") {
      setErrormessage("Email is required");
      return;
    }
    if (username === "") {
      setErrormessage("Username is required");
      return;
    }
    if (password === "") {
      setErrormessage("Password is required");
      return;
    }
    if (password.length < 6) {
      setErrormessage("Password must be at least 6 characters");
      return;
    }
    const registerData = {
      name: name,
      email: email,
      username: username,
      password: password,
    };
    console.log(registerData);
    try {
      const response = await fetch(
        "http://192.168.8.122:3001/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );

      const responseData = await response.json();

      if (responseData.message === "User is added successfully.") {
        console.log(responseData);
        navigation.navigate("Login");
      } else {
        console.log(responseData);
        setErrormessage(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={{
            padding: Spacing * 3,
            flex: 1,
          }}
        >
          <View
            style={{
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 39,
                color: Colors.primary,
                marginVertical: Spacing,
              }}
            >
              Create account
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 14,
                maxWidth: "80%",
                textAlign: "center",
              }}
            >
              Discovering New Horizons Through the Magic of Books.
            </Text>
          </View>
          <View
            style={{
              marginVertical: Spacing,
            }}
          >
            <AppTextInput
              placeholder="Name*"
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <AppTextInput
              placeholder="Email*"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <AppTextInput
              placeholder="Username*"
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <AppTextInput
              placeholder="Password*"
              secureTextEntry={showPassword ? false : true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <TouchableOpacity onPress={handleTogglePasswordVisibility}>
              <Text>{showPassword ? "Hide Password" : "Show Password"}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing,
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
            }}
            onPress={handleRegister}
          >
            <Text
              style={{
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: FontSize.medium,
                color: "red",
                alignSelf: "center",
              }}
            >
              {errormessage}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{
              padding: Spacing,
            }}
          >
            <Text
              style={{
                color: Colors.text,
                textAlign: "center",
                fontSize: FontSize.small,
                fontWeight: "bold",
              }}
            >
              Already have an account
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginVertical: Spacing,
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                textAlign: "center",
                fontSize: FontSize.small,
                fontWeight: "bold",
              }}
            >
              Or continue with
            </Text>

            <View
              style={{
                marginTop: Spacing,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-google"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-apple"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-facebook"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default RegisterScreen;
