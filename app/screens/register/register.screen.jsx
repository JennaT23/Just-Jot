import { TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../../../firebase'
import { appstyle as app_style } from '../../../appStyles/appstyle'
import { userAuthstyle as userAuth_style } from '../userAuthstyle'
import { registerstyle as register_style } from './register.style'
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import Text from '../../../appStyles/customStyle'
import useThemedStyles from '../../../appStyles/useThemedStyles'

export const Register = ({ navigation }) => {
    const appstyle = useThemedStyles(app_style);
    const registerstyle = useThemedStyles(register_style);
    const userAuthstyle = useThemedStyles(userAuth_style);

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
                    style={appstyle.pageContainer}
                    behavior='padding'>


            <View style={userAuthstyle.inputContainer}>

                <Text style={appstyle.title}>Register</Text>

                <TextInput
                    placeholder='Name'
                    value={name}
                    onChangeText={text => setName(text)}
                    style={appstyle.input}
                />
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={appstyle.input}
                    inputMode='email'
                />
                <TextInput
                    placeholder='Username'
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={appstyle.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={appstyle.input}
                    secureTextEntry
                />
            </View>

            <View style={userAuthstyle.buttonContainer}>

                <TouchableOpacity                                               // register button
                    onPress={handleRegister}
                    style={appstyle.button}
                >
                    <Text style={appstyle.buttonText}>Register</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

