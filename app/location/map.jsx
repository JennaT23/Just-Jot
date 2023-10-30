import React, { useState , useEffect} from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
// import getLocation from './getLocation';
import { mapMarkers } from "./mapMarkers";


const MyMap = () => {
  const testMarkerCoord = { latitude: 37.78825, longitude: -122.4324,};


  const [latitudeCoords, setLatitudeCoords] = useState(null);
  const [longitudeCoords, setLongitudeCoords] = useState(null);

  // const [locationCoords, setLocationCoords] = useState(null);

    const fetchLocation = async () => {

      try {
        let { status } =  await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          throw Error("Sadface")
        }

        let location =  await Location.getCurrentPositionAsync({})

        console.log(`location: ${location.coords.latitude}`)

        setLatitudeCoords(location.coords.latitude)

        setLongitudeCoords(location.coords.longitude)
      } catch {
        console.error("sadface man")
      }
    };

    useEffect(() => {
      fetchLocation(); // Call your function here
    }, []);


  if (latitudeCoords === null && longitudeCoords === null) {
    // You can render a loading indicator here if needed
    return <View><Text>Loading...</Text></View>;
  }
    

  // console.log("myLocation: ", locationCoords);
  // console.log("lat: ", locationCoords.latitude);
  // console.log("lng: ", locationCoords.longitude);


  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}
        initialRegion={{
          latitude: latitudeCoords,
          longitude: longitudeCoords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
          {/* { mapMarkers() } */}
          {/* <Marker coordinate={locationCoords} title="testMarker" /> */}
        </MapView>
    </View>
  );
}
export default MyMap;
