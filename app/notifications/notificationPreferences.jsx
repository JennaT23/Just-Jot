import AsyncStorage from '@react-native-async-storage/async-storage';

export const setNotificationPreference = async (value) => {
    try {
        await AsyncStorage.setItem('notification_preference', value);
    } catch (error) {
        console.error('Error setting notification preference:', error);
    }
};

export const getNotificationPreference = async () => {
    try {
        const value = await AsyncStorage.getItem('notification_preference');
        return value !== null ? value : 'default_value';
    } catch (error) {
        console.error('Error getting notification preference:', error);
        return false;
    }
};