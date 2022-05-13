import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ms} from 'react-native-size-matters';

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <FontAwesome name="home" size={ms(24)} color="#3D426B" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
