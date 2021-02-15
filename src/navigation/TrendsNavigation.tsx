import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Trends from "../pages/Trends/Trends";

import HeaderStyle from "../styles/HeaderStyle";
import DateHistory from '../pages/Trends/DateHistory';
import { DateObject } from 'react-native-calendars';

export type TrendsStackParamList = {
    Trends: undefined;
    DateHistory: { date: DateObject };
};

const Stack = createStackNavigator<TrendsStackParamList>();

const HomeNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Trends"
                screenOptions={HeaderStyle}
                mode="modal"
            >
                <Stack.Screen
                    name="Trends"
                    component={Trends}
                />
                <Stack.Screen
                    name="DateHistory"
                    component={DateHistory}
                    options={({ route }) => ({title: route.params.date.dateString})}
                />
            </Stack.Navigator>
        </>
    );
}

export default HomeNavigation;
