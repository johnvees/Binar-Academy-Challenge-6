import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import analytics from '@react-native-firebase/analytics';

const Analytics = () => {
  return (
    <View>
      <TouchableOpacity
        onPress={async () =>
          await analytics().logEvent('test_event', {
            id: 3745092,
            item: 'manusia memakai baju jenis',
            description: ['round neck', 'long sleeved'],
            size: 'L',
          })
        }>
        <Text>Test Analytics</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({});
