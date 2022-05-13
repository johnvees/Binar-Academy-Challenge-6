import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
