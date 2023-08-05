import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView
  } from "react-native";
  import React from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import { Ionicons } from "@expo/vector-icons";
  import { NativeStackScreenProps } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../types";
  import AppTextInput from "../components/AppTextInput";
import { TabsStackScreenProps } from "../navigators/TabNavigator";
  
  type Props = NativeStackScreenProps<RootStackParamList, "Register">;
  
  const RegisterScreen= ({ navigation }: TabsStackScreenProps<"Cart">) => {
    return (
        <ScrollView>
      <SafeAreaView>
        <View
          style={{
            padding: Spacing ,
          }}
        >
          <View
            style={{
              alignItems: "center",
              padding:10
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 39,
                color: Colors.primary,
                marginVertical: Spacing ,
              }}
            >
              Create account
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
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
            <AppTextInput placeholder="Email" />
            <AppTextInput placeholder="Password" />
            <AppTextInput placeholder="Confirm Password" />
          </View>
  
          <TouchableOpacity
            style={{
                padding: Spacing*2,
                backgroundColor: Colors.primary,
                marginVertical: Spacing,
                marginHorizontal: Spacing *5,
                borderRadius: 130,
                shadowColor: 'black',
                shadowOffset: {
                  width: 200,
                  height: 10,
                },
                shadowOpacity: 10,
                shadowRadius: 10,
                elevation: 14, // Android
            }}
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
          <TouchableOpacity
            //onPress={() => navigate("Login")}
            style={{
              padding: Spacing,
            }}
          >
            <Text
              style={{
             
                color: Colors.text,
                textAlign: "center",
                fontSize: FontSize.small,
                fontWeight: 'bold'
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
                fontWeight: 'bold'
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