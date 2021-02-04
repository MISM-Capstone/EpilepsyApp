import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "../pages/Home";
import DailySurvey from "../pages/DailySurvey";

import HeaderStyle from "../styles/HeaderStyle";

export type RootStackParamList = {
    Home: undefined;
    DailySurvey: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={HeaderStyle}
            >
                <Stack.Screen
                        name="Home"
                        component={Home}
                />
                <Stack.Screen
                        name="DailySurvey"
                        component={DailySurvey}
                        options={{
                          title: 'Daily Survey'
                        }}
                />
            </Stack.Navigator>
        </>
    );
}

export default HomeNavigation;
