import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './app/screens/login/login.screen'
import { Register } from './app/screens/register/register.screen'
import { ForgotPassword } from './app/screens/forgotPwd/forgotPwd.screen'
import { Home } from './app/screens/appHome/appHome.screen'
import { NewEntry } from './app/screens/newEntry/newEntry.screen'
import { ViewEntry } from './app/screens/viewEntry/viewEntry'
import { EditEntry } from './app/screens/editEntry/editEntry'
import ThemeProvider from './appStyles/themeProvider';
import { EntryTemplate } from './templates/entryTemplate';
import { Map } from './app/screens/map/map.screen';
import { Settings } from './app/screens/settings/settings.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper'
import { Memories } from './app/screens/memory/memory.screen';
import { NewMemory } from './app/screens/newMemory/newMemory.screen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NavBar() {
    return (
        <Tab.Navigator
            initialRouteName={Home}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home-outline'
                            : 'home-outline';
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
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Memories" component={Memories} />
            <Tab.Screen name="Settings" component={Settings} />

        </Tab.Navigator>
    )
}

const App = () => {
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
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
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
                    <Stack.Screen options={{ headerShown: true }} name="ViewEntry">
                        {props => <ViewEntry {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}

export default App;

