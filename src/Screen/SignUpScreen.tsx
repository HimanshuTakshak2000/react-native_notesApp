import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from '../Navigation/RootParaList';
import {baseUrl} from '../utils/baseUrl';
import {isValidateEmail, isValidatePassword} from '../utils/constant';
import Ionicons from 'react-native-vector-icons/Ionicons';

type SignUpScreenProps = {
  navigation: StackNavigationProp<Auth, 'Sign'>;
};

export default function SignUpScreen({navigation}: SignUpScreenProps) {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isEmailIdExistError, setIsEmailIdExistError] =
    useState<boolean>(false);
  const [isSecure, setIsSecure] = useState<boolean>(true);

  const handleCreatePress = () => {
    if (email.length === 0 && password.length === 0 && name.length === 0) {
      setIsEmailError(true);
      setIsNameError(true);
      setIsPasswordError(true);
    } else if (!isValidateEmail(email)) {
      setIsEmailError(true);
    } else if (!isValidatePassword(password)) {
      setIsPasswordError(true);
    } else {
      setIsEmailError(false);
      setIsPasswordError(false);
      signApi();
    }
  };

  const signApi = async () => {
    setIsloading(true);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {email: email.toLocaleLowerCase(), password, name};
    const res = await fetch(`${baseUrl}api/auth/register`, {
      // please enter correct ip address(i.e 192.168.31.200) for the api as both devices must be on same wifi -- http://localhost:8000/api/auth/register
      headers,
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.status == false) {
      setIsEmailIdExistError(true);
      setEmail(email.toLocaleLowerCase());
      ToastAndroid.show(`${data.message}`, ToastAndroid.LONG);
      setIsloading(false);
    } else {
      ToastAndroid.show('Account Created Successfully!!', ToastAndroid.LONG);
      setIsloading(false);
      navigation.navigate('Login');
    }
  };

  const handleEmailChange = (text: string) => {
    setIsEmailIdExistError(false);
    setEmail(text);
    if (!isValidateEmail(text)) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (text.length == 0) {
      setIsNameError(true);
    } else {
      setIsNameError(false);
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

  const handleSignUpPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.bodyTextHeader}>Create New Account</Text>
        <View style={styles.textInputContainer}>
          <View style={styles.nameEmailTextInputContainer}>
            <TextInput
              placeholder="Enter Name"
              value={name}
              onChangeText={text => handleNameChange(text)}
              style={styles.textInputStyle}
              placeholderTextColor={'black'}
            />
            {isNameError && <Text style={styles.errorText}>Enter Name</Text>}
          </View>

          <View style={styles.nameEmailTextInputContainer}>
            <TextInput
              placeholder="Enter Email"
              value={email}
              onChangeText={text => handleEmailChange(text)}
              style={styles.textInputStyle}
              placeholderTextColor={'black'}
            />
            {isEmailError &&
              (email.length == 0 ? (
                <Text style={styles.errorText}>Enter Email</Text>
              ) : (
                <Text style={styles.errorText}>Enter valid Email</Text>
              ))}
            {isEmailIdExistError && (
              <Text style={styles.errorText}>Email Already Exist</Text>
            )}
          </View>

          <View>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter Password"
                value={password}
                onChangeText={text => handlePasswordChange(text)}
                secureTextEntry={isSecure}
                placeholderTextColor={'black'}
                style={styles.passwordTextContainer}
              />
              <TouchableOpacity
                onPress={() => setIsSecure(!isSecure)}
                style={styles.eyeIcon}>
                <Ionicons
                  name={isSecure ? 'eye-off' : 'eye'}
                  size={26}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            {isPasswordError &&
              (password.length == 0 ? (
                <Text style={styles.errorText}>Enter Password</Text>
              ) : (
                <Text
                  style={
                    styles.errorText
                  }>{`Minimum 8 character\n1 UpperCase\n1 LowerCase\n1 Number\n1 Special Character`}</Text>
              ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.createAccountButtonContainer}
          onPress={() => handleCreatePress()}
          activeOpacity={0.6}>
          <Text style={styles.createAccountButtonText}>
            {isLoading ? (
              <ActivityIndicator size={28} color={'white'} />
            ) : (
              'Create Account'
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={() => handleSignUpPress()}
          activeOpacity={0.6}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      {isLoading && <View style={styles.loaderContainer} />}
    </View>
  );
}

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
  nameEmailTextInputContainer: {
    marginBottom: 20,
  },
  textInputStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    color: 'black',
  },
  passwordContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
  },
  passwordTextContainer: {
    fontSize: 16,
    color: 'black',
    width: '90%',
  },
  eyeIcon: {
    alignSelf: 'center',
  },
  errorText: {
    marginTop: 3,
    color: 'red',
  },
  createAccountButtonContainer: {
    backgroundColor: 'black',
    borderRadius: 8,
    marginBottom: 60,
  },
  createAccountButtonText: {
    padding: 15,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loginButtonContainer: {
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
  },
  loginButtonText: {
    padding: 15,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
