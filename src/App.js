import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {firebaseService} from './utils/api';

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={async () => {
          console.log(await messaging().getToken());
        }}>
        <Text>Remote Notification Foreground</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          const body = {
              to: 'coY4PZ5pQcyjABfYyaHcJS:APA91bGeodKUFs3zXGd7EnHMXWDBHfVnqUsLBfAjP0AnxvhDYmmaH5TmME-fkj4LH2PDkwIoHdDG7C71NhjnO4ogHSLKNMS09eFI4oshkJiz6koAprls1DN-AVruRUHlaSMJnLPG0pJ_',
              notification: {
                body: 'This is an FCM notification message!',
                title: 'FCM Message',
              },
          };

          const res = await axios.post(`${firebaseService}`, body, {
            headers: {
              Authorization: `Bearer AAAA4sYQ5kA:APA91bFicLBZqOTh-SpBtuNB6HZCBl2tE5HQnQySQGtmJLtnyGqCFgABJzZhvr-jXmMMiEiXe33zr0Ec6ahPJvjotPHkLNJNCjP_ZhNeBjXZUpsFsoiAFCeSi-Z217ExH2-j3qE1UKgO`,
            },
          });
          console.log(res);
        }}>
        <Text>aaa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
