import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from "../pages/Profile/Profile";

import HeaderStyle from "../styles/HeaderStyle";

export type ProfileStackParamList = {
    Profile: undefined;
};

export const ProfileNavOptions = {
    profile: "Profile"
}

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Profile"
                screenOptions={HeaderStyle}
            >
                <Stack.Screen
                        name="Profile"
                        component={Profile}
                />
            </Stack.Navigator>
        </>
    );
}

export default ProfileNavigation;
