import React from "react";
import { SafeAreaView } from "react-native";
import Text from '../../../appStyles/customStyle'
import MyMap from "../../location/map";

export const Map = ({navigation}) => {
    
    return(
        <SafeAreaView  style={{flex: 1}}>
            <MyMap/>
        </SafeAreaView>
    )
}