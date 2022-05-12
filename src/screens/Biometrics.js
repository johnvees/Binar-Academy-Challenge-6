import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import TouchID from 'react-native-touch-id';

const Biometrics = () => {
  const optionalConfigObject = {
    title: 'Authentication Required',
    color: '#e00606',
  };

  const pressHandler = () => {
    TouchID.authenticate(
      'to demo this react-native component',
      optionalConfigObject,
    )
      .then(success => {
        // alert(success);
        alert('Authenticated Successfully');
      })
      .catch(error => {
        alert('Authentication Failed');
      });
  };

  const clickHandler = () => {
    TouchID.isSupported()
      .then(biometryType => {
        if (biometryType === 'FaceID') {
          alert('FaceID Supported');
        } else if (biometryType === 'TouchID') {
          alert('TouchID Supported');
        } else if (biometryType === true) {
          alert('Supported TouchID for Android');
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={() => pressHandler()}>
        <Text>Authentication With Touch ID</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clickHandler()}>
        <Text>Check is Support for Biometrics</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Biometrics;

const styles = StyleSheet.create({});
