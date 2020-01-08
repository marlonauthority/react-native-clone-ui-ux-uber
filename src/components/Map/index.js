import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';

import Search from '../Search';
import Directions from '../Directions';
import {getPixelSize} from '../../utils';

import {View} from 'react-native';
import Geocoder from 'react-native-geocoding';

// import { Container } from './styles';

Geocoder.init('AIzaSyDWHYO5X0PXMBiMFvaENN4iXtVBdHccHEc');

export default function Map() {
  const [region, setRegion] = useState(null);
  const [destination, setDestination] = useState(null);

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

  function handleLocationSelected(data, {geometry}) {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={region}
        showsUserLocation
        loadingEnabled
        ref={el => (this.mapView = el)}>
        {destination && (
          <Directions
            origin={region}
            destination={destination}
            onReady={result => {
              this.mapView.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: getPixelSize(50),
                  left: getPixelSize(50),
                  top: getPixelSize(50),
                  bottom: getPixelSize(50),
                },
              });
            }}
          />
        )}
      </MapView>
      <Search onLocationSelected={handleLocationSelected} />
    </View>
  );
}
