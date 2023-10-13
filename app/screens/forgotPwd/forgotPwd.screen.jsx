import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { auth } from '../../../firebase'
import { forgotPwdstyle } from './forgotPwd.style'
import { sendPasswordResetEmail } from 'firebase/auth'

export const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('')

    const handleReset = () => {                                  // function to handle creating a new account
        console.log('email: ' + email);
        console.log('new password: ' + newPassword);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Password Reset Email Sent', 'Please check your email for password reset instructions.')
            })
            .catch((error) => {
                Alert.alert('Password reset failed', error.message)
            })

        navigation.replace('Login')
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
            style={forgotPwdstyle.container}
            behavior='padding'>


            <View style={forgotPwdstyle.inputContainer}>

                <Text style={forgotPwdstyle.title}>Reset Password</Text>

                <TextInput
                    placeholder='Enter Email to Reset Password'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={forgotPwdstyle.input}
                    inputMode='email'
                />
            </View>

            <View style={forgotPwdstyle.buttonContainer}>

                <TouchableOpacity                                               // reset button
                    onPress={handleReset}
                    style={forgotPwdstyle.button}
                >
                    <Text style={forgotPwdstyle.buttonText}>Reset Password</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

