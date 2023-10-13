import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { auth } from '../../../firebase'
import { registerstyle } from './register.style'
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";

export const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')

    const handleRegister = () => {                                  // function to handle creating a new account
        console.log('email: ' + email);
        console.log('password: ' + password);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed up 
              console.log("creating new user");
              const user = userCredential.user;
              console.log("created new user: " + user.email);
            })
            .catch((error) => {
              console.log("failed to create new user");
              const errorCode = error.code;
              const errorMessage = error.message;
        });

        onAuthStateChanged(auth, function(user) {

            if (user) {

                // Updates the user attributes:

                updateProfile(user, { // <-- Update Method here

                displayName: username,

                }).then(function() {

                // Profile updated successfully!

                var displayName = user.displayName;

                console.log("displayname: " + displayName);
                navigation.replace('Login');

                }, function(error) {
                // An error happened.
                    console.log("failed to create new user");
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });     

            }
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
                    style={registerstyle.container}
                    behavior='padding'>


            <View style={registerstyle.inputContainer}>

                <Text style={registerstyle.title}>Register</Text>

                <TextInput
                    placeholder='Name'
                    value={name}
                    onChangeText={text => setName(text)}
                    style={registerstyle.input}
                />
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={registerstyle.input}
                    inputMode='email'
                />
                <TextInput
                    placeholder='Username'
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={registerstyle.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={registerstyle.input}
                    secureTextEntry
                />
            </View>

            <View style={registerstyle.buttonContainer}>

                <TouchableOpacity                                               // register button
                    onPress={handleRegister}
                    style={registerstyle.button}
                >
                    <Text style={registerstyle.buttonText}>Register</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

