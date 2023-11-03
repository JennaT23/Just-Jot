import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from "react-native-paper";
import { Memory } from "../memory/memory.screen";
import { Journal } from "../appJournal/journal.screen";
import { Map } from "../map/map.screen";
import { Settings } from "../settings/settings.screen";

export const NavBar = () => {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={Journal}
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
                    name="Journal"
                    component={Journal}
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
                        tabBarLabel: "Memory Capsule",
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