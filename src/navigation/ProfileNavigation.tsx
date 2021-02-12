import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from "../pages/Profile/Profile";

import HeaderStyle from "../styles/HeaderStyle";
import ExportReport from '../pages/Profile/ExportReport';

export type ProfileStackParamList = {
    Profile: undefined;
    ExportReport: undefined;
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
                // initialRouteName="ExportReport"
                screenOptions={HeaderStyle}
            >
                <Stack.Screen
                        name="Profile"
                        component={Profile}
                />
                <Stack.Screen
                        name="ExportReport"
                        component={ExportReport}
                        options={{
                            title: 'Export Report'
                        }}
                />
            </Stack.Navigator>
        </>
    );
}

export default ProfileNavigation;
