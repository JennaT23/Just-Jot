import { appstyle } from "../../../appStyles/appstyle";
import Text from "../../../appStyles/customStyle";
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export const ViewEntry = ({ navigation, route }) => {
    console.log('entryData', route.params.entry);
    const entry = route.params.entry;

    const formatCustomDateTime = (dateTime) => {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const day = days[dateTime.getDay()];
        const month = months[dateTime.getMonth()];
        const date = dateTime.getDate();
        const year = dateTime.getFullYear();

        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        return `${day} ${month} ${date} ${year} ${formattedTime}`;
    };

    return (
        <SafeAreaView>
            <Text style={appstyle.title}>{entry.Date && formatCustomDateTime(entry.Date.toDate())}</Text>
            <Text>{entry.Text}</Text>
        </SafeAreaView>
    );
};