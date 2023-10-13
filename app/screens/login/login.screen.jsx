import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { auth } from '../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginstyle } from './login.style'

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const navigation = useNavigation()

    const handleRegister = () => {                              // function to take you to the register page
        navigation.replace("Register");                         // "replace" makes it so you can't swipe back, you have to click button to get back
    }

    const handleLogin = () => {                                  // function to handle logging into an account
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with', user.email);
            })
            .catch(error => alert(error.message))
    }

    const handleForgotPassword = () => {
        navigation.replace('ForgotPassword');
    };

    // useEffect(() => {                                               // checks if a user is already logged in
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             navigation.replace('Login')
    //         }
    //     })

    //     return unsubscribe
    // }, [])

    return (
        <KeyboardAvoidingView
            style={loginstyle.container}
            behavior='padding'
        >

            {/* <Image
            source={require('../assets/')}                                     // find a logo and replace the source
            style={styles.logo}
        /> */}

            <View style={loginstyle.inputContainer}>

                <Text style={loginstyle.title}>Login</Text>

                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={[loginstyle.input, { marginBottom: 10 }]}
                    inputMode='email'
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={loginstyle.input}
                    secureTextEntry
                />

                <TouchableOpacity
                    onPress={handleForgotPassword}
                    style={loginstyle.forgotPasswordContainer}>
                    <Text style={loginstyle.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <View style={loginstyle.buttonContainer}>

                <TouchableOpacity                                               // login button
                    onPress={handleLogin}
                    style={loginstyle.button}
                >
                    <Text style={loginstyle.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRegister}>
                    <Text style={loginstyle.clickableText}>Don't have an account? Signup</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}
