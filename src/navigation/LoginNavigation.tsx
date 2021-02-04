
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "../pages/Login";

import HeaderStyle from "../styles/HeaderStyle";

export type LoginStackParamList = {
    Login: undefined;
    SingUp: undefined;
}

const Stack = createStackNavigator<LoginStackParamList>();

export default function LoginNavigation() {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={HeaderStyle}
            >
                <Stack.Screen
                        name="Login"
                        component={Login}
                />
            </Stack.Navigator>
        </>
    );
}
