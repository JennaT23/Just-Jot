import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const getLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      // check if location permission is granted
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw Error("Location access not granted");
      }

      // get location
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []); // empty dependency array to run only once (according to ChatGPT)

  return location;
}
