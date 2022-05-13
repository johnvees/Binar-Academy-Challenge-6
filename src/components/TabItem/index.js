import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ms} from 'react-native-size-matters';

const TabItem = ({isFocused, onPress, label}) => {
  const Icon = () => {
    if (label === 'Home') {
      return isFocused ? (
        <FontAwesome name="home" size={ms(24)} color="#3D426B" />
      ) : (
        <FontAwesome name="home" size={ms(24)} color="#D3D3D3" />
      );
    } else if (label === 'Geo') {
      return isFocused ? (
        <FontAwesome name="map" size={ms(24)} color="#3D426B" />
      ) : (
        <FontAwesome name="map" size={ms(24)} color="#D3D3D3" />
      );
    } else if (label === 'QRCode') {
      return isFocused ? (
        <FontAwesome name="qrcode" size={ms(24)} color="#3D426B" />
      ) : (
        <FontAwesome name="qrcode" size={ms(24)} color="#D3D3D3" />
      );
    }
  };

  return (
      <TouchableOpacity onPress={onPress}>
        <Icon />
        <Text>{label}</Text>
      </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({});
