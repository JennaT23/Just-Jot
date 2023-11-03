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

export const Settings = ({ navigation }) => {

    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const settingstyle = useThemedStyles(settings_style);

    const { navigate } = useNavigation();

    const auth = getAuth();
    const user = auth.currentUser;
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [notificationEnabled, setNotificationEnabled] = useState(true)

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
            setEmail(user.email)
        }
    }, [user])

    // objects instances created in an array list of 'sections'
    const SECTIONS = [
        {
            header: 'Preferences',
            items: [
                { label: 'Enable Notifications', value: notificationEnabled, type: 'boolean', action: () => setNotificationEnabled(!notificationEnabled) },
                { label: 'Dark Mode', value: theme.isDarkTheme, type: 'boolean', action: theme.toggleTheme },
            ],
        },
        {
            header: 'Options',
            items: [
                { label: 'Sign Out', type: 'link', action: () => handleSignOut(navigate) },
            ],
        },
    ]

    // handling logout functionality
    const handleSignOut = (navigate) => {
        try {
            signOut(auth)
            alert('You have been signed out.');
            navigate("Login")

        } catch (error) {
            console.log("Error with SignOut", error)
            alert('An error occurred while signing out.');
        }
    };

    return (

        <SafeAreaView style={appstyle.settingsContainer} behavior='padding'>
            {/* Profile section */}
            <View style={settingstyle.section}>
                <View style={settingstyle.sectionHeader}>
                    <Text style={appstyle.headerText}>Profile</Text>
                </View>

                <View style={settingstyle.profile}>
                    <Image
                        alt=""
                        source={{ uri: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-600x600.png' }}
                        style={settingstyle.profileAvatar}
                    />
                    <View style={settingstyle.profileBody}>
                        <Text style={settingstyle.profileName}>{username}</Text>
                        <Text style={settingstyle.profileHandle}>{email}</Text>

                    </View>

                </View>
            </View>

            
            {/* Displaying section headers of setting options */}
            {SECTIONS.map(({ header, items }) => (
                <View style={settingstyle.section} key={header}>
                    <View style={settingstyle.sectionHeader}>
                        <Text style={appstyle.headerText}>{header}</Text>
                    </View>
                    {/* Displaying setting options */}
                    <View style={settingstyle.sectionBody}>
                        {items.map(({ label, type, value, action }, index) => {
                            const isFirst = index === 0;
                            const isLast = index === items.length - 1;
                            return (
                                <View
                                    key={index}
                                    style={[
                                        settingstyle.rowWrapper,
                                        index === 0 && { borderTopWidth: 0 },
                                        isFirst && settingstyle.rowFirst,
                                        isLast && settingstyle.rowLast,
                                    ]}>

                                    <View style={settingstyle.row}>
                                        <Text style={settingstyle.rowLabel}>{label}</Text>

                                        <View style={settingstyle.rowSpacer} />

                                        {/* {type === 'input' && (
                                            <Text style={settingstyle.rowValue}>{value}</Text>
                                        )} */}

                                        {type === 'boolean' && <Switch value={value} onValueChange={action} />}


                                        {(type === 'link' &&
                                            <TouchableOpacity onPress= { action }>
                                                <FeatherIcon
                                                    color="#ababab"
                                                    name="chevron-right"
                                                    size={22} />
                                            </TouchableOpacity>)
                                        }

                                    </View>

                                </View>
                            );
                        })}
                    </View>
                </View>
            ))
            }


        </SafeAreaView >
    )
}