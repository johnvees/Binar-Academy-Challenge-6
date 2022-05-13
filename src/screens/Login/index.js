import {StyleSheet, Text, View, TextInput, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginButton} from 'react-native-fbsdk-next';
import {ms} from 'react-native-size-matters';
import {firebase} from '@react-native-firebase/auth';
import TouchID from 'react-native-touch-id';

import {Button} from '../../components';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    const body = {
      email: email,
      password: password,
    };
    console.log('form:', body);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('success: ', res);
        // firebase
        //   .database()
        //   .ref(`users/${res.user.uid}/`)
        //   .once('value')
        //   .then(resDB => {
        //     console.log('data user: ', resDB.val());
        //   });
      })
      .catch(err => console.log('error: ', err));
  };

  GoogleSignin.configure({
    webClientId:
      '973985605184-atf8ueaj79osgu9s2i3dr4j43brc6v4t.apps.googleusercontent.com',
  });

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user: ', user);
        TouchID.authenticate(
          'to demo this react-native component',
          // optionalConfigObject,
        )
          .then(success => {
            console.log(success);
            alert('Authenticated Successfully');
            navigation.replace('MainApp');
          })
          .catch(error => {
            console.log(error);
            alert('Authentication Failed');
          });
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="E-mail"
        placeholderTextColor={'#000'}
        selectionColor={'#000'}
        onChangeText={text => {
          setEmail(text);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor={'#000'}
        selectionColor={'#000'}
        secureTextEntry={true}
        onChangeText={text => {
          setPassword(text);
        }}
      />
      <Button title={'Login'} onPress={login} />
      <GoogleSigninButton
        style={{width: ms(192), height: ms(48)}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={_signIn}
        // disabled={this.state.isSigninInProgress}
      />
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
