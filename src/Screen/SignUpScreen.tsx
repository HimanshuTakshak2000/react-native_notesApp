import {ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,} from 'react-native';
import React,{useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigationParaList} from '../Navigation/MainStack';

type SignUpScreenProps = {
  navigation: StackNavigationProp<RootNavigationParaList, 'Sign'>;
};

export default function SignUpScreen({navigation}: SignUpScreenProps) {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailError, setIsEmailError] = useState<Boolean>(false);
  const [isNameError, setIsNameError] = useState<Boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<Boolean>(false);
  const [isLoading, setIsloading] = useState<Boolean>(false);
  useEffect(()=>{
    setIsloading(false);
  })

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidateEmail = (email: string) => {
    return emailRegex.test(email);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isValidatePassword = (password: string) => {
    return passwordRegex.test(password);
  };

  const handleCreatePress = () => {
    // console.log('login is pressed');

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
      setIsloading(true)
      signApi();
    }
  };

  const signApi = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {email, password, name};
    const res = await fetch('http://192.168.31.199:8000/api/auth/register', {
      // please enter correct ip address(i.e 192.168.31.199) for the api as both devices must be on same wifi -- http://localhost:8000/api/auth/register
      headers,
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log('data :- ', data);
    
      ToastAndroid.show("Account Created Successfully!!", ToastAndroid.LONG);  
      navigation.navigate('Login');
    
  };

  const handleEmailChange = (text: string) => {
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
    console.log('Craete Account is pressed');
    navigation.navigate("Login");
  };

  return (
    <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            position:'relative'
          }}>
          {/* <Text>LoginScreen</Text> */}
    
          <View style={{paddingHorizontal: 20,}}>
            <Text style={{fontSize: 30, color: 'black', fontWeight: 'bold'}}>
              Create New Account
            </Text>
            <View style={{marginTop: 20, marginBottom: 30}}>
              <View style={{marginBottom: 20}}>
                <TextInput
                  placeholder="Enter Name"
                  value={name}
                  onChangeText={text => handleNameChange(text)}
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 8,
                    fontSize: 16,
                  }}
                />
                {
                  isNameError && <Text style={{marginTop: 3, color: 'red'}}>Enter Name</Text>
                }
              </View>

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
              onPress={() => handleCreatePress()}
              activeOpacity={0.6}>
              <Text
                style={{
                  padding: 15,
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                {
                  isLoading ? (<ActivityIndicator size={28} color={"white"}/>) : ("Create Account")
                }
              </Text>
            </TouchableOpacity>
    
            <TouchableOpacity
              style={{borderColor: 'black', borderRadius: 8, borderWidth: 1}}
              onPress={() => handleSignUpPress()}
              activeOpacity={0.6}>
              <Text
                style={{
                  padding: 15,
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          {
            isLoading && <View style={{backgroundColor:"transparent", position:'absolute', width:'100%', height:"100%"}} />
          }
          
          
        </View>
  );
}
