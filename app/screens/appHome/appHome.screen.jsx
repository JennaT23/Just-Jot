import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appHomeStyle as appHome_style } from './appHome.style'
import { appstyle as app_style } from '../../../appStyles/appstyle'
import { getAuth } from 'firebase/auth'
// import { Text } from '../../../appStyles/customStyle'
import useThemedStyles from '../../../appStyles/useThemedStyles'

export const Home = ({ navigation }) => {
    const appstyle = useThemedStyles(app_style);
    const appHomestyle = useThemedStyles(appHome_style);

    const auth = getAuth()
    const user = auth.currentUser;
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
        }
    }, [user])

    return (
        <SafeAreaView style={appstyle.pageContainer}>
            <View>
                <Text style={appstyle.title}>Hello {username}!</Text>
            </View>
        </SafeAreaView>
    )
}