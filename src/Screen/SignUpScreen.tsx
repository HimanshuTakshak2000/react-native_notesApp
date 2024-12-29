import {View, Text} from 'react-native';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationParaList} from '../Navigation/MainStack';

type SignUpScreenProps = {
  navigation: StackNavigationProp<RootNavigationParaList, 'Sign'>;
};

export default function SignUpScreen({navigation}: SignUpScreenProps) {
  return (
    <View>
      <Text>SignUpScreen</Text>
    </View>
  );
}
