import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const Register = ({ navigation }) => {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'>

            <Text>Register</Text>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#c8b9e4"
    },
})