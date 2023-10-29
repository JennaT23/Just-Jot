import React, { useState, useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

export const location = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log("lat: ", location.coords.latitude);
    console.log("long: ", location.coords.longitude);
  }

  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
}
