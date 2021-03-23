import React, { useState, useEffect } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import MedicationLogDao from '../../_services/database/dao/MedicationLogDao';
import SurveyStyles from '../../styles/SurveyStyles';

type RecordMedicationScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'RecordMedication'>;

type Props = {
    navigation: RecordMedicationScreenNavigationProp;
    route: any;
};


export default function RecordMedication(props: Props) {
    const [date, setDate] = useState<any>(new Date());
    const [time, setTime] = useState<any>(new Date());
    const [medicationText, setMedicationText] = useState('');
    const [dosageText, setDosageText] = useState('');
    const [notesText, setNotesText] = useState('');

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

    const onChangeTime = (_event: Event, selectedDate: Date | undefined) => {
        console.log(selectedDate);
        setTime(selectedDate);
    };

    const onChangeMedicationText = (text: string) => {
        setMedicationText(text);
    }

    const onChangeDosageText = (text: string) => {
        setDosageText(text);
    }

    const onChangeNotesText = (text: string) => {
        setNotesText(text);
    }

    const insertQuery = async (date: Date, time: Date, medication: string | any, dosage: string | any, notes: string | any) => {
        let results = await MedicationLogDao.insertMedicationLog(date, time, medication, dosage, notes);
        console.log('inserted: ', results);
        props.navigation.goBack();
    }

    return (
        <SafeAreaView>
            <View style={SurveyStyles.surveyContainer}>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Date of Medication</Text>
                    <DateTimePicker
                        testID="datePicker"
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        maximumDate={new Date()}
                    />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Time of Medication</Text>
                    <DateTimePicker
                        testID="timePicker"
                        value={time}
                        mode="time"
                        display="default"
                        onChange={onChangeTime}
                    />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Medication Name</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={text => onChangeMedicationText(text)}
                        value={medicationText} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Dosage</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={text => onChangeDosageText(text)}
                        value={dosageText} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Notes</Text>
                    <TextInput
                        style={{ backgroundColor: 'lightgray', height: 100 }}
                        onChangeText={text => onChangeNotesText(text)}
                        value={notesText}
                        multiline
                        numberOfLines={5} />
                </View>
            </View>
            <Button title="Save" onPress={() => insertQuery(date, time, medicationText, dosageText, notesText)} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}
