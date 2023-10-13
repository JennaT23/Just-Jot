import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appHomeStyle } from './appHome.style'
import { getAuth } from 'firebase/auth'

export const Home = () => {
    const auth = getAuth()
    const user = auth.currentUser;
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
        }
    }, [user])

    return (
        <SafeAreaView>
            <View>
                <Text style={appHomeStyle.title}>Hello {username}!</Text>
            </View>
        </SafeAreaView>
    )
}