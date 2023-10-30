import React, { useState } from 'react';
import * as Location from 'expo-location';

export const getLatitude = async () => {

  const [latitudeCoords, setlatitudeCoords] = useState(null);

  if (await Location.requestForegroundPermissionsAsync() !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }
  let location = await Location.getCurrentPositionAsync();

  setlatitudeCoords(location.coords.latitude);

  return;
}

export const getLongitude = async () => {
  const [longitudeCoords, setlongitudeCoords] = useState(null);

  if (await Location.requestForegroundPermissionsAsync() !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }
  let location = await Location.getCurrentPositionAsync();

  setlongitudeCoords(location.coords.longitude);

  return;
}


