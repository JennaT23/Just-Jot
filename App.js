import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './app/screens/login/login.screen'
import { Register } from './app/screens/register/register.screen'
import { ForgotPassword } from './app/screens/forgotPwd/forgotPwd.screen'
import { Home } from './app/screens/appHome/appHome.screen'
import { ViewEntry } from './app/screens/viewEntry/viewEntry'
import ThemeProvider from './appStyles/themeProvider';


const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    <Stack.Screen options={{ headerShown: true }} name="Register" component={Register} />
                    <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                    <Stack.Screen options={{ headerShow: true }} name="ViewEntry">
                        {props => <ViewEntry {...props} />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}

export default App;

