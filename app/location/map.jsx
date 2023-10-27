import React from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";

export default class MyMap extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }}
          // just a random coord
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}></MapView>
      </View>
    );
  }
}

