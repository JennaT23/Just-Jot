import React, { useEffect, useState } from "react"
import { SafeAreaView, View, TextInput, Image, Alert, TouchableOpacity } from "react-native"
import Text from '../../../appStyles/customStyle'
import useThemedStyles from '../../../appStyles/useThemedStyles'
import useTheme from '../../../appStyles/useTheme'
import { profileStyle as profile_style } from "./profile.style"
import { appstyle as app_style } from "../../../appStyles/appstyle"
import { getAuth, deleteUser, updateEmail, sendPasswordResetEmail, updateProfile } from "firebase/auth"
import { IconButton } from "react-native-paper";


export const Profile = ({ navigation }) => {
    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const profilestyle = useThemedStyles(profile_style);
    const auth = getAuth();
    const user = auth.currentUser;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [passwordEmail, setPasswordEmail] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
            setEmail(user.email)
        }
    }, [user])

    const DeleteUserFromAuth = async () => {
        console.log('Deleting')
        // const auth = getAuth();
        // const user = auth.currentUser;
    
        if (user) {
            deleteUser(user)
                .then(() => {
                    console.log('Successfully deleted user');
                    Alert.alert('Account successfully deleted')
                    navigation.navigate('Login')
                })
                .catch((error) => {
                    console.error('Error deleting user:', error);
                });
        } else {
            console.log('No user signed in.');
        }
    }
    
    const UpdateEmail = ({ newEmail }) => {
        // const auth = getAuth()
        // const user = auth.currentUser;
    
        if (user) {
            updateEmail(user, newEmail)
                .then(() => {
                    console.log('Email updated successfully.')
                    // Alert.alert('Email updated successfully.')
                    setEmail(newEmail);
                })
                .catch((error) => {
                    console.error('Error updating email:', error.message);
                    // Alert.alert('Error updating email:', error.message);
                });
        } else {
            console.log('No user signed in.');
        }
    }
    
    const UpdatePassword = () => {

        sendPasswordResetEmail(auth, passwordEmail)
            .then(() => {
                console.log("password email sent");
                // Alert.alert('Update Password Email Sent', 'Please check your email for password update instructions.')
            })
            .catch((error) => {
                console.error("error updating password", error.message)
                // Alert.alert('Update Password failed', error.message)
            })
    }
    
    const UpdateUsername = ({ newUsername }) => {
        // auth = getAuth();
        // user = auth.currentUser;
    
        if (user) {
            updateProfile(user, { displayName: newUsername })
                .then(() => {
                    console.log("Username updated successfully.");
                    // Alert.alert("Username updated successfully.");
                    setUsername(newUsername);
                })
                .catch((error) => {
                    console.error("Error updating username:", error.message);
                    // Alert.alert("Error updating username:", error);
                })
        } else {
            console.log("No user signed in.");
        }
    }

    const saveChanges = () => {
        try {
            console.log("email:", email);
            UpdateEmail(email);
            console.log("username:", username);
            UpdateUsername(username);
            console.log("pemail: ", passwordEmail);
            if(passwordEmail !== '')
            {
                UpdatePassword();
            }
            console.log("Profile updated successfully");
            Alert.alert("Profile updated successfully");
        }catch(error){
            console.error("Error updating profile:", error);
            Alert.alert("Error updating profile:", error);
        }
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
                <View>
                    <View style={profilestyle.fieldContainer}>
                        <Text>Enter Email to Update Password:</Text>
                        <TextInput
                            placeholder='Enter Email to Update Password'
                            placeholderTextColor={theme.colors.SUBHEADING}
                            value={passwordEmail}
                            onChangeText={text => setPasswordEmail(text)}
                            style={profilestyle.input}
                            inputMode='email'
                        />
                    </View>

                    {/* <TouchableOpacity
                        onPress={UpdatePassword}
                        style={profilestyle.PassButton}
                    >
                        <Text style={profilestyle.buttonText}>Update Password</Text>
                    </TouchableOpacity> */}

                </View>

                <TouchableOpacity 
                    onPress={saveChanges}
                    style={profilestyle.button}
                >
                    <Text style={profilestyle.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}