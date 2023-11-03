import { Paragraph, Subheading, Title, IconButton } from "react-native-paper";
import { appstyle } from "../../../appStyles/appstyle";
import Text from "../../../appStyles/customStyle";
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { viewEntryStyle } from "../viewEntry/viewEntry.style";
import useThemedStyles from "../../../appStyles/useThemedStyles";
import { ScrollView, View } from "react-native";
import { newEntrystyle as newEntry_style } from '../newEntry/newEntry.style'
import useTheme from '../../../appStyles/useTheme'
import { HeaderBackButton } from '@react-navigation/elements'
import { useNavigation } from "@react-navigation/native";
// import { useNavigation } from '@react-navigation/native';


export const ViewMemory = ({ navigation, route }) => {
    const viewstyle = useThemedStyles(viewEntryStyle);
    const newEntrystyle = useThemedStyles(newEntry_style);

    const theme = useTheme();
    // const navigation = useNavigation();

    console.log('view entry', route.params.entry);
    const memory = route.params.memory;
    console.log('view entry2', entry);

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
        console.log("view entry before send: ", memory);
        navigation.navigate('EditMemory', { memory });
    }

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
                <Title style={viewstyle.title}>{memory.Title}</Title>
                <Subheading style={viewstyle.subheading}>{memory.DateCreated && formatCustomDateTime(new Date(memory.DateCreated))}</Subheading>
                <Subheading style={viewstyle.subheading}>{memory.DateMarked && formatCustomDateTime(new Date(memory.DateMarked))}</Subheading>
            </View>
            <View style={viewstyle.view}>
                <Paragraph>{memory.Text}</Paragraph>
            </View>
        </ScrollView>
    );
};

ViewMemory.navigationOptions = ({ navigation }) => {
    console.log('this sucks');
    return {
        headerLeft: () => (
            <HeaderBackButton
                onPress={() => { useNavigation().navigate('Journal') }}
            />
        )
    }
}