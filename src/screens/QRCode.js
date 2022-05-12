import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CameraScreen, CameraType} from 'react-native-camera-kit';
import {useIsFocused} from '@react-navigation/native';

const QRCode = () => {
  const isFocused = useIsFocused;
  const onReadCode = data => {
    alert(data.nativeEvent.codeStringValue);
  };

  return (
    <View>
      <Text>QRCode</Text>
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
