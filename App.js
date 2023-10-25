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


const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    <Stack.Screen options={{ headerShown: true, title: 'Register' }} name="Register" component={Register} />
                    <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen options={{ headerShown: true }} name="Map" component={Map} />
                    <Stack.Screen options={{ headerShown: true }} name="Settings" component={Settings} />
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                    <Stack.Screen options={{ headerShown: true }} name="NewEntry">
                        {props => <NewEntry {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true }} name="EntryTemplate">
                        {props => <EntryTemplate {...props} />}
                    </Stack.Screen>
                    <Stack.Screen options={{ headerShown: true }} name="EditEntry">
                        {props => <EditEntry {...props} />}
                    </Stack.Screen>
                    <Stack.Screen name="ViewEntry">
                        {props => <ViewEntry {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}

export default App;

