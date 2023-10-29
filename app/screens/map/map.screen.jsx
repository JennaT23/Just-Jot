import React from "react";
import { SafeAreaView } from "react-native";
import Text from '../../../appStyles/customStyle'
import { location as Location } from "../../location/location";
import MyMap from "../../location/map";

export const Map = ({navigation}) => {
    
    return(
        <SafeAreaView  style={{flex: 1}}>
            <MyMap/>
            <Location/>
        </SafeAreaView>
    )
}