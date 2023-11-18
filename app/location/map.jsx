import React, { useState , useEffect} from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { mapMarkers } from "./mapMarkers";
import { getLocation } from "./getLocation";
import { appstyle as app_style } from "../../appStyles/appstyle";
import useThemedStyles from '../../appStyles/useThemedStyles';

const MyMap = () => {
    const location = getLocation();
    const appstyle = useThemedStyles(app_style);

    // render a loading indicator
    if (location === null) {
      return <View style={appstyle.loadingContainer}><Text style={appstyle.loadingText}>Loading...</Text></View>;
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
