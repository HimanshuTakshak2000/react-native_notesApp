import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParaList} from '../Navigation/RootParaList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../utils/baseUrl';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {isValidateEmail} from '../utils/constant';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootParaList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<Boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<Boolean>(false);
  const [isLoading, setIsloading] = useState<Boolean>(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    setIsloading(false);
    setIsEmailError(false);
    setIsPasswordError(false);
  },[isFocused]);

  const handleLoginPress = () => {
    if (email.length === 0 && password.length === 0) {
      setIsEmailError(true);
      setIsPasswordError(true);
    } else if (!isValidateEmail(email)) {
      setIsEmailError(true);
    } else if (password.length === 0) {
      setIsPasswordError(true);
    } else {
      setIsEmailError(false);
      setIsPasswordError(false);
      setIsloading(true);
      loginApi();
    }
  };

  const loginApi = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {email, password};
    const res = await fetch(`${baseUrl}api/auth/login`, {
      headers,
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.status == false) {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      setIsloading(false);
    } else {
      await AsyncStorage.setItem('User', JSON.stringify(data));
      navigation.replace('App', {screen: 'Home'});
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!isValidateEmail(text)) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text.length == 0) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
  };

  const handleCreatePress = () => {
    navigation.navigate('Auth', {screen: 'Sign'});
  };

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyTextHeader}>Welcome Back</Text>
        <View style={styles.textInputContainer}>
          <View style={styles.emailTextInputContainer}>
            <TextInput
              placeholder="Enter Email"
              value={email}
              onChangeText={text => handleEmailChange(text)}
              style={styles.textInputStyle}
            />
            {isEmailError &&
              (email.length == 0 ? (
                <Text style={styles.errorText}>Enter Email</Text>
              ) : (
                <Text style={styles.errorText}>Enter valid Email</Text>
              ))}
          </View>

          <View>
            <TextInput
              placeholder="Enter Password"
              value={password}
              onChangeText={text => handlePasswordChange(text)}
              style={styles.textInputStyle}
            />
            {isPasswordError && (
              <Text style={styles.errorText}>Enter Password</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={() => handleLoginPress()}
          activeOpacity={0.6}>
          <Text style={styles.loginButtonText}>
            {isLoading ? (
              <ActivityIndicator size={28} color={'white'} />
            ) : (
              'Login'
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccountButtonContainer}
          onPress={() => handleCreatePress()}
          activeOpacity={0.6}>
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      {isLoading && <View style={styles.loaderContainer} />}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    position: 'relative',
  },
  loaderContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bodyContainer: {
    paddingHorizontal: 20,
  },
  bodyTextHeader: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  textInputContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  emailTextInputContainer: {
    marginBottom: 20,
  },
  textInputStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  errorText: {
    marginTop: 3,
    color: 'red',
  },
  loginButtonContainer: {
    backgroundColor: 'black',
    borderRadius: 8,
    marginBottom: 60,
  },
  loginButtonText: {
    padding: 15,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  createAccountButtonContainer: {
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
  },
  createAccountButtonText: {
    padding: 15,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
