import React from 'react';
import * as Notifications from 'expo-notifications';
import client from './client';

const register = (pushToken) => client.post('/expoPushTokens', { token: pushToken });
export default {
    register,
}