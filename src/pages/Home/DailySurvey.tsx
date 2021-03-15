import React, { useEffect, useState } from 'react';

import { Text, View, Button, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SurveyLogDao from '../../_services/database/dao/LogSurveyDao';
import ButtonSet from '../../components/ButtonSet';

type DailySurveyScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'DailySurvey'>;

type Props = {
    navigation: DailySurveyScreenNavigationProp;
    route: any;
};

export default function DailySurvey(props: Props) {
    const [date, setDate] = useState<Date>(new Date());
    const [sleep, setSleep] = useState<string>();
    const [stress_level, setStressLevel] = useState<string>();
    const [illness, setIllness] = useState<boolean>();
    const [fever, setFever] = useState<boolean>();
    const [miss_meal, setMissMeal] = useState<boolean>();
    const [medication, setMedication] = useState<boolean>();

    useEffect(() => {
        if (props.route.params) {
            let date: any = props.route.params.date;
            setDate(new Date(date.dateString.replace(/-/g, '\/')));
        }
    }, []);   

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

    const insertQuery = async (date: Date, sleep: string | any, stress_level: string | any, illness: boolean | any, fever: boolean | any, miss_meal: boolean | any, medication: boolean | any) => {
        let results = await SurveyLogDao.insertSurveyEntry(date, sleep, stress_level, illness, fever, miss_meal, medication);
        console.log('inserted:', results);
        props.navigation.goBack();
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 12 }}>
                <Text>Date</Text>
                {/* TODO: Maybe we don't need to have them enter a date? */}
                <DateTimePicker
                    testID="datePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                    maximumDate={new Date()}
                />
                <Text>How much sleep did you get last night?</Text>
                <TextInput
                    style={{ height: 40, backgroundColor: 'lightgray' }}
                    keyboardType='numeric'
                    onChangeText={text => onChangeSleep(text)}
                    value={sleep} />
                {/* TODO: Find a good way to make this entry numeric only */}
                {/* TODO: Find a more intuitive way to enter in hours & minutes */}
                <Text>How stressed do you feel on a scale of 1-10?</Text>
                <TextInput
                    style={{ height: 40, backgroundColor: 'lightgray' }}
                    keyboardType='numeric'
                    onChangeText={text => onChangeStress(text)}
                    value={stress_level} />
                <Text>Have you felt sick lately?</Text>
                <ButtonSet onChange={setIllness} />
                <Text>Have you had a fever?</Text>
                <ButtonSet onChange={setFever} />
                <Text>Have you missed any meals?</Text>
                <ButtonSet onChange={setMissMeal} />
                <Text>Have you taken proper medications?</Text>
                <ButtonSet onChange={setMedication} />
            </View>
            <Button title="Save" onPress={() => insertQuery(date, sleep, stress_level, illness, fever, miss_meal, medication)} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}

