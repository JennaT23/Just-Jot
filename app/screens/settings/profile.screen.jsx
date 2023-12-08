import React, { useEffect, useState } from "react"
import { SafeAreaView, View, TextInput, Image, TouchableOpacity } from "react-native"
import Text from '../../../appStyles/customStyle'
import useThemedStyles from '../../../appStyles/useThemedStyles'
import useTheme from '../../../appStyles/useTheme'
import { profileStyle as profile_style } from "./profile.style"
import { appstyle as app_style } from "../../../appStyles/appstyle"
import { getAuth } from 'firebase/auth'
import { IconButton } from "react-native-paper";


export const Profile = ({ navigation }) => {
    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const profilestyle = useThemedStyles(profile_style);
    const auth = getAuth();
    const user = auth.currentUser;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordAgain, setNewPasswordAgain] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
            setEmail(user.email)
        }
    }, [user])

    const saveChanges = () => {
        
    }

    const changeProfileImage = () => {

    }

    return(
        <SafeAreaView style={profilestyle.pageContainer}>
            <TouchableOpacity style={profilestyle.profileImageContainer} onPress={changeProfileImage}>
                <Image
                    alt=""
                    source={{ uri: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-600x600.png' }}
                    style={profilestyle.profileImage}
                />
                <View style={profilestyle.iconContainer}>
                    <IconButton
                        icon="pencil"
                        size={30}
                        onPress={changeProfileImage}
                        style={profilestyle.iconButton}
                        iconColor={theme.colors.TEXT}
                    />
                </View>
            </TouchableOpacity>
            <View style={profilestyle.userInfo}>
                <View style={profilestyle.fieldContainer}>
                    <Text>Email:</Text>
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor={theme.colors.SUBHEADING}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={{color: theme.colors.TEXT, ...profilestyle.input}}
                        inputMode='email'
                    />
                </View>
                <View style={profilestyle.fieldContainer}>
                    <Text>Username:</Text>
                    <TextInput
                        placeholder='Username'
                        placeholderTextColor={theme.colors.SUBHEADING}
                        value={username}
                        onChangeText={text => setUsername(text)}
                        style={{color: theme.colors.TEXT, ...profilestyle.input}}
                    />
                </View>
                <View style={profilestyle.fieldContainer}>
                    <Text>Current Password:</Text>
                    <TextInput
                        placeholder='Current Password'
                        placeholderTextColor={theme.colors.SUBHEADING}
                        value={currentPassword}
                        onChangeText={text => setCurrentPassword(text)}
                        style={{color: theme.colors.TEXT, ...profilestyle.input}}
                        secureTextEntry
                    />
                </View>
                <View style={profilestyle.fieldContainer}>
                    <Text>New Password:</Text>
                    <TextInput
                        placeholder='New Password'
                        placeholderTextColor={theme.colors.SUBHEADING}
                        value={newPassword}
                        onChangeText={text => setNewPassword(text)}
                        style={{color: theme.colors.TEXT, ...profilestyle.input}}
                        secureTextEntry
                    />
                </View>
                <View style={profilestyle.fieldContainer}>
                    <Text>Re-Enter New Password:</Text>
                    <TextInput
                        placeholder='New Password'
                        placeholderTextColor={theme.colors.SUBHEADING}
                        value={newPasswordAgain}
                        onChangeText={text => setNewPasswordAgain(text)}
                        style={{color: theme.colors.TEXT, ...profilestyle.input}}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity 
                    onPress={saveChanges}
                    style={profilestyle.button}
                >
                    <Text style={profilestyle.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}