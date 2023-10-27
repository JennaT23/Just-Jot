import React, { useEffect, useState } from "react"
import { SafeAreaView, View, Switch, StyleSheet, ScrollView, Image, TouchableOpacity, FeatherIcon } from "react-native"
import { TabView } from 'react-native-paper'
import Text from '../../../appStyles/customStyle'
import { appstyle as app_style } from '../../../appStyles/appstyle'
import { settingsStyle as settings_style } from './settings.style'
import useThemedStyles from '../../../appStyles/useThemedStyles'
import useTheme from '../../../appStyles/useTheme'
import { Button } from "react-native-paper"
import { useNavigation } from '@react-navigation/core'
import { getAuth } from 'firebase/auth'


export const Settings = ({ navigation }) => {

    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const settingstyle = useThemedStyles(settings_style);

    const { navigate } = useNavigation();

    const auth = getAuth();
    const user = auth.currentUser;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [notificationEnabled, setNotificationEnabled] = React.useState(true)

    const SECTIONS = [
        {
            header: 'Preferences',
            items: [
                { icon: 'bell', label: 'Notifications', value: true, type: 'boolean' },
                { icon: 'moon', label: 'Dark Mode', value: false, type: 'boolean' },
            ],
        },
        {
            header: 'Options',
            items: [
                {icon: 'gear', label: 'Sign Out', type:'link'},
            ],
        },
    ]

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


        <SafeAreaView style={settingstyle.container} behavior='padding'>
            {/* Profile section */}
            <View style={settingstyle.section}>
                <View style={settingstyle.sectionHeader}>
                    <Text style={settingstyle.sectionHeaderText}>Profile</Text>
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

            {SECTIONS.map(({ header, items }) => (
                <View style={settingstyle.section} key={header}>
                    <View style={settingstyle.sectionHeader}>
                        <Text style={settingstyle.sectionHeaderText}>{header}</Text>
                    </View>
                    <View style={settingstyle.sectionBody}>
                        {items.map(({ label, type, value }, index) => {
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
                                    <TouchableOpacity
                                        onPress={() => {
                                            // handle onPress
                                        }}>
                                        <View style={settingstyle.row}>
                                            <Text style={settingstyle.rowLabel}>{label}</Text>

                                            <View style={settingstyle.rowSpacer} />

                                            {type === 'input' && (
                                                <Text style={settingstyle.rowValue}>{value}</Text>
                                            )}

                                            {type === 'boolean' && <Switch value={value} />}

                                            {(type === 'input' || type === 'link') && (
                                                <FeatherIcon
                                                    color="#ababab"
                                                    name="chevron-right"
                                                    size={22}
                                                />
                                            )}
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
                </View>

                <View style={settingstyle.option}>
                    <Text>Theme</Text>
                    <Switch onValueChange={theme.toggleTheme} value={theme.isLightTheme} />
                </View> */}

        </SafeAreaView>
    )
}