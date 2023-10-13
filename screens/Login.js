import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Login = ({ n }) => {
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
                console.log("Logged in:", user.email)
                replace('Home')
            })
            .catch((error) => {
                console.log("Error", error)
            })

        // navigate('Home')
        // try {
        //     const response = await signInWithEmailAndPassword(auth, email, password);
        //     console.log('User logged in:', response.user);
        //     replace('Register');
        //     console.log('after navigate')
        // } catch (error) {
        //     console.log('Error', error.message);
        // }
    }
    // signInWithEmailAndPassword(auth, email, password)
    //     .then(userCredential => {
    //         console.log('auth', auth, 'email', email, 'password', password)
    //         const user = userCredential.user;
    //         console.log(userCredential.user)
    //         console.log('Logged in with', user.email);
    //         navigation.replace('Home');
    //         isValidLogin = true;
    //     })
    //     .catch(error => alert(error.message))
    // console.log('came out')
    // if (isValidLogin) {
    //     console.log('inside loop')
    //     console.log('after navigate TT')
    // }

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
            style={styles.container}
            behavior='padding'
        >

            {/* <Image
            source={require('../assets/')}                                     // find a logo and replace the source
            style={styles.logo}
        /> */}

            <View style={styles.inputContainer}>

                <Text style={styles.title}>Login</Text>

                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={[styles.input, { marginBottom: 10 }]}
                    keyboardType='email-address'
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />

                <TouchableOpacity
                    onPress={handleForgotPassword}
                    style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>

                <TouchableOpacity                                               // login button
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.clickableText}>Don't have an account? Signup</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#c8b9e4"
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: '#fceae3',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {                                // login button
        backgroundColor: "#805dc0",
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {                        // text on the button (login button so far)
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 20,
    },
    // logo: {                          // size of the logo, uncomment when logo inserted, can change styling to logo here
    //     width: 350, 
    //     height: 200, 
    // },
    forgotPassword: {
        padding: 10,
        textDecorationLine: 'underline',
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end'
    },
    clickableText: {
        padding: 15,
        textDecorationLine: 'underline',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        justifyContent: 'center',
        textAlign: 'center'
    },
})