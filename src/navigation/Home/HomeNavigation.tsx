import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "../../pages/Home/Home";
import DailySurvey from "../../pages/Home/DailySurvey";
import SurveyHistory from "../../pages/Home/SurveyHistory";
import AddEditSeizureLog from "../../pages/_Shared/AddEditSeizureLog";
import RecordMedication from "../../pages/_Shared/RecordMedication";

import HeaderStyle from "../../styles/HeaderStyle";
import HealthKitTest from '../../pages/Home/HealthKitTest';
import AddLocation from '../../pages/_Shared/AddLocation';
import AddMedication from '../../pages/_Shared/AddMedication';
import AddDosageUnit from '../../pages/_Shared/AddDosageUnit';
import PersonalSurveys from '../../pages/Home/PersonalSurveys';
import AddEditSurvey from '../../pages/Home/AddEditSurvey';
import { HomeStackParamList } from './HomeNavProps';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigation = () => {
    return (
        <>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={HeaderStyle}
                // mode="modal"
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
                <Stack.Screen
                    name="SurveyHistory"
                    component={SurveyHistory}
                    options={{
                        title: 'Survey History'
                    }}
                />
                <Stack.Screen
                    name="LogSeizure"
                    component={AddEditSeizureLog}
                    options={{
                        title: 'Log a Seizure'
                    }}
                />
                <Stack.Screen
                    name="PersonalSurveys"
                    component={PersonalSurveys}
                    options={() => {
                        return {
                            title: 'Personal Surveys',
                        }
                    }}
                />
                <Stack.Screen
                    name="AddEditSurvey"
                    component={AddEditSurvey}
                    options={{
                        title: 'Edit Survey'
                    }}
                />
                <Stack.Screen
                    name="RecordMedication"
                    component={RecordMedication}
                    options={{
                        title: 'Record Medication'
                    }}
                />
                <Stack.Screen
                    name="HealthKitTest"
                    component={HealthKitTest}
                    options={{
                        title: 'Health Kit Test'
                    }}
                />
                <Stack.Screen
                    name="AddLocation"
                    component={AddLocation}
                    options={{
                        title: 'Add Location'
                    }}
                />
                <Stack.Screen
                    name="AddMedication"
                    component={AddMedication}
                    options={{
                        title: 'Add Medication'
                    }}
                />
                <Stack.Screen
                    name="AddDosageUnit"
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
