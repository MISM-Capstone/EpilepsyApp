import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Trends from "../../pages/Trends/Trends";

import HeaderStyle from "../../styles/HeaderStyle";
import DateHistory from '../../pages/Trends/DateHistory';
import Charts from '../../pages/Trends/Charts';
import AddEditSeizureLog from '../../pages/Home/AddEditSeizureLog';
import { TrendsStackParamList } from './TrendsNavProps';

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
                <Stack.Screen
                    name="DateHistory"
                    component={DateHistory}
                    options={({ route }) => ({title: route.params.date.dateString})}
                />
                <Stack.Screen
                    name="Charts"
                    component={Charts}
                />
                <Stack.Screen
                    name="UpdateSeizureLog"
                    options={() => ({title: "Update Seizure"})}
                    component={AddEditSeizureLog}
                />
            </Stack.Navigator>
        </>
    );
}

export default HomeNavigation;
