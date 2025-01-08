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
import {RootNavigationParaList} from '../Navigation/MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../utils/baseUrl';
interface LoginScreenprops {
  navigation: StackNavigationProp<RootNavigationParaList, 'Login'>;
}

const LoginScreen = ({navigation}: LoginScreenprops) => {
  const [email, setEmail] = useState<string>('himanshutakshak2000@gmail.com');
  const [password, setPassword] = useState<string>('Test@123');
  const [isEmailError, setIsEmailError] = useState<Boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<Boolean>(false);
  const [isLoading, setIsloading] = useState<Boolean>(false);
  useEffect(() => {
    setIsloading(false);
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidateEmail = (email: string) => {
    return emailRegex.test(email);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isValidatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

  const handleLoginPress = () => {
    // console.log('login is pressed');

    if (email.length === 0 && password.length === 0) {
      setIsEmailError(true);
      setIsPasswordError(true);
    } else if (!isValidateEmail(email)) {
      setIsEmailError(true);
    } else if (!isValidatePassword(password)) {
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
    console.log('data :- ', data);
    if (data.status == false) {
      ToastAndroid.show(data.message, ToastAndroid.SHORT);
      setIsloading(false);
    } else {
      await AsyncStorage.setItem('User', JSON.stringify(data));
      navigation.navigate('Home');
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
    if (!isValidatePassword(text)) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
  };

  const handleCreatePress = () => {
    console.log('Craete Account is pressed');
    navigation.navigate('Sign');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        position: 'relative',
      }}>
      {/* <Text>LoginScreen</Text> */}

      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 30, color: 'black', fontWeight: 'bold'}}>
          Welcome Back
        </Text>
        <View style={{marginTop: 20, marginBottom: 30}}>
          <View style={{marginBottom: 20}}>
            <TextInput
              placeholder="Enter Email"
              value={email}
              onChangeText={text => handleEmailChange(text)}
              style={{
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 8,
                fontSize: 16,
              }}
            />
            {isEmailError &&
              (email.length == 0 ? (
                <Text style={{marginTop: 3, color: 'red'}}>Enter Email</Text>
              ) : (
                <Text style={{marginTop: 3, color: 'red'}}>
                  Enter valid Email
                </Text>
              ))}
          </View>

          <View>
            <TextInput
              placeholder="Enter Password"
              value={password}
              onChangeText={text => handlePasswordChange(text)}
              style={{
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 8,
                fontSize: 16,
              }}
            />
            {isPasswordError &&
              (password.length == 0 ? (
                <Text style={{marginTop: 3, color: 'red'}}>Enter Password</Text>
              ) : (
                <Text
                  style={{
                    marginTop: 3,
                    color: 'red',
                  }}>{`Minimum 8 character\n1 UpperCase\n1 LowerCase\n1 Number\n1 Special Character`}</Text>
              ))}
          </View>
        </View>

        <TouchableOpacity
          style={{backgroundColor: 'black', borderRadius: 8, marginBottom: 60}}
          onPress={() => handleLoginPress()}
          activeOpacity={0.6}>
          <Text
            style={{
              padding: 15,
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            {isLoading ? (
              <ActivityIndicator size={28} color={'white'} />
            ) : (
              'Login'
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{borderColor: 'black', borderRadius: 8, borderWidth: 1}}
          onPress={() => handleCreatePress()}
          activeOpacity={0.6}>
          <Text
            style={{
              padding: 15,
              color: 'black',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading && (
        <View
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
