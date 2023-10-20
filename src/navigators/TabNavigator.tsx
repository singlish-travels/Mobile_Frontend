import { View } from "react-native";
import React from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import PdfViewer from "../screens/PdfScreen/PdfViewer";
import Icons from "@expo/vector-icons/MaterialIcons";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackScreenProps } from "./RootNavigator";
import CustomBottomTabs from "../components/CustomBottomTabs";
import DictionaryViewer from "../screens/DictionaryScreen/DictionaryScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import OCRScreen from "../screens/OCRScreen/OCRScreen";
import CartScreen from "../screens/CartScreen/CartScreen";

export type TabsStackParamList = {
  Home: undefined;
  Dictionary: undefined;
  Cart: undefined;
  OCR: undefined;
  Profile: undefined;
};
const TabsStack = createBottomTabNavigator<TabsStackParamList>();

export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<"TabsStack">
  >;

const TabsNavigator = () => {
  return (
    <TabsStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <CustomBottomTabs {...props} />}>
      <TabsStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="home" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Dictionary"
        component={DictionaryViewer}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="search" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="add-shopping-cart" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="OCR"
        component={OCRScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="camera" {...props} />;
          },
        }}
      />
      <TabsStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="person" {...props} />;
          },
        }}
      />
    </TabsStack.Navigator>
  );
};

export default TabsNavigator;

const Example = () => {
  return <View />;
};
