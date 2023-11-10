import { Paragraph, Subheading, Title, IconButton } from "react-native-paper";
import { appstyle } from "../../../../appStyles/appstyle";
import Text from "../../../../appStyles/customStyle";
import React from 'react';
import { useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { viewEntryStyle } from "./viewEntry.style";
import useThemedStyles from "../../../../appStyles/useThemedStyles";
import { ScrollView, View, Image } from "react-native";
import { newEntrystyle as newEntry_style } from '../newEntry/newEntry.style'
import useTheme from '../../../../appStyles/useTheme'
import { HeaderBackButton } from '@react-navigation/elements'


export const ViewEntry = ({ navigation, route }) => {
    const viewstyle = useThemedStyles(viewEntryStyle);
    const newEntrystyle = useThemedStyles(newEntry_style);
    const handleExitView = route.params.handleExitView;

    const theme = useTheme();

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

    const moveToEditEntry = () => {
        navigation.navigate('EditEntry', { entry });
    }

    const formatGeoPoint = (geopoint) => {
        const lat = geopoint.latitude.toString();
        const lng = geopoint.longitude.toString();

        const formattedLocation = "[" + lat + ", " + lng + "]";
        return formattedLocation;
    }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackButton onPress={() => { handleExitView(); navigation.navigate('NavBar'); }} title='Journal' />
            ),
        });

    }, [navigation]);

    return (
        <ScrollView style={viewstyle.container}>
            <View style={newEntrystyle.toolBar}>
                <IconButton
                    icon="pencil"
                    size={30}
                    onPress={moveToEditEntry}
                    style={newEntrystyle.iconButton}
                    iconColor={theme.colors.TEXT}
                />
            </View>
            <View style={viewstyle.view}>
                <Title style={viewstyle.title}>{entry.Title}</Title>
                <Subheading style={viewstyle.subheading}>{entry.Date && formatCustomDateTime(new Date(entry.Date))}</Subheading>
                <Subheading style={viewstyle.subheading}>Location: {entry.Location && formatGeoPoint(entry.Location)}</Subheading>
            </View>
            <View style={viewstyle.view}>
                <Paragraph style={viewstyle.text}>{entry.Text}</Paragraph>
                <Image style={{ height: 200, width: 200 }} source={{ uri: entry.Images }} />
            </View>
            <View style={viewstyle.deleteButton}>
                
            </View>
        </ScrollView>
    );
};

// ViewEntry.navigationOptions = ({ navigation }) => {
//     return {
//         headerLeft: () => (
//             <HeaderBackButton
//                 onPress={() => { handleExitView(); navigation.navigate('Journal'); }}
//             />
//         )
//     }
// }