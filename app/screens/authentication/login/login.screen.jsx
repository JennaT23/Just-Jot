import { TextInput, TouchableOpacity, View, Image, SafeAreaView, Alert, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { auth } from '../../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { loginstyle as login_style } from './login.style'
import { appstyle as app_style } from '../../../../appStyles/appstyle'
import { userAuthstyle as userAuth_style } from '../userAuthstyle'
import useTheme from '../../../../appStyles/useTheme'
import useThemedStyles from '../../../../appStyles/useThemedStyles'
import Text from '../../../../appStyles/customStyle'


export const Login = ({ n }) => {
    const theme = useTheme();

    const appstyle = useThemedStyles(app_style);
    const loginstyle = useThemedStyles(login_style);
    const userAuthstyle = useThemedStyles(userAuth_style);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { navigate } = useNavigation()
    const { replace } = useNavigation()

    const handleRegister = () => {                              // function to take you to the register page
        navigate("Register");                         // "replace" makes it so you can't swipe back, you have to click button to get back
    }

    const handleLogin = () => { // function to handle logging into an account
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                replace('NavBar')
            })
            .catch((error) => {
                Alert.alert('Login failed', error.message)
            })
    }

    const handleForgotPassword = () => {
        navigate('ForgotPassword');
    };

    // useEffect(() => {                                               // checks if a user is already logged in
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             replace('Login')
    //         }
    //     })

    //     return unsubscribe
    // }, [])

    return (
        <SafeAreaView
            style={appstyle.pageContainer}
            behavior='padding'
        >

            <View style={loginstyle.logoContainer}>
                <View style={loginstyle.logoImgContainer}>
                    <Image
                        source={require('../../../../assets/blackPen.png')}                                     // find a logo and replace the source
                        style={loginstyle.logoImg}
                    />
                </View>
                <Text style={loginstyle.appName}>Just Jot</Text>
            </View>


            <View style={userAuthstyle.inputContainer}>

                <Text style={appstyle.title}>Login</Text>

                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholderTextColor={theme.colors.SUBHEADING}
                    style={{color: theme.colors.TEXT, ...appstyle.input}}
                    inputMode='email'
                />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor={theme.colors.SUBHEADING}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={{color: theme.colors.TEXT, ...appstyle.input}}
                    secureTextEntry
                />

                <TouchableOpacity
                    onPress={handleForgotPassword}
                    style={loginstyle.forgotPasswordContainer}>
                    <Text style={loginstyle.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <View style={userAuthstyle.buttonContainer}>

                <TouchableOpacity                                               // login button
                    onPress={handleLogin}
                    style={appstyle.button}
                >
                    <Text style={appstyle.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRegister}>
                    <Text style={appstyle.clickableText}>Don't have an account? Signup</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}
