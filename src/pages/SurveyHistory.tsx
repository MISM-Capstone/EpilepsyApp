import React, { Component, useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from "../navigation/HomeNavigation"

type SurveyHistoryScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'SurveyHistory'
>;

type Props = {
    navigation: SurveyHistoryScreenNavigationProp;
};
type MyState = {
    surveyData: string // TODO: make this into a specific object for survey data
}

const getSurveyData = async () => {
    try {
        const json = await AsyncStorage.getItem('@survey_resp');
        return json != null ? JSON.parse(json) : null;
    } catch (e) {
        console.error(e);
    }
}

function SurveyHistory(props:Props) {
    const [surveyData, setSurveyData] = useState("");

    useEffect(() => {
        getSurveyData()
            .then((result) => {
                setSurveyData(result)
            });
    }, [])

    return (
        <SafeAreaView>
            <View style={{ padding: 12 }}>
                <Text>Survey History</Text>
                <Text>{surveyData}</Text>
                <Button title="Go Back" onPress={props.navigation.goBack} />
            </View>
        </SafeAreaView >
    )

}

export default SurveyHistory