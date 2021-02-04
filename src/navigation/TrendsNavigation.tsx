import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Trends from "../pages/Trends";
import DailySurvey from "../pages/DailySurvey";

import HeaderStyle from "../styles/HeaderStyle";

export type RootStackParamList = {
    Trends: undefined;
    DailySurvey: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Trends"
                screenOptions={HeaderStyle}
            >
                <Stack.Screen
                        name="Trends"
                        component={Trends}
                />
            </Stack.Navigator>
        </>
    );
}

export default HomeNavigation;
