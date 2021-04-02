import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Trends from "../../pages/Trends/Trends";

import HeaderStyle from "../../styles/HeaderStyle";
import DateHistory from '../../pages/Trends/DateHistory';
import Charts from '../../pages/Trends/Charts';
import AddEditSeizureLog from '../../pages/_Shared/AddEditSeizureLog';
import { TrendOptions, TrendsStackParamList } from './TrendsNavProps';
import RecordMedication from '../../pages/_Shared/RecordMedication';
import AddMedication from '../../pages/_Shared/AddMedication';
import AddDosageUnit from '../../pages/_Shared/AddDosageUnit';

const Stack = createStackNavigator<TrendsStackParamList>();

const HomeNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName={TrendOptions.Trends}
                screenOptions={HeaderStyle}
            >
                <Stack.Screen
                    name={TrendOptions.Trends}
                    component={Trends}
                />
                <Stack.Screen
                    name={TrendOptions.DateHistory}
                    component={DateHistory}
                    options={({ route }) => ({title: route.params.date.dateString})}
                />
                <Stack.Screen
                    name={TrendOptions.Charts}
                    component={Charts}
                />
                <Stack.Screen
                    name={TrendOptions.UpdateSeizureLog}
                    options={() => ({title: "Update Seizure"})}
                    component={AddEditSeizureLog}
                />
                <Stack.Screen
                    name={TrendOptions.UpdateMedLog}
                    options={() => ({title: "Update Medication Log"})}
                    component={RecordMedication}
                />
                <Stack.Screen
                    name={TrendOptions.UpdateMed}
                    options={() => ({title: "Update Medication"})}
                    component={AddMedication}
                />
                <Stack.Screen
                    name={TrendOptions.UpdateDosageUnit}
                    options={() => ({title: "Update Dosage Unit"})}
                    component={AddDosageUnit}
                />
            </Stack.Navigator>
        </>
    );
}

export default HomeNavigation;
