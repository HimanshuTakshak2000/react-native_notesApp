import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationParaList} from '../Navigation/MainStack';

interface LoginScreenprops {
  navigation: StackNavigationProp<RootNavigationParaList, 'Login'>;
}

const LoginScreen = ({navigation}: LoginScreenprops) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<Boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<Boolean>(false);

  const handleLoginPress = () => {
    console.log('login is pressed');
    
    if(email.length === 0 && password.length === 0){
      setIsEmailError(true);
      setIsPasswordError(true);
    }
  };

  const handleCreatePress = () => {
    console.log('Craete Account is pressed');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        justifyContent: 'center',
      }}>
      {/* <Text>LoginScreen</Text> */}

      <Text style={{fontSize: 30, color: 'black', fontWeight: 'bold'}}>
        Welcome Back
      </Text>
      <View style={{marginTop: 20, marginBottom: 40}}>
        <View style={{marginBottom: 20}}>
          <TextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              fontSize: 16,
            }}
          />
          {isEmailError && (
            <Text style={{marginTop: 3, color: 'red'}}>Enter Email</Text>
          )}
        </View>

        <View>
          <TextInput
            placeholder="Enter Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={{
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 8,
              fontSize: 16,
            }}
          />
          {isPasswordError && (
            <Text style={{marginTop: 3, color: 'red'}}>Enter Password</Text>
          )}
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
          Login
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
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
