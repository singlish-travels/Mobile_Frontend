import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import FontSize from "../../constants/FontSize";
import Spacing from "../../constants/Spacing";

const AppTextInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={Colors.darkText}
      style={[
        {
          fontSize: FontSize.small,
          fontStyle: "italic",
          fontWeight: "500",
          padding: Spacing * 2,
          backgroundColor: Colors.lightPrimary,
          borderRadius: Spacing,
          marginVertical: Spacing,
        },
        focused && {
          borderWidth: 3,
          borderColor: Colors.primary,
          shadowOffset: { width: 14, height: Spacing },
          shadowColor: Colors.darkText,
          shadowOpacity: 0.9,
          shadowRadius: Spacing,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
