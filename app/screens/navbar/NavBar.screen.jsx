import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from "react-native-paper";

import { Home } from "../appHome/appHome.screen";
import { Map } from "../map/map.screen";
import { Settings } from "../settings/settings.screen";

export const NavBar = () => {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={Home}
                tabBarOptions={{
                    activeTintColor: 'black',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen
                    name="Map"
                    component={Map}
                    options={{
                        tabBarLabel: "Map",
                        tabBarIcon: ({ color, size }) => (
                            <IconButton name="home-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <IconButton name="map-marker-radius-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Memory"
                    component={Memory}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <IconButton name="star-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        tabBarLabel: "Settings",
                        tabBarIcon: ({ color, size }) => (
                            <IconButton name="cog-outline" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}