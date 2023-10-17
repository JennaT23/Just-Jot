import React, { useState, useEffect } from 'react'
import { Button, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appHomeStyle as appHome_style } from './appHome.style'
import { appstyle as app_style } from '../../../appStyles/appstyle'
import { getAuth } from 'firebase/auth'
import Text from '../../../appStyles/customStyle'
import useThemedStyles from '../../../appStyles/useThemedStyles'
import { Card } from 'react-native-paper'
import { useNavigation } from '@react-navigation/core'

export const Home = ({ navigation }) => {
    const appstyle = useThemedStyles(app_style);
    const appHomestyle = useThemedStyles(appHome_style);

    const { navigate } = useNavigation()

    const auth = getAuth()
    const user = auth.currentUser;
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
        }
    }, [user])

    // temporary
    const movePage = () => {
        navigate("NewEntry");
    }

    return (
        // <SafeAreaView style={appstyle.pageContainer}>
        <SafeAreaView>
            <View>
                <Text style={appstyle.title}>Hello {username}!</Text>

                {/* temporary */}
                <TouchableOpacity
                    onPress={movePage}
                    style={appstyle.button}
                />

            </View>
            <View>
                <Card>
                    <Card.Title title="Friday, October 13 2023" />
                    <Card.Content>
                        <Text>Card Title</Text>
                        <Text>Card content</Text>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Title title="Saturday, October 12 2023" />
                    <Card.Content>
                        <Text>Card Title 2</Text>
                        <Text>Card content 2</Text>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView >
    )
}