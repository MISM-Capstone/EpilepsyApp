import React, { useEffect, useState } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import SurveyLogDao from '../../_services/database/dao/SurveyLogDao';
import ButtonSet from '../../components/ButtonSet';
import AppleHealthKit, { } from 'react-native-health';
import SurveyStyles from '../../styles/SurveyStyles';
import Slider from '@react-native-community/slider';

type DailySurveyScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'DailySurvey'>;

type Props = {
    navigation: DailySurveyScreenNavigationProp;
    route: any;
};

export default function DailySurvey(props: Props) {
    const date = new Date();
    const prev_date = new Date();
    prev_date.setDate(date.getDate() - 1);
    const [sleepStartDate, setSleepStartDate] = useState<Date>(date);
    const [sleepEndDate, setSleepEndDate] = useState<Date>(date);
    const [stress_level, setStressLevel] = useState<any>();
    const [illness, setIllness] = useState<boolean>();
    const [fever, setFever] = useState<boolean>();
    const [miss_meal, setMissMeal] = useState<boolean>();
    const [medication, setMedication] = useState<boolean>();

    useEffect(() => {        
        // Getting data from HealthKit and putting it in the sleep section
        // TODO: move this to a service
        // - How to handle errors if there are no values
        // - Add note that this information comes from Apple
        const options: any = { startDate: prev_date.toISOString(), limit: 1 }
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

    const onChangeSleepStartDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setSleepStartDate(currentDate);
    };

    const onChangeSleepEndDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setSleepEndDate(currentDate);
    };

    const onChangeStress = (stress: number) => {
        setStressLevel(stress);
    }

    const insertQuery = async (date: Date, sleepStartDate: Date, sleepEndDate: Date, stress_level: string | any, illness: boolean | any, fever: boolean | any, miss_meal: boolean | any, medication: boolean | any) => {
        console.log('sleep dates: ', sleepStartDate, sleepEndDate)
        let results = await SurveyLogDao.insertSurveyLog(date, sleepStartDate, sleepEndDate, stress_level, illness, fever, miss_meal, medication);
        console.log('inserted:', results);
        props.navigation.goBack();
    }

    return (
        <SafeAreaView>
            <View style={SurveyStyles.surveyContainer}>
                <Text style={SurveyStyles.dailySurveyHeading}>Daily Survey for {date.toLocaleDateString()}</Text>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>What time did you go to sleep last night?</Text>
                    <DateTimePicker
                        testID="datePicker"
                        value={sleepStartDate}
                        mode="datetime"
                        display="default"
                        onChange={onChangeSleepStartDate}
                        maximumDate={date}
                        minimumDate={prev_date}
                    />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>What time did you wake up date?</Text>
                    <DateTimePicker
                        testID="datePicker"
                        value={sleepEndDate}
                        mode="datetime"
                        display="default"
                        onChange={onChangeSleepEndDate}
                        maximumDate={date}
                        minimumDate={prev_date}
                    />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>How stressed do you feel? (Scale of 1-10)</Text>
                    <View style={{display: `flex`, flexDirection: `row`}}>
                    <Slider
                        style={{width: 250, height: 40}}
                        minimumValue={1}
                        maximumValue={10}
                        step={1}
                        value={1}
                        onValueChange={value => onChangeStress(value)}
                    />
                    <Text style={{ fontSize: 24, paddingTop: 4, marginLeft: 10}}>{stress_level}</Text>
                    </View>
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Have you felt sick lately?</Text>
                    <ButtonSet onChange={setIllness} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Have you had a fever?</Text>
                    <ButtonSet onChange={setFever} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Have you missed any meals?</Text>
                    <ButtonSet onChange={setMissMeal} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Have you taken proper medications?</Text>
                    <ButtonSet onChange={setMedication} />
                </View>
            </View>
            <Button title="Save" onPress={() => insertQuery(date, sleepStartDate, sleepEndDate, stress_level, illness, fever, miss_meal, medication)} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}

