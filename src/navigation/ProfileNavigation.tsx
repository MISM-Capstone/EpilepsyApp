import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from "../pages/Profile/Profile";
import ViewReport from "../pages/Profile/ViewReport";

import HeaderStyle from "../styles/HeaderStyle";
import ExportReport from '../pages/Profile/ExportReport';
import GenerateReport from '../pages/Profile/GenerateReport';

export type GenerateReportProps = {
    start:number;
    end:number;
}

export type ViewReportProps = {
    pdf:object;
}

export type ProfileStackParamList = {
    Profile: undefined;
    ExportReport: undefined;
    ViewReport: ViewReportProps;
    GenerateReport: GenerateReportProps;
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
                <Stack.Screen
                        name="GenerateReport"
                        component={GenerateReport}
                        options={{
                            title: 'Generating Report'
                        }}
                />
                <Stack.Screen
                        name="ViewReport"
                        component={ViewReport}
                        options={{
                            title: 'View Report'
                        }}
                />
            </Stack.Navigator>
        </>
    );
}

export default ProfileNavigation;
