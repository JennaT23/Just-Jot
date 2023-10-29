import React, { useState, useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

const getLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationCoords, setLocationCoords] = useState(null);

  useEffect(() => {
    (async () => {
      // if (Platform.OS === 'android' && !Device.isDevice) {
      //   setErrorMsg(
      //     'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
      //   );
      //   return;
      // }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      console.log("hellooo???1");
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log("hellooo???2");
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log("location: ", location);
    setLocationCoords({latitude: location.coords.latitude, longitude: location.coords.longitude});
    // locationCoords = {latitude: location.coords.latitude, longitude: location.coords.longitude};
  }

  return (
    // location
    locationCoords
  );
}
export default getLocation;
