import React, { useState } from 'react';

import { Text, View, Button, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogSurveyDao from '../../_services/database/dao/LogSurveyDao';

type DailySurveyScreenNavigationProp = StackNavigationProp<HomeStackParamList,'DailySurvey'>;

type Props = {
  navigation: DailySurveyScreenNavigationProp;
};

export default function DailySurvey(props:Props) {
    const [date, setDate] = useState<Date>(new Date());
    const [sleep, setSleep] = useState<string>();
    const [stress_level, setStressLevel] = useState<string>();
    const [illness, setIllness] = useState<boolean>();
    const [fever, setFever] = useState<boolean>();
    const [miss_meal, setMissMeal] = useState<boolean>();
    const [medication, setMedication] = useState<boolean>();

    const onChangeDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const onChangeSleep = (sleep: string) => {
        setSleep(sleep);
    }

    const onChangeStress = (stress: string) => {
        setStressLevel(stress);
    }

    const onChangeIllness = (illness: boolean) => {
        setIllness(illness);
    }

    const onChangeFever = (fever: boolean) => {
        setFever(fever);
    }

    const onChangeMissMeal = (miss_meal: boolean) => {
        setMissMeal(miss_meal);
    }

    const onChangeMedication = (medication: boolean) => {
        setMedication(medication);
    }

    const insertQuery = async (date: Date, sleep: string | any, stress_level: string | any, illness: boolean, fever: boolean, miss_meal: boolean, medication: boolean) => {
        let results = await LogSurveyDao.insertSurveyEntry(date,sleep,stress_level,illness,fever,miss_meal,medication);
        console.log('inserted: ',results);
        props.navigation.goBack();
    }

    return(
        <SafeAreaView>
            <View style={{ padding: 12 }}>
                <Text>Date</Text>
                {/* Maybe we don't need to have them enter this? */}
                <DateTimePicker
                    testID="datePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
                <Text>How much sleep did you get last night?</Text>
                <TextInput
                    style={{ height: 40, backgroundColor: 'lightgray' }}
                    keyboardType='numeric'
                    onChangeText={text => onChangeSleep(text)}
                    value={sleep} />
                <Text>How stressed do you feel on a scale of 1-10?</Text>
                <TextInput
                    style={{ height: 40, backgroundColor: 'lightgray' }}
                    keyboardType='numeric'
                    onChangeText={text => onChangeStress(text)}
                    value={stress_level} />
                {/* Add radio buttons here */}
            </View>
            <Button title="Save" onPress={() => insertQuery(date, sleep,stress_level,true,true,false,true)} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}

