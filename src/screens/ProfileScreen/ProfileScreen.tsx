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

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const ProfileScreen = ({ navigation }: TabsStackScreenProps<"Profile">) => {
  const statusBarHeight = StatusBar.currentHeight ?? 0;
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [biodata, setBiodata] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [isAccountNoEditing, setIsAccountNoEditing] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);
  const [isPhoneNumberEditing, setIsPhoneNumberEditing] = useState(false);

  const fetchdata = async () => {
    try {
      const responseData = await getPublisher();
      setName(responseData.user[0].name);
      setemail(responseData.user[0].email);
      setUsername(responseData.user[0].username);
      setBiodata(responseData.user[0].bio_data);
      setPhoneNumber(responseData.user[0].phonenumber);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const handleSavePress = async () => {
    setIsEmailEditing(false);
    setIsPasswordEditing(false);
    setIsAccountNoEditing(false);
    setIsAddressEditing(false);
    setIsPhoneNumberEditing(false);
    interface UserData {
      id: string;
      name: string;
      email: string;
      username: string;
      bio_data?: string;
      phonenumber?: string;
      password?: string;
    }

    const updateData: UserData = {
      id: "64f6f556104f2b6525e78793",
      name: name,
      email: email,
      username: username,
    };

    if (password !== "") {
      updateData.password = password;
    }
    if (biodata !== "") {
      updateData.bio_data = biodata;
    }
    if (phoneNumber !== "") {
      updateData.phonenumber = phoneNumber;
    }
    try {
      const response = await fetch(
        "http://192.168.8.122:3001/api/user/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: statusBarHeight,
      }}
    >
      <View style={styles.upperPart}>
        <Text style={styles.text}>Profile</Text>
        <View style={styles.settingsButton}>
          <Button title="Settings" />
        </View>
        <View style={styles.logOutButton}>
          <Button title="Log out" />
        </View>
        <Image
          resizeMode="cover"
          style={styles.circle}
          source={require("../../assets/images/photo-1483134529005-4c93495107d5.jpg")}
        />
      </View>
      <View style={styles.lowerPart}>
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.lowerPart}>
          <View style={styles.editabletext}>
            <Text style={styles.label}>Name : </Text>
            <TextInput
              style={[
                styles.textInput,
                { color: isNameEditing ? "black" : "gray" },
              ]}
              value={name}
              editable={isNameEditing}
              onChangeText={(newText) => setName(newText)}
            />
            <TouchableOpacity onPress={() => setIsNameEditing(true)}>
              <Icon
                name="edit"
                style={{ paddingLeft: 5, paddingTop: 5 }}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.editabletext}>
            <Text style={styles.label}>Email : </Text>
            <TextInput
              style={[
                styles.textInput,
                { color: isEmailEditing ? "black" : "gray" },
              ]}
              value={email}
              editable={isEmailEditing}
              onChangeText={(newText) => setemail(newText)}
            />
            <TouchableOpacity onPress={() => setIsEmailEditing(true)}>
              <Icon
                name="edit"
                style={{ paddingLeft: 5, paddingTop: 5 }}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.editabletext}>
            <Text style={styles.label}>Password : </Text>
            <TextInput
              style={[
                styles.textInput,
                { color: isPasswordEditing ? "black" : "gray" },
              ]}
              value={password}
              secureTextEntry={isPasswordEditing ? false : true}
              editable={isPasswordEditing}
              onChangeText={(newText) => setPassword(newText)}
            />
            <TouchableOpacity onPress={() => setIsPasswordEditing(true)}>
              <Icon
                name="edit"
                style={{ paddingLeft: 5, paddingTop: 5 }}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.editabletext}>
            <Text style={styles.label}>Username : </Text>
            <TextInput
              style={[
                styles.textInput,
                { color: isAccountNoEditing ? "black" : "gray" },
              ]}
              value={username}
              editable={isAccountNoEditing}
              onChangeText={(newText) => setUsername(newText)}
            />
            <TouchableOpacity onPress={() => setIsAccountNoEditing(true)}>
              <Icon
                name="edit"
                style={{ paddingLeft: 5, paddingTop: 5 }}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.editabletext}>
            <Text style={styles.label}>Bio data : </Text>
            <TextInput
              style={[
                styles.textInput,
                { color: isAddressEditing ? "black" : "gray" },
              ]}
              value={biodata}
              editable={isAddressEditing}
              onChangeText={(newText) => setBiodata(newText)}
            />
            <TouchableOpacity onPress={() => setIsAddressEditing(true)}>
              <Icon
                name="edit"
                style={{ paddingLeft: 5, paddingTop: 5 }}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.editabletext}>
            <Text style={styles.label}>Phone Number : </Text>
            <TextInput
              style={[
                styles.textInput,
                { color: isPhoneNumberEditing ? "black" : "gray" },
              ]}
              value={phoneNumber}
              editable={isPhoneNumberEditing}
              onChangeText={(newText) => setPhoneNumber(newText)}
            />
            <TouchableOpacity onPress={() => setIsPhoneNumberEditing(true)}>
              <Icon
                name="edit"
                style={{ paddingLeft: 5, paddingTop: 5 }}
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.editabletext}>
            <Text style={{ top: 10 }}>Terms and Conditions</Text>
          </View>
        </View>
      </View>
      <View style={styles.saveButton}>
        <Button title="Save" onPress={handleSavePress} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
  upperPart: {
    backgroundColor: "#000030",
    width: "100%",
    height: "25%",
  },
  lowerPart: {
    width: "100%",
    height: "75%",
    top: 100,
    left: 5,
    right: 10,
  },

  settingsButton: {
    width: 85,
    height: 60,
    position: "absolute",
    left: 10,
    top: 10,
  },

  logOutButton: {
    width: 85,
    height: 60,
    position: "absolute",
    right: 10,
    top: 10,
    borderRadius: 5,
  },

  saveButton: {
    width: "100%",
    height: 60,
    bottom: 50,
    padding: 10,
    borderRadius: 5,
    color: "white",
  },

  circle: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "red",
    alignSelf: "center",
    top: "25%",
    shadowColor: "black",
  },

  text: {
    top: 25,
    alignSelf: "center",
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
  },

  nameText: {
    top: 10,
    alignSelf: "center",
    fontSize: 36,
    color: "black",
    fontWeight: "bold",
    position: "absolute",
  },

  label: {
    alignSelf: "center",
    width: 110,
    fontWeight: "bold",
  },

  textInput: {
    width: "95%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 8,
    color: "black",
    borderRadius: 5,
  },

  editabletext: {
    flexDirection: "row",
    width: "60%",
    height: 40,
    marginBottom: 3,
  },
});
