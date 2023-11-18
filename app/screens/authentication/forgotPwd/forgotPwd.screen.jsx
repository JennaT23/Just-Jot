import { TextInput, TouchableOpacity, View, SafeAreaView, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../../../../firebase'
import { useNavigation } from '@react-navigation/core'
import { forgotPwdstyle as forgotPwd_style } from './forgotPwd.style'
import { appstyle as app_style } from '../../../../appStyles/appstyle'
import { userAuthstyle as userAuth_style } from '../userAuthstyle'
import Text from '../../../../appStyles/customStyle'
import useThemedStyles from '../../../../appStyles/useThemedStyles'
import useTheme from '../../../../appStyles/useTheme'
import { sendPasswordResetEmail } from 'firebase/auth'
import { IconButton } from 'react-native-paper';

export const ForgotPassword = ({ navigation }) => {
    const theme = useTheme();
    const appstyle = useThemedStyles(app_style);
    const forgotPwdstyle = useThemedStyles(forgotPwd_style);
    const userAuthstyle = useThemedStyles(userAuth_style);

    const [email, setEmail] = useState('')
    const { navigate } = useNavigation()

    const handleReset = () => {

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Password Reset Email Sent', 'Please check your email for password reset instructions.')
            })
            .catch((error) => {
                Alert.alert('Password reset failed', error.message)
            })

        navigation.replace('Login')
    }

    const handleLogin = () => {
        navigate("Login")
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

            {/* <TouchableOpacity >
                <IconButton
                    icon="arrow-left"
                    size={35}
                    style={forgotPwdstyle.iconButton}
                    iconColor={theme.colors.TEXT}
                    onSelect={handleLogin}
                />
            * </TouchableOpacity> */}
            <View style={userAuthstyle.inputContainer}>

                <Text style={appstyle.title}>Reset Password</Text>

                <TextInput
                    placeholder='Enter Email to Reset Password'
                    placeholderTextColor={theme.colors.SUBHEADING}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={appstyle.input}
                    inputMode='email'
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

