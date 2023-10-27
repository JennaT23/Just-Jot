import React from "react";
import { SafeAreaView } from "react-native";
import Text from '../../../appStyles/customStyle'
import { location as Location } from "../../location/location";

export const Map = ({navigation}) => {
    
    return(
        <SafeAreaView>
            <Text>Map page</Text>
            <Location/>
        </SafeAreaView>
    )
}