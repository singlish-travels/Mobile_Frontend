import React,{useState} from 'react';
import { View ,StyleSheet, Image, Text, SafeAreaView,Button, TextInput,TouchableOpacity} from 'react-native';
import Icon from "@expo/vector-icons/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { TabsStackScreenProps } from "../navigators/TabNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const ProfileScreen=({
    navigation,
  }: TabsStackScreenProps<"Profile">)=>{
    const [email, setemail] = useState('abcd@gmail.com');
    const [password, setPassword] = useState('password');
    const [accountNo, setAccountNo] = useState('AccountNo');
    const [address, setaddress] = useState('address');
    const [phoneNumber, setPhoneNumber] = useState('PhoneNumber');
    
    const [isEditing, setIsEditing] = useState(false);
    const [isEmailEditing, setIsEmailEditing] = useState(false);
    const [isPasswordEditing, setIsPasswordEditing] = useState(false);
    const [isAccountNoEditing, setIsAccountNoEditing] = useState(false);
    const [isAddressEditing, setIsAddressEditing] = useState(false);    
    const [isPhoneNumberEditing, setIsPhoneNumberEditing] = useState(false);

    const[textColor,setTextColor]=useState('red');

    const handleEditPress = () => {
        setIsEditing(true);
    };

    const handleSavePress = () => {
        setIsEmailEditing(false);
        setIsPasswordEditing(false);
        setIsAccountNoEditing(false);
        setIsAddressEditing(false);
        setIsPhoneNumberEditing(false);

        // Handle saving the edited text here, e.g., send it to an API or update state.
    };


    return (
        <SafeAreaView style={styles.profileContainer}>
        <View style={styles.upperPart}>
            <Text style={styles.text}>Profile</Text>
            <View style={styles.settingsButton}><Button title='Settings' /></View>
            <View style={styles.logOutButton}><Button title='Log out' /></View>
            <Image resizeMode="cover" style={styles.circle} source={require("../assets/images/photo-1483134529005-4c93495107d5.jpg")}/>
        </View>
        <View style={styles.lowerPart}>
            <Text style={styles.nameText}  >Full Name</Text>
            <View style={styles.lowerPart}>


            <View style={styles.editabletext}>
            <Text style={styles.label}>Email : </Text>
            <TextInput 
            style={[styles.textInput,{ color: isEmailEditing ? "black" :"gray" }]}
            value={email}
            editable={isEmailEditing}
            onChangeText={(newText) => setemail(newText)}
            />
            <TouchableOpacity onPress={()=>setIsEmailEditing(true)}>
            <Icon name="edit" style={{paddingLeft:5,paddingTop:5}} size={30} color="black" />            
            </TouchableOpacity>
            </View>

            <View style={styles.editabletext}>
            <Text style={styles.label}>Password : </Text>
            <TextInput 
            style={[styles.textInput,{ color: isPasswordEditing ? "black" :"gray" }]}
            value={password}
            secureTextEntry={isPasswordEditing? false:true}
            editable={isPasswordEditing}
            onChangeText={(newText) => setPassword(newText)}
            />
            <TouchableOpacity onPress={()=>setIsPasswordEditing(true)}>
            <Icon name="edit" style={{paddingLeft:5,paddingTop:5}} size={30} color="black" />            
            </TouchableOpacity>
            </View>

            <View style={styles.editabletext}>
            <Text style={styles.label}>Account Details : </Text>
            <TextInput 
            style={[styles.textInput,{ color: isAccountNoEditing ? "black" :"gray" }]}
            value={accountNo}
            editable={isAccountNoEditing}
            onChangeText={(newText) => setAccountNo(newText)}
            />
            <TouchableOpacity onPress={()=>setIsAccountNoEditing(true)}>
            <Icon name="edit" style={{paddingLeft:5,paddingTop:5}} size={30} color="black" />            
            </TouchableOpacity>
            </View>

            <View style={styles.editabletext}>  
            <Text style={styles.label}>Address : </Text>
            <TextInput 
            style={[styles.textInput,{ color: isAddressEditing ? "black" :"gray" }]}
            value={address}
            editable={isAddressEditing}
            onChangeText={(newText) => setaddress(newText)}
            />
            <TouchableOpacity onPress={()=>setIsAddressEditing(true)}>
            <Icon name="edit" style={{paddingLeft:5,paddingTop:5}} size={30} color="black" />            
            </TouchableOpacity>
            </View>

            <View style={styles.editabletext}>
            <Text style={styles.label}>Phone Number : </Text>
            <TextInput 
            style={[styles.textInput,{ color: isPhoneNumberEditing ? "black" :"gray" }]}
            value={phoneNumber}
            editable={isPhoneNumberEditing}
            onChangeText={(newText) => setPhoneNumber(newText)}
            />
            <TouchableOpacity onPress={()=>setIsPhoneNumberEditing(true)}>
            <Icon name="edit" style={{paddingLeft:5,paddingTop:5}} size={30} color="black" /> 
            </TouchableOpacity>
            </View>

            <View style={styles.editabletext}>

            <Text style={{top:10}}>
           Terms and Conditions
            </Text>
            </View>

            </View>
        </View>
        <View style={styles.saveButton}><Button title='Save' onPress={handleSavePress} /></View>
        </SafeAreaView>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({

    profileContainer:{
        flex:1,
        alignItems:"center",
    },
    upperPart:{
        backgroundColor:"#000030",
        width:"100%",
        height:"25%",
    },
    lowerPart:{
        width:"100%",
        height:"75%",
        top:100,
        left:5,
        right:10,
    },

    settingsButton:{
        width:85,
        height:60,
        position:"absolute",
        left:10,
        top:10,
    },

    logOutButton:{
        width:85,
        height:60,
        position:"absolute",
        right:10,
        top:10,
    },

    saveButton:{
        width:"100%",
        height:60,
        bottom:50,
        padding: 10,
        borderRadius: 5,
        color: 'white',
    },

    circle:{
        width:200,
        height:200,
        borderRadius:100,
        backgroundColor:"red",
        alignSelf:"center",
        top:"25%",
    },
    
    text:{
        top:25 , 
        alignSelf:"center" , 
        fontSize:36 , 
        color:"white",
        fontWeight:"bold",
    },

    nameText:{
        top:10, 
        alignSelf:"center" , 
        fontSize:36 , 
        color:"black",
        fontWeight:"bold",
        position:"absolute",
    },
    
    label:{
        alignSelf:"center",
        width:110,
    },

    textInput : {
        width: '95%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 8,
        color:"black",
    },

    editabletext:{
        flexDirection:"row",
        width: '60%',
        height: 40,
        marginBottom: 3,
    },
});