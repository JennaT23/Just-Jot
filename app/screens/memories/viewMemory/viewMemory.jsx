import { Paragraph, Subheading, Title, IconButton } from "react-native-paper";
import { appstyle } from "../../../../appStyles/appstyle";
import Text from "../../../../appStyles/customStyle";
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { viewEntryStyle } from "../../journal/viewEntry/viewEntry.style";
import useThemedStyles from "../../../../appStyles/useThemedStyles";
import { ScrollView, View, Image } from "react-native";
import { newEntrystyle as newEntry_style } from '../../journal/newEntry/newEntry.style'
import useTheme from '../../../../appStyles/useTheme'
import { HeaderBackButton } from '@react-navigation/elements'
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useEffect } from "react";
import * as Location from 'expo-location';
import { displayAddress } from "../../../location/geocode";
// import { useNavigation } from '@react-navigation/native';


export const ViewMemory = ({ navigation, route }) => {
    const viewstyle = useThemedStyles(viewEntryStyle);
    const newEntrystyle = useThemedStyles(newEntry_style);
    const handleExitView = route.params.handleExitView;
    const memory = route.params.newMemory;
    const [displayLocation, setDisplayLocation] = useState('');
    const [displaySubtitle, setDisplaySubtitle] = useState('');

    useEffect(() => {
        const fetchDisplayAddress = async () => {
            const address = await displayAddress(memory.Location);
            setDisplayLocation(address || '');
            setDisplaySubtitle(
                (memory.DateCreated && formatCustomDateTime(new Date(memory.DateCreated))) + 
                "\n" + 
                (memory.DateMarked && formatCustomDateTime(new Date(memory.DateMarked))) + 
                "\nLocation: " + displayLocation);
        };

        fetchDisplayAddress();
    }, [memory.Location]);

    const theme = useTheme();

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

    const moveToEditMemory = () => {
        navigation.navigate('EditMemory', { memory });
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
                <HeaderBackButton onPress={() => { handleExitView(); navigation.navigate('NavBar'); }} title='Memories' />
            ),
        });

    }, [navigation]);

    return (
        <ScrollView style={viewstyle.container}>
            <View style={newEntrystyle.toolBar}>
                <IconButton
                    icon="pencil"
                    size={30}
                    onPress={moveToEditMemory}
                    style={newEntrystyle.iconButton}
                    iconColor={theme.colors.TEXT}
                />
            </View>
            <View style={viewstyle.view}>
                <Card style={viewstyle.topCard}>
                    <Card.Title
                        title={memory.title}
                        titleStyle={viewstyle.title}
                        subtitleNumberOfLines={3}
                        subtitle={displaySubtitle}
                        subtitleStyle={viewstyle.subheading}
                    />
                </Card>
                <Card style={viewstyle.bottomCard}>
                    <Card.Content>
                        <View style={viewstyle.view}>
                            <Paragraph>{memory.Text}</Paragraph>
                            <Image
                                style={{ height: 200, width: 200 }}
                                source={{ uri: memory.Images }}
                            />
                        </View>
                    </Card.Content>
                </Card>
            </View>

            {/* <View style={viewstyle.view}>
                <Title style={viewstyle.title}>{memory.Title}</Title>
                <Subheading style={viewstyle.subheading}>{memory.DateCreated && formatCustomDateTime(new Date(memory.DateCreated))}</Subheading>
                <Subheading style={viewstyle.subheading}>{memory.DateMarked && formatCustomDateTime(new Date(memory.DateMarked))}</Subheading>
                <Subheading style={viewstyle.subheading}>Location: {displayLocation}</Subheading>
            </View>
            <View style={viewstyle.view}>
                <Paragraph>{memory.Text}</Paragraph>
                <Image
                    style={{ height: 200, width: 200 }}
                    source={{ uri: memory.Images }}
                />
            </View> */}
        </ScrollView>
    );
};

// ViewMemory.options = ({ navigation }) => {
//     return {
//         headerLeft: () => (
//             <HeaderBackButton
//                 onPress={() => { navigation.navigate('Memories') }}
//             />
//         )
//     }
// }