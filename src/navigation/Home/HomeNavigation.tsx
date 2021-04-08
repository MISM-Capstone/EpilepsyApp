import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "../../pages/Home/Home";
import SurveyHistory from "../../pages/Home/SurveyHistory";
import AddEditSeizureLog from "../../pages/_Shared/AddEditSeizureLog";
import RecordMedication from "../../pages/_Shared/RecordMedication";

import HeaderStyle from "../../styles/HeaderStyle";
import AddLocation from '../../pages/_Shared/AddLocation';
import AddMedication from '../../pages/_Shared/AddMedication';
import AddDosageUnit from '../../pages/_Shared/AddDosageUnit';
import PersonalSurveys from '../../pages/Home/PersonalSurveys';
import AddEditSurvey from '../../pages/Home/AddEditSurvey';
import { HomeOptions, HomeStackParamList } from './HomeNavProps';
import TakeSurvey from '../../pages/Home/TakeSurvey';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName={HomeOptions.Home}
                screenOptions={HeaderStyle}
                // mode="modal"
            >
                <Stack.Screen
                    name={HomeOptions.Home}
                    component={Home}
                />
                <Stack.Screen
                    name={HomeOptions.SurveyHistory}
                    component={SurveyHistory}
                    options={{
                        title: 'Survey History'
                    }}
                />
                <Stack.Screen
                    name={HomeOptions.LogSeizure}
                    component={AddEditSeizureLog}
                    options={{
                        title: 'Log a Seizure'
                    }}
                />
                <Stack.Screen
                    name={HomeOptions.PersonalSurveys}
                    component={PersonalSurveys}
                    options={() => {
                        return {
                            title: 'Personal Surveys',
                        }
                    }}
                />
                <Stack.Screen
                    name={HomeOptions.AddEditSurvey}
                    component={AddEditSurvey}
                    options={{
                        title: 'Edit Survey'
                    }}
                />
                <Stack.Screen
                    name={HomeOptions.TakeSurvey}
                    component={TakeSurvey}
                    options={{
                        title: 'Take Survey'
                    }}
                />
                <Stack.Screen
                    name={HomeOptions.RecordMedication}
                    component={RecordMedication}
                    options={{
                        title: 'Record Medication'
                    }}
                />
                <Stack.Screen
                    name={HomeOptions.AddLocation}
                    component={AddLocation}
                    options={{
                        title: 'Add Location'
                    }}
                />
                <Stack.Screen
                    name={HomeOptions.AddMedication}
                    component={AddMedication}
                    options={{
                        title: 'Add Medication'
                    }}
                />
                <Stack.Screen
                    name={HomeOptions.AddDosageUnit}
                    component={AddDosageUnit}
                    options={{
                        title: 'Add Dosage Unit'
                    }}
                />
            </Stack.Navigator>
        </>
    );
}

export default HomeNavigation;
