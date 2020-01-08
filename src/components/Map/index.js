import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';

import Search from '../Search';
import Directions from '../Directions';
import {getPixelSize} from '../../utils';

import {View} from 'react-native';
import Geocoder from 'react-native-geocoding';

import markerImage from '../../assets/marker.png';

import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeBoxText,
  LocationTimeBoxSmall,
} from './styles';

Geocoder.init('AIzaSyDWHYO5X0PXMBiMFvaENN4iXtVBdHccHEc');

export default function Map() {
  const [region, setRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);
  const [location, setLocation] = useState(null);

  function getPositionUser() {
    Geolocation.getCurrentPosition(
      async ({coords: {latitude, longitude}}) => {
        const response = await Geocoder.from({latitude, longitude});
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(','));
        setLocation(location);

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
          <>
            <Directions
              origin={region}
              destination={destination}
              onReady={result => {
                setDuration(Math.floor(result.duration));
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: getPixelSize(70),
                    left: getPixelSize(70),
                    top: getPixelSize(70),
                    bottom: getPixelSize(70),
                  },
                });
              }}
            />
            <Marker
              coordinate={destination}
              anchor={{x: 0, y: 0}}
              image={markerImage}>
              <LocationBox>
                <LocationText>{destination.title}</LocationText>
              </LocationBox>
            </Marker>

            <Marker coordinate={region} anchor={{x: 0, y: 0}}>
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeBoxText>{duration}</LocationTimeBoxText>
                  <LocationTimeBoxSmall>min</LocationTimeBoxSmall>
                </LocationTimeBox>
                <LocationText>{location}</LocationText>
              </LocationBox>
            </Marker>
          </>
        )}
      </MapView>
      <Search onLocationSelected={handleLocationSelected} />
    </View>
  );
}
