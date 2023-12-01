import React, { useEffect, useState } from "react"
import { SafeAreaView, View, Switch, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import { TabView } from 'react-native-paper'
import Text from '../../../appStyles/customStyle'
import { appstyle as app_style } from '../../../appStyles/appstyle'
import { settingsStyle as settings_style } from './settings.style'
import useThemedStyles from '../../../appStyles/useThemedStyles'
import useTheme from '../../../appStyles/useTheme'
import { Button } from "react-native-paper"
import { useNavigation } from '@react-navigation/core'
import { getAuth, signOut } from 'firebase/auth'
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as Notifications from 'expo-notifications';
import { schedulePushNotification } from "../../../App"
import { colors } from '../../../appStyles/themeColors'
import { Picker } from "react-native-ui-lib/src/components/picker"

export const ThemePicker = ({ navigation }) => {
    const theme = useTheme();
    const color = colors;
    const appstyle = useThemedStyles(app_style);
    const settingstyle = useThemedStyles(settings_style);

    const colorOptions = Object.keys(colors); // Get an array of color theme names

    const { navigate } = useNavigation();

    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <SafeAreaView style={appstyle.pageContainer} behavior='padding'>
            <View style={settingstyle.sectionBody}>
                <View style={settingstyle.row}>
                    {/* <Text style={settingstyle.rowLabel}>Choose a Theme Color</Text> */}

                    {colorOptions.map((color, index) => (
                        // <View>
                        <TouchableOpacity
                            key={index}
                            style={[settingstyle.colorOption, { backgroundColor: colors[color].light.BACKGROUND }]}
                            onPress={() => theme.changeThemeColor(color)}
                        >
                            <Text style={settingstyle.colorOptionText}>{color}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    )
}