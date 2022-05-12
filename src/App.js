import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const App = () => {
  const {width, height} = Dimensions.get('window');

  // console.log(width);
  // console.log(height);

  const ASPECT_RATIO = width / height;
  const LATITUDE = -7.3114488;
  const LONGITUDE = 112.7822867;
  const LATITUDE_DELTA = 0.002;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  // console.log(LONGITUDE_DELTA);
  const SPACE = 0.01;

  const [currentPosition, setCurrentPosition] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        // alert(JSON.stringify(position))
        const {latitude, longitude} = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude,
          longitude,
        });
      },
      error => alert(error.message),
      {timeout: 2000, maximumAge: 1000},
    );
  });

  return (
    <View>
      <Text>App</Text>
      <MapView
        style={{width: 300, height: 300}}
        provider={PROVIDER_GOOGLE}
        region={currentPosition}
        showsUserLocation>
        <Marker
          onPress={() => alert('Marker Hit')}
          coordinate={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
          }}
          title="Test Map Title"
          description="Test Map Desc">
          <Callout tooltip>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.7)',
                paddingHorizontal: 18,
                paddingVertical: 12,
                borderRadius: 20,
              }}>
              <Text>Test Map</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
