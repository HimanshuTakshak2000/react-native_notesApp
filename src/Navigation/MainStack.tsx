import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLogin} from '../redux/loginReducer';
import {createStackNavigator} from '@react-navigation/stack';
import {RootParaList} from './RootParaList';
import SplashScreen from '../Screen/SplashScreen';
const Stack = createStackNavigator<RootParaList>();

const MainStack: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getLoginDetails();
  });
  const getLoginDetails = async () => {
    const user = await AsyncStorage.getItem('User');
    if (user) {
      dispatch(setLogin({isLogin: true}));
    } else {
      dispatch(setLogin({isLogin: false}));
    }
  };
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
