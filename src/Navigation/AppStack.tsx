import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screen/HomeScreen';
import AddNotes from '../Screen/AddNotes';
import { App } from './RootParaList';

const Stack = createNativeStackNavigator<App>();
export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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