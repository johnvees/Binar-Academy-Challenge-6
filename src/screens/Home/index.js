import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {ms} from 'react-native-size-matters';
import {firebase} from '@react-native-firebase/auth';

import {firebaseService} from '../../utils/api';

const Home = ({navigation}) => {
  const [userCounts, setUserCounts] = useState(null);

  useEffect(() => {
    crashlytics().log('App mounted.');
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('log out success');
        navigation.replace('Login');
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  const logCrashlytics = async () => {
    crashlytics().log('Dummy Details Added');
    await Promise.all([
      crashlytics().setUserId('101'),
      crashlytics().setAttribute('credits', String(50)),
      crashlytics().setAttributes({
        email: 'aboutreact11@gmail.com',
        username: 'aboutreact11',
      }),
    ]);
  };

  const logCrash = async user => {
    crashlytics().crash();
  };

  const logError = async user => {
    crashlytics().log('Updating user count.');
    try {
      if (users) {
        // An empty array is truthy, but not actually true.
        // Therefore the array was never initialised.
        setUserCounts(userCounts.push(users.length));
      }
    } catch (error) {
      crashlytics().recordError(error);
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={async () =>
          await analytics().logEvent('test_event', {
            id: 3745092,
            item: 'manusia memakai baju jenis',
            description: ['round neck', 'long sleeved'],
            size: 'L',
          })
        }>
        <Text style={styles.buttonTextStyle}>Test Analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={() => logCrashlytics()}>
        <Text style={styles.buttonTextStyle}>Log User Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={logCrash}>
        <Text style={styles.buttonTextStyle}>Log Crash</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={logError}>
        <Text style={styles.buttonTextStyle}>Log Error</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
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
        <Text style={styles.buttonTextStyle}>
          Test Remote Notification Foreground
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.buttonStyle}
        onPress={logOut}>
        <Text style={styles.buttonTextStyle}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'orange',
    padding: ms(10),
    width: '100%',
    marginTop: ms(16),
  },
});
