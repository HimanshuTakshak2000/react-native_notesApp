import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from '../Screen/SignUpScreen';
import LoginScreen from '../Screen/LoginScreen';
import {Auth} from './RootParaList';

const Stack = createNativeStackNavigator<Auth>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
