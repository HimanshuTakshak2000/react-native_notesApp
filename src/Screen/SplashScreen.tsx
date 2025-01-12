import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationParaList} from '../Navigation/AppStack';
import { useSelector } from 'react-redux';
import { State } from 'react-native-gesture-handler';
import { RootState } from '../redux/store';

interface SplashScreenProps {
  navigation: StackNavigationProp<RootNavigationParaList, 'Splash'>;
}

const SplashScreen = ({navigation}: SplashScreenProps) => {
  const {isUserLogined} = useSelector((state: RootState)=> state.userLoginReducer)
  useEffect(() => {
    setTimeout(() => {
      isUserLogined ? navigation.navigate('Home'): navigation.navigate('Login');
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
