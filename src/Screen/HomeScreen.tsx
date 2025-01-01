import {View, Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationParaList} from '../Navigation/MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootNavigationParaList, 'Home'>;
};

type noteType = {
  "_id": string,
  "title": string,
  "description": string,
  "postedById": string,
  "postedByName": string,
  "createdAt": string,
  "updatedAt": string,
  "__v": number
}

export default function HomeScreen({navigation}: HomeScreenProps) {
  const [details, setDetais] = useState<string>('');
  const [notes, setNotes] = useState<noteType[]>([])
  useEffect(() => {
    getAllNotes();
  }, []);
  const getAllNotes = async() =>{
    const user = await AsyncStorage.getItem('User');
    if(user){
      const parsedUser = JSON.parse(user); 
      const userId = parsedUser._id;
      
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
      <View style={styles.header}>
        <Text style={styles.title}>
          Notes App
        </Text>
      </View>
      {

      }
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>
          Create Note
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
  },
  header:{
    width:"100%",
    height:60,
    backgroundColor:"white",
    elevation: 5,
    justifyContent:"center",
    paddingLeft: 20,
    // alignItems:"center",
  },
  title:{
    color:'black',
    fontSize: 18,
    fontWeight: '600',
  },
  btn:{
    position:'absolute',
    width: 200,
    height: 50,
    borderRadius: 30,
    right: 20,
    bottom: 20,
    backgroundColor:"black",
    justifyContent:'center',
    alignItems: 'center',
  },
  btnText:{
    color:'white',
    fontSize:16,
    fontWeight:'600'
  }
})
