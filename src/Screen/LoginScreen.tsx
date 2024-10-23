import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootNavigationParaList } from '../Navigation/MainStack';

interface LoginScreenprops{
    navigation: StackNavigationProp<RootNavigationParaList, 'Login'>,
}

const LoginScreen = ({navigation}:LoginScreenprops) => {
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})