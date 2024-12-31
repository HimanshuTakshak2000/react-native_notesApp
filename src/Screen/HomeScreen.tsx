import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationParaList} from '../Navigation/MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootNavigationParaList, 'Home'>;
};

export default function HomeScreen({navigation}: HomeScreenProps) {
  const [details, setDetais] = useState<string>('');
  useEffect(() => {
    logindetails();
  }, []);
  const logindetails = async () => {
    const val = await AsyncStorage.getItem('User');
    console.log('val :- ', val);
    setDetais(val == null ? '' : val);
  };
  return (
    <View>
      <Text>HomeScreen</Text>
      <Text>{details}</Text>
    </View>
  );
}
