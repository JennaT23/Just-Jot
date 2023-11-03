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
// import FeatherIcon from 'react-native-vector-icons/Feather';

export const Settings = ({ navigation }) => {

    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const settingstyle = useThemedStyles(settings_style);

    const { navigate } = useNavigation();

    const auth = getAuth();
    const user = auth.currentUser;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [notificationEnabled, setNotificationEnabled] = useState(true)

    // objects instances creatted in an array list of 'sections'
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
                { label: 'Sign Out', type: 'link', action: handleSignOut },
            ],
        },
    ]

    // handling logout functionality
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            alert('You have been signed out.');
        }).catch((error) => {
            console.log("Error with SignOut", error)
            alert('An error occurred while signing out.');
        });
    };

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
            setEmail(user.email)
        }
    }, [user])

    return (
        // account info
        // email info
        // change info setting
        // change password
        // notification settings
        // theme settings
        // access permission
        //logout


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
                                    <TouchableOpacity onPress={() => { action }}>
                                        <View style={settingstyle.row}>
                                            <Text style={settingstyle.rowLabel}>{label}</Text>

                                            <View style={settingstyle.rowSpacer} />

                                            {type === 'input' && (
                                                <Text style={settingstyle.rowValue}>{value}</Text>
                                            )}

                                            {type === 'boolean' && <Switch value={value} onValueChange={action} />}


                                            {(type === 'input' || type === 'link')


                                            }

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                </View>
            ))}


            {/* <View style={settingstyle.option}>
                    <Text>Enable Notifications</Text>
                    <Switch
                        value={notificationEnabled}
                        onValueChange={value => setNotificationEnabled(value)}
                    />
                </View> */}

        </SafeAreaView>
    )
}