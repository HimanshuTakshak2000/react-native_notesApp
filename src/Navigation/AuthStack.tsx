import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screen/SplashScreen';
import SignUpScreen from '../Screen/SignUpScreen';
import LoginScreen from '../Screen/LoginScreen';

export type RootNavigationParaList = {
  Splash: undefined;
  Sign: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootNavigationParaList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Sign" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}