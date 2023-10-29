import React, { useState , useEffect} from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import getLocation from './getLocation';


const MyMap = () => {
  const testMarkerCoord = { latitude: 37.78825, longitude: -122.4324,};
  // const [myLocation, setMyLocation] = useState(null);
  // setMyLocation(getLocation());
  // const myLocation = getLocation();
  // console.log("myLocation: ", myLocation);

  const [locationCoords, setLocationCoords] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      // const locationData = await getLocation();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
      setLocationCoords({latitude: location.coords.latitude, longitude: location.coords.longitude});
    };

    fetchLocation();
  }, []);

    

  console.log("myLocation: ", locationCoords);
  console.log("lat: ", locationCoords.latitude);
  console.log("long: ", locationCoords.longitude);


  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}
        // just a random coord
        initialRegion={{
          // latitude: 37.78825,
          // longitude: -122.4324,
          latitude: locationCoords.latitude,
          longitude: locationCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
          <Marker coordinate={testMarkerCoord} title="testMarker" />
        </MapView>
    </View>
  );
}
export default MyMap;


// export default class MyMap extends React.Component {
//   testMarkerCoord = { latitude: 37.78825, longitude: -122.4324,};

//   render() {
//     const myLocation = getLocation();
//     return (
//       <View style={{ flex: 1 }}>
//         <MapView style={{ flex: 1 }}
//           // just a random coord
//           initialRegion={{
//             // latitude: 37.78825,
//             // longitude: -122.4324,
//             latitude: myLocation.latitude,
//             longitude: myLocation.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421
//           }}>
//             <Marker coordinate={this.testMarkerCoord} title="testMarker" />
//           </MapView>
//       </View>
//     );
//   }
// }

