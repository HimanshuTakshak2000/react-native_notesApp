import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screen/SplashScreen';
import SignUpScreen from '../Screen/SignUpScreen';
import LoginScreen from '../Screen/LoginScreen';
import HomeScreen from '../Screen/HomeScreen';
import AddNotes from '../Screen/AddNotes';

export type RootNavigationParaList = {
  Splash: undefined;
  Sign: undefined;
  Login: undefined;
  Home: undefined;
  AddNotes: undefined;
};

const Stack = createNativeStackNavigator<RootNavigationParaList>();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Sign" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="AddNotes"
        component={AddNotes}
        options={{
          title: 'Add New Notes',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
