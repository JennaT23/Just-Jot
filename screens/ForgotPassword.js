import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { auth } from '../firebase'

const ForgotPassword = () => {
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior='padding'>

      <Text>Forgot Password</Text>

    </KeyboardAvoidingView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#c8b9e4"
},
})