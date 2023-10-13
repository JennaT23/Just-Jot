import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { auth } from '../../../firebase'
import { forgotPwdstyle } from './forgotPwd.style'

export const ForgotPassword = ({ navigation }) => {
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
                    style={forgotPwdstyle.container}
                    behavior='padding'>


            <View style={forgotPwdstyle.inputContainer}>

                <Text style={forgotPwdstyle.title}>Reset Password</Text>

                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={forgotPwdstyle.input}
                    inputMode='email'
                />
                <TextInput
                    placeholder='New Password'
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    style={forgotPwdstyle.input}
                    secureTextEntry
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

