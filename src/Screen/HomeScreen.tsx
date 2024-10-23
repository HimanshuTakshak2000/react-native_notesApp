import { View, Text } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootNavigationParaList } from '../Navigation/MainStack'

type HomeScreenProps = {
    navigation: StackNavigationProp<RootNavigationParaList, 'Home'>
}

export default function HomeScreen({navigation}:HomeScreenProps) {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}