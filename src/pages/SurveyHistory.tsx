import React, { Component, useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import {HomeStackParamList} from "../navigation/HomeNavigation"
import { STORAGE_KEYS } from '../constants';

type SurveyHistoryScreenNavigationProp = StackNavigationProp<
    HomeStackParamList,
    'SurveyHistory'
>;

type Props = {
    navigation: SurveyHistoryScreenNavigationProp;
};

type SurveyInfoProps = {
    survey: SurveyData;
}

interface SurveyData {
    Date: string;
    Time: string;
    Location: string;
    Details: string;
}

const getSurveyData = async () => {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEYS.survey);
        return json != null ? JSON.parse(json) : null;
    } catch (e) {
        console.error(e);
    }
}

function SurveyDataInfo(props:SurveyInfoProps) {
    return (
        <View>
            <Text>{props.survey.Date}</Text>
            <Text>{props.survey.Time}</Text>
            <Text>{props.survey.Location}</Text>
            <Text>{props.survey.Details}</Text>
        </View>
    );
}

function SurveyHistory(props:Props) {
    const [surveyData, setSurveyData] = useState<SurveyData[]>([]);

    useEffect(() => {
        getSurveyData()
            .then((results) => {
                console.log(results);
                setSurveyData([results]);
            });
    }, [])

    return (
        <SafeAreaView>
            <View style={{ padding: 12 }}>
                <Text>Survey History</Text>
                {surveyData.map((data) => <SurveyDataInfo key={data.Date} survey={data}/>)}
                <Button title="Go Back" onPress={props.navigation.goBack} />
            </View>
        </SafeAreaView >
    )

}

export default SurveyHistory