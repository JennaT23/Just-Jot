import { KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { auth } from '../../../firebase'
import { forgotPwdstyle as forgotPwd_style } from './forgotPwd.style'
import { appstyle as app_style } from '../../../appStyles/appstyle'
import { userAuthstyle as userAuth_style } from '../userAuthstyle'
import Text from '../../../appStyles/customStyle'
import useThemedStyles from '../../../appStyles/useThemedStyles'

export const ForgotPassword = ({ navigation }) => {
    const appstyle = useThemedStyles(app_style);
    const forgotPwdstyle = useThemedStyles(forgotPwd_style);
    const userAuthstyle = useThemedStyles(userAuth_style);

    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const handleReset = () => {                                  // function to handle creating a new account
        console.log('email: ' + email);
        console.log('new password: ' + newPassword);

        auth
        .updateUser(uid, {
            email: email,
            emailVerified: true,
            password: newPassword,
            disabled: true,
        })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully updated user', userRecord.toJSON());
            navigation.replace('Login');
        })
        .catch((error) => {
            console.log('Error updating user:', error);
        });
    }

    // useEffect(() => {                                               // checks if a user is already logged in
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             navigation.replace('Login')
    //         }
    //     })

    //     return unsubscribe
    // }, [])

    return (
        <SafeAreaView
                    style={appstyle.pageContainer}
                    behavior='padding'>


            <View style={userAuthstyle.inputContainer}>

                <Text style={appstyle.title}>Reset Password</Text>

                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={appstyle.input}
                    inputMode='email'
                />
                <TextInput
                    placeholder='New Password'
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    style={appstyle.input}
                    secureTextEntry
                />
            </View>

            <View style={userAuthstyle.buttonContainer}>

                <TouchableOpacity                                               // reset button
                    onPress={handleReset}
                    style={appstyle.button}
                >
                    <Text style={appstyle.buttonText}>Reset Password</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

