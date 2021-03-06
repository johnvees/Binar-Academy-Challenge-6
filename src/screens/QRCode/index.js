import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CameraScreen, CameraType} from 'react-native-camera-kit';
import {useNavigation} from '@react-navigation/native';

const QRCode = () => {
  const navigation = useNavigation();

  const onReadCode = data => {
    alert(data.nativeEvent.codeStringValue);
    navigation.navigate('AfterSuccess', {
      sendUri: data.nativeEvent.codeStringValue,
    });
  };

  return (
    <View>
      <CameraScreen
        CameraType={CameraType.Back}
        scanBarcode={true}
        onReadCode={event => {
          onReadCode(event);
        }}
        showFrame={true}
        laserColor="red"
        frameColor="white"
      />
    </View>
  );
};

export default QRCode;

const styles = StyleSheet.create({});
