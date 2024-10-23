import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationParaList} from '../Navigation/MainStack';

interface SplashScreenProps {
  navigation: StackNavigationProp<RootNavigationParaList, 'Splash'>;
}

const SplashScreen = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Notes App</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    color: 'white',
    fontSize: 50,
  },
});
