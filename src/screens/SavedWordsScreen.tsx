import React from 'react';
import { SafeAreaView, Text, View,StyleSheet, FlatList,TouchableOpacity,Alert } from 'react-native';
import Icon from "@expo/vector-icons/MaterialIcons";

function SavedWords(props) {
  const handleDeleteWord = () => {
    Alert.alert(
      'Delete Word',
      'Are you sure you want to delete this word?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Implement the deletion logic here
          },
          style: 'destructive', 
        },
      ],
      { cancelable: true } 
    );
  };

  const DisplayHome=()=>{

  };

  const DATA =[
    {
      word: "Dog",
      meaning: "A domesticated mammal of the species Canis lupus familiaris, known for its loyalty and companionship with humans.",
      example: "My dog enjoys going for walks in the park."
    },
    {
      word: "Ocean",
      meaning: "A vast body of saltwater that covers most of the Earth's surface, consisting of interconnected seas and providing habitat for various marine life.",
      example: "The ocean's waves crashed against the shore."
    },
    {
      word: "Sunflower",
      meaning: "A tall plant with a large, yellow flower head that follows the movement of the sun and is cultivated for its seeds, oil, and ornamental beauty.",
      example: "The sunflower in our garden turned to face the sun throughout the day."
    },
    {
      word: "Computer",
      meaning: "An electronic device capable of processing data, performing calculations, and executing tasks based on programmed instructions, used for various purposes such as data processing and communication.",
      example: "I use my computer for work and entertainment."
    },
    {
      word: "Adventure",
      meaning: "An exciting or unusual experience, often involving exploration, travel, or risky activities, typically undertaken with a spirit of excitement and curiosity.",
      example: "Going on a backpacking adventure through the mountains was an unforgettable experience."
    },
    
  ];

  return (
   <SafeAreaView>
    <View style={styles.topicContainer} >
      <TouchableOpacity onPress={()=>DisplayHome()} style={{flexDirection:"row"}}>
      <Icon name ="keyboard-arrow-left" style={{paddingLeft:5,paddingTop:5}} size={30} color="white"/>
      <Text style={{color:"white",alignSelf:"center",fontSize:20}} >Home</Text></TouchableOpacity>
      <Text style={styles.topicText}>Saved Words</Text></View>

     <View style={styles.WordsContainer}>
     <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.wordItem}>
            <TouchableOpacity onPress={handleDeleteWord}>
            <Icon name="delete" style={{ right:5, position:"absolute",paddingBottom:10}} size={30} />
            </TouchableOpacity>
            <Text style={{color:"black",alignSelf:"flex-start",fontSize:20,fontWeight:"bold",paddingBottom:10}}>{item.word}</Text>
            <Text style={{color:"black",alignSelf:"flex-start",fontSize:20}}>{item.meaning}</Text>
            <Text style={{color:"black",alignSelf:"flex-start",fontSize:20 , paddingTop:10}}>Example : {item.example}</Text>
          </View>
        )}
      />
     </View>
    
   </SafeAreaView>
  );
}

export default SavedWords;

const styles = StyleSheet.create({
  topicContainer:{
    width:"100%",
    height:100,
    backgroundColor:"#000030",
    justifyContent:"center"
  },
  topicText:{
    fontSize:30,
    color:"white",
    alignSelf:"center",
  },
  wordItem: {
    marginTop: 10,
    padding: 10,
    borderColor: 'gray',
    color:"white",
    borderWidth: 1,
    borderRadius: 5,
    width:"95%",
    alignSelf:"center",
    backgroundColor:"white",
    shadowOpacity:4,
  },
  WordsContainer:{
    backgroundColor:"#FFFFF0",
  }
});