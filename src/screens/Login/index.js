import {StyleSheet, Text, View, TextInput, SafeAreaView} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginButton} from 'react-native-fbsdk-next';

import {Button} from '../../components';

const Login = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="E-mail"
        placeholderTextColor={'#000'}
        selectionColor={'#000'}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor={'#000'}
        selectionColor={'#000'}
        secureTextEntry={true}
      />
      <Button title={'Login'} />
      <GoogleSigninButton
        style={{width: 192, height: 48}}
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
