import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './app/screens/login/login.screen'
import { Register } from './app/screens/register/register.screen'
import { ForgotPassword } from './app/screens/forgotPwd/forgotPwd.screen'
import { Journal } from './app/screens/journal/appJournal/journal.screen'
import { NewEntry } from './app/screens/journal/newEntry/newEntry.screen'
import { ViewEntry } from './app/screens/journal/viewEntry/viewEntry'
import { EditEntry } from './app/screens/journal/editEntry/editEntry'
import ThemeProvider from './appStyles/themeProvider';
import { EntryTemplate } from './templates/entryTemplate';
import { Map } from './app/screens/map/map.screen';
import { Settings } from './app/screens/settings/settings.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper'
import { Memories } from './app/screens/memories/memory/memory.screen';
import { NewMemory } from './app/screens/memories/newMemory/newMemory.screen';
import { MemoryTemplate } from './templates/memoryTemplate';
import { ViewMemory } from './app/screens/memories/viewMemory/viewMemory';
import { EditMemory } from './app/screens/memories/editMemory/editMemory';
import * as Notifications from 'expo-notifications';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("token:", token);

    return token;
}


function NavBar() {
    return (
        <Tab.Navigator
            initialRouteName={Journal}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Journal') {
                        iconName = focused
                            ? 'book-open-blank-variant'
                            : 'book-open-blank-variant';
                    }
                    else if (route.name === 'Map') {
                        iconName = focused
                            ? 'map-marker-radius-outline'
                            : 'map-marker-radius-outline';
                    }
                    else if (route.name === 'Memories') {
                        iconName = focused
                            ? 'star-outline'
                            : 'star-outline';
                    }
                    else if (route.name === 'Settings') {
                        iconName = focused ? 'cog-outline' : 'cog-outline';
                    }

                    // You can return any component that you like here!
                    return <IconButton icon={iconName} size={size} iconColor={color} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Journal" component={Journal} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Memories" component={Memories} />
            <Tab.Screen name="Settings" component={Settings} />

        </Tab.Navigator>
    )
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true
    }),
});

const App = () => {
    // let tok = '';

    // useEffect(() => {
    //     tok = registerForPushNotificationsAsync();
    // }, []);

    // console.log("token:", tok);

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then(token => expoPushTokensApi.register(token));
    }, []);

    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen options={{ headerShown: false }} name="NavBar" component={NavBar} />
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    <Stack.Screen options={{ headerShown: true, title: 'Register' }} name="Register" component={Register} />
                    <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen options={{ headerShown: true }} name="Map" component={Map} />
                    <Stack.Screen options={{ headerShown: true }} name="Settings" component={Settings} />
                    <Stack.Screen options={{ headerShown: false }} name="Journal" component={Journal} />
                    <Stack.Screen options={{ headerShown: false }} name="Memories" component={Memories} />
                    <Stack.Screen options={{ headerShown: true }} name="NewMemory">
                        {props => <NewMemory {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true }} name="NewEntry">
                        {props => <NewEntry {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true }} name="EntryTemplate">
                        {props => <EntryTemplate {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true }} name="MemoryTemplate">
                        {props => <MemoryTemplate {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true }} name="EditEntry">
                        {props => <EditEntry {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true }} name="EditMemory">
                        {props => <EditMemory {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true }} name="ViewEntry">
                        {props => <ViewEntry {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true }} name="ViewMemory">
                        {props => <ViewMemory {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}

export default App;

