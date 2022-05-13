import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AfterSuccess = ({route}) => {
  return (
    <View>
      <Text>TEst</Text>
      <Text>{route.params.sendUri}</Text>
    </View>
  );
};

export default AfterSuccess;

const styles = StyleSheet.create({});
