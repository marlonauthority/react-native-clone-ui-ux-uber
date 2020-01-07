import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

export default function Directions({destination, origin, onReady}) {
  return (
    <MapViewDirections
      destination={destination}
      origin={origin}
      onReady={onReady}
      apikey="AIzaSyDWHYO5X0PXMBiMFvaENN4iXtVBdHccHEc"
      strokeWidth={3}
      strokeColor="#222"
    />
  );
}
