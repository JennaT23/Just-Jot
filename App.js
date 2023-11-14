import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './app/screens/authentication/login/login.screen'
import { Register } from './app/screens/authentication/register/register.screen'
import { ForgotPassword } from './app/screens/authentication/forgotPwd/forgotPwd.screen'
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
import * as Device from 'expo-device'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


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
                    //options={{ headerShown: false, headerTitleAlign: 'center',  }}
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Journal" options={{ title: 'Journal', headerTitleAlign: 'center', }} component={Journal} /> 
            <Tab.Screen name="Map" options={{ title: 'Map', headerTitleAlign: 'center', }} component={Map} />
            <Tab.Screen name="Memories" options={{ title: 'Memories', headerTitleAlign: 'center', }} component={Memories} />
            <Tab.Screen name="Settings" options={{ title: 'Settings', headerTitleAlign: 'center', }} component={Settings} />

        </Tab.Navigator>
    )
}

export async function schedulePushNotification(content, trigger) {
    if (trigger !== null) {
        trigger.setSeconds(0);
    }

    await Notifications.scheduleNotificationAsync({
        content,
        trigger,
    });
}

export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            let finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notifications!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants.expoConfig.extra.eas.projectId })).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
    }),
});

const App = () => {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen options={{ headerShown: false, headerTitleAlign: 'center',  }} name="NavBar" component={NavBar} />
                    <Stack.Screen options={{ headerShown: false, headerTitleAlign: 'center',  }} name="Login" component={Login} />
                    <Stack.Screen options={{ headerShown: true,  headerTitleAlign: 'center', title: 'Register' }} name="Register" component={Register} />
                    <Stack.Screen options={{ headerShown: false,  headerTitleAlign: 'center', title: "Forgot Password" }} name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen options={{ headerShown: true, headerTitleAlign: 'center',  }} name="Map" component={Map} />
                    <Stack.Screen options={{ headerShown: true, headerTitleAlign: 'center',  }} name="Settings" component={Settings} />
                    <Stack.Screen options={{ headerShown: false, headerTitleAlign: 'center',  }} name="Journal" component={Journal} />
                    <Stack.Screen options={{ headerShown: false, headerTitleAlign: 'center',  }} name="Memories" component={Memories} />
                    <Stack.Screen options={{ headerShown: true,  headerTitleAlign: 'center', title: "New Memory" }} name="NewMemory">
                        {props => <NewMemory {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true,  headerTitleAlign: 'center', title: "New Entry" }} name="NewEntry">
                        {props => <NewEntry {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true, headerTitleAlign: 'center',  }} name="EntryTemplate">
                        {props => <EntryTemplate {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true, headerTitleAlign: 'center',  }} name="MemoryTemplate">
                        {props => <MemoryTemplate {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true,  headerTitleAlign: 'center', title: "Edit Entry" }} name="EditEntry">
                        {props => <EditEntry {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true,  headerTitleAlign: 'center', title: "Edit Memory" }} name="EditMemory">
                        {props => <EditMemory {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true, headerTitleAlign: 'center', title: "View Entry" }} name="ViewEntry">
                        {props => <ViewEntry {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true,  headerTitleAlign: 'center', title: "View Memory" }} name="ViewMemory">
                        {props => <ViewMemory {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}

export default App;