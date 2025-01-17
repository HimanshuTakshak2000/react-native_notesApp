import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useNavigation} from '@react-navigation/native';
import {RootParaList} from '../Navigation/RootParaList';
import {StackNavigationProp} from '@react-navigation/stack';

const SplashScreen = () => {
  const {isUserLogined} = useSelector(
    (state: RootState) => state.userLoginReducer,
  );
  const navigation = useNavigation<StackNavigationProp<RootParaList>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      isUserLogined
        ? navigation.replace('App', {screen: 'Home'})
        : navigation.replace('Auth', {screen: 'Login'});
    }, 3000);

    return () => clearTimeout(timeout); // clear the time out on unmounting
  }, [isUserLogined]); // navigation

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
