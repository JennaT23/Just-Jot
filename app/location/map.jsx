import React, { useState , useEffect} from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { mapMarkers } from "./mapMarkers";
import { getLocation } from "./getLocation";


const MyMap = () => {
    const location = getLocation();

    // render a loading indicator
    if (location === null) {
      return <View><Text>Loading...</Text></View>;
    }

  const locationCoords = {latitude: location.coords.latitude, longitude: location.coords.longitude};

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
          {/* { mapMarkers() } */}
          <Marker coordinate={locationCoords} title="testMarker" />
        </MapView>
    </View>
  );
}
export default MyMap;
