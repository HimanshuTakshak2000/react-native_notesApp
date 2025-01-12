import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Screen/SplashScreen';
import HomeScreen from '../Screen/HomeScreen';
import AddNotes from '../Screen/AddNotes';

export type RootNavigationParaList = {
  Splash: undefined;
  Home: undefined;
  AddNotes: undefined;
};

const Stack = createNativeStackNavigator<RootNavigationParaList>();
export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
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
  )
}