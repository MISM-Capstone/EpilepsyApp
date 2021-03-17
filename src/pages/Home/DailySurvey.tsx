import React, { useEffect, useState } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import SurveyLogDao from '../../_services/database/dao/LogSurveyDao';
import ButtonSet from '../../components/ButtonSet';
import AppleHealthKit, {  } from 'react-native-health';

type DailySurveyScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'DailySurvey'>;

type Props = {
    navigation: DailySurveyScreenNavigationProp;
    route: any;
};

export default function DailySurvey(props: Props) {
    const [date, setDate] = useState<Date>(new Date());
    const [sleepStartDate, setSleepStartDate] = useState<Date>(new Date());
    const [sleepEndDate, setSleepEndDate] = useState<Date>(new Date());
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

        // Getting data from HealthKit and putting it in the sleep section
        // TODO: move this to a service
        // - How to handle errors if there are no values
        // - Add note that this information comes from Apple
        let prev_day = new Date();
        prev_day.setDate(date.getDate() - 1);
        const options: any = { startDate: prev_day.toISOString(), limit: 1 }
        AppleHealthKit.getSleepSamples(options, (err: string, results: any) => {
            console.log('Sleep sample: ', results);
            try {
                const start = new Date(results[0]['startDate'])
                const end = new Date(results[0]['endDate'])
                console.log('start: ', start);
                console.log('end: ', end);
                setSleepStartDate(start);
                setSleepEndDate(end);
            } catch (err: unknown) {
                console.log(err)
            }
        });

    }, []);

    const onChangeDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const onChangeSleepStartDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setSleepStartDate(currentDate);
    };

    const onChangeSleepEndDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setSleepEndDate(currentDate);
    };

    const onChangeStress = (stress: string) => {
        setStressLevel(stress);
    }

    const insertQuery = async (date: Date, sleepStartDate: Date, sleepEndDate: Date, stress_level: string | any, illness: boolean | any, fever: boolean | any, miss_meal: boolean | any, medication: boolean | any) => {
        console.log('sleep dates: ', sleepStartDate, sleepEndDate)
        let results = await SurveyLogDao.insertSurveyEntry(date, sleepStartDate, sleepEndDate, stress_level, illness, fever, miss_meal, medication);
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
                <Text>What time did you go to sleep last night?</Text>
                <DateTimePicker
                    testID="datePicker"
                    value={sleepStartDate}
                    mode="datetime"
                    display="default"
                    onChange={onChangeSleepStartDate}
                    maximumDate={new Date()}
                />
                <Text>What time did you wake up today?</Text>
                <DateTimePicker
                    testID="datePicker"
                    value={sleepEndDate}
                    mode="datetime"
                    display="default"
                    onChange={onChangeSleepEndDate}
                    maximumDate={new Date()}
                />
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
            <Button title="Save" onPress={() => insertQuery(date, sleepStartDate, sleepEndDate, stress_level, illness, fever, miss_meal, medication)} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}

