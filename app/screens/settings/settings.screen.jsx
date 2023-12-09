import React, { useEffect, useState } from "react"
import { SafeAreaView, View, Switch, Image, Alert, TouchableOpacity } from "react-native"
import ModalDropdown from 'react-native-modal-dropdown';
import Text from '../../../appStyles/customStyle'
import { appstyle as app_style } from '../../../appStyles/appstyle'
import { settingsStyle as settings_style } from './settings.style'
import useThemedStyles from '../../../appStyles/useThemedStyles'
import useTheme from '../../../appStyles/useTheme'
import { useNavigation } from '@react-navigation/core'
import { getAuth, signOut, deleteUser } from 'firebase/auth'
import FeatherIcon from 'react-native-vector-icons/Feather';
import { schedulePushNotification } from "../../../App";
import { colors } from '../../../appStyles/themeColors'
import { getNotificationPreference, setNotificationPreference } from "../../notifications/notificationPreferences";
import { IconButton } from "react-native-paper";


export const Settings = ({ navigation }) => {

    const theme = useTheme();
    const color = colors;
    const [selectedColor, setSelectedColor] = useState('purple'); // New state to track the selected color
    const colorOptions = Object.keys(colors); // Get an array of color theme names
    const appstyle = useThemedStyles(app_style);
    const settingstyle = useThemedStyles(settings_style);


    const { navigate } = useNavigation();
    const { replace } = useNavigation();

    const auth = getAuth();
    const user = auth.currentUser;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [notificationEnabled, setNotificationEnabled] = useState(true);


    // objects instances created in an array list of 'sections'
    const SECTIONS = [
        {
            header: 'Preferences',
            items: [
                { label: 'Enable Notifications', value: notificationEnabled, type: 'boolean', action: () => handleNotifications() },
                { label: 'Dark Mode', value: theme.isDarkTheme, type: 'boolean', action: theme.toggleLightDark },
                { label: 'Color Theme', type: 'picker', action: () => theme.changeThemeColor() }
            ],
        },
        {
            header: 'Options',
            items: [
                { label: 'Sign Out', type: 'link', action: () => handleSignOut(navigate) },
            ],
        },
    ]

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
            setEmail(user.email)
        }
    }, [user])

    useEffect(() => {
        loadNotificationPreference();
    }, []);

    const loadNotificationPreference = async () => {
        const preference = await getNotificationPreference();
        setNotificationEnabled(preference === 'enabled');
    };

    const handleNotifications = async () => {
        setNotificationEnabled(!notificationEnabled);
        const newPreference = notificationEnabled ? 'disabled' : 'enabled';
        await setNotificationPreference(newPreference);

        if (!notificationEnabled) {
            await schedulePushNotification({ title: 'Notifications!', body: 'You have enabled notifications' }, null);
        }
    };

    // handling logout functionality
    const handleSignOut = () => {
        try {
            signOut(auth);
            alert('You have been signed out.');
            replace("Login");

        } catch (error) {
            alert('An error occurred while signing out.');
        }
    };

    const navigateEditProfile = () => {
        navigation.navigate("Profile");
    }

    const deleteAccount = () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete your account?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        deleteUser(user)
                        .then(() => {
                            console.log('Successfully deleted user');
                            Alert.alert("Account successfully deleted");
                            replace("Login");
                        })
                        .catch((error) => {
                            console.log('Error deleting user:', error);
                            Alert.alert("Error deleting account:", error);
                        });
                    },
                    style: "destructive",
                },
            ],
            { cancelable: true }
        );
    }

    return (

        <SafeAreaView style={appstyle.settingsContainer} behavior='padding'>
            {/* Profile section */}
            <TouchableOpacity style={settingstyle.section} onPress={navigateEditProfile}>
                <View style={settingstyle.sectionHeader}>
                    <Text style={appstyle.headerText}>Profile</Text>
                </View>

                <View style={settingstyle.profileContainer}>
                    <View style={settingstyle.profileInfo}>
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
                    <IconButton
                            icon="pencil"
                            size={30}
                            onPress={navigateEditProfile}
                            style={settingstyle.iconButton}
                            iconColor={theme.colors.TEXT}
                    />
                </View>
            </TouchableOpacity>


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

                                        {type === 'boolean' && <Switch value={value} onValueChange={action} />}

                                        {(type === 'link' &&
                                            <TouchableOpacity onPress={action}>
                                                <FeatherIcon
                                                    color="#ababab"
                                                    name="chevron-right"
                                                    size={22} />
                                            </TouchableOpacity>)
                                        }

                                        {type === 'picker' && (
                                            <ModalDropdown
                                                options={colorOptions} // Adding a 'Select a color' option
                                                onSelect={(idx, color) => {
                                                    if (color !== 'Select a color') {
                                                        theme.changeThemeColor(color);
                                                        setSelectedColor(color); // Update the selected color state
                                                    }
                                                }}
                                                dropdownTextStyle={settingstyle.dropdownTextStyle}
                                                style={settingstyle.dropdown}
                                            >
                                                <View style={settingstyle.selectedColor}>
                                                    <Text style={settingstyle.selectedColor}> {selectedColor}</Text>

                                                </View>
                                            </ModalDropdown>
                                        )}
                                    </View>

                                </View>
                            );
                        })}
                    </View>
                </View>
            ))
            }

            <TouchableOpacity style={settingstyle.deleteButton} onPress={deleteAccount}>
                <Text style={settingstyle.buttonText}>DELETE ACCOUNT</Text>
            </TouchableOpacity>

        </SafeAreaView >
    )
}