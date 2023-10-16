import React, { useState, useEffect } from 'react'
import { Text } from 'react-native-paper'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { appHomeStyle } from './appHome.style'
import { getAuth } from 'firebase/auth'
import { Card } from 'react-native-paper'

export const Home = ({ navigation }) => {
    const auth = getAuth()
    const user = auth.currentUser;
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (user) {
            setUsername(user.displayName)
        }
    }, [user])

    return (
        //<SafeAreaView>
        <>
            <View>
                <Text variant="headlineLarge">Hello {username}!</Text>
            </View>
            <View>
                <Card>
                    <Card.Title title="Friday, October 13 2023" />
                    <Card.Content>
                        <Text variant="titleSmall">Card Title</Text>
                        <Text>Card content</Text>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Title title="Saturday, October 12 2023" />
                    <Card.Content>
                        <Text variant="titleSmall">Card Title 2</Text>
                        <Text>Card content 2</Text>
                    </Card.Content>
                </Card>
            </View>
        </>
        //</SafeAreaView >
    )
}