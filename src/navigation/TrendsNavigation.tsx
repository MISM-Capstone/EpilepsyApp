import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Trends from "../pages/Trends/Trends";

import HeaderStyle from "../styles/HeaderStyle";

export type TrendsStackParamList = {
    Trends: undefined;
};

const Stack = createStackNavigator<TrendsStackParamList>();

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
