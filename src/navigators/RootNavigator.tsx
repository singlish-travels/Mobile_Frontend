import React from "react";
import { NavigatorScreenParams } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import DetailsScreen from "../screens/DetailsScreen/DetailsScreen";
import TabsNavigator, { TabsStackParamList } from "./TabNavigator";
import PdfScreen from "../screens/PdfScreen/PdfScreen";
import Login from "../screens/LoginScreen/LoginScreen";
import Register from "../screens/RegisterScreen/RegisterScreen";
import SavedWord from "../screens/SavedWordScreen/SavedWordsScreen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  Details: {
    id: string;
  };
  Pdf: { id: string };
  PdfScreen: undefined;
  SavedWord: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />

      <RootStack.Screen
        name="TabsStack"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="PdfScreen"
        component={PdfScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="SavedWord"
        component={SavedWord}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
