import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import {View} from 'react-native';
import Geocoder from 'react-native-geocoding';

// import { Container } from './styles';

Geocoder.init('AIzaSyDWHYO5X0PXMBiMFvaENN4iXtVBdHccHEc');

export default function Map() {
  const [region, setRegion] = useState(null);

  function getPositionUser() {
    Geolocation.getCurrentPosition(
      // navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        });
      }, //success
      () => {}, //error
      {
        timeout: 20000, // tempo que ficara fazendo requisicoes
        enableHighAccuracy: true, // pegar log via gps
        maximumAge: 10000, //"cache"
      },
    );
  }

  useEffect(() => {
    getPositionUser();
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={region}
        showsUserLocation
        loadingEnabled
      />
    </View>
  );
}
