import React, { useState, useEffect } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import MedicationLogDao from '../../_services/database/dao/MedicationLogDao';
import SurveyStyles from '../../styles/SurveyStyles';
import MedicationLog, { MedicationLogDb } from '../../models/Medication/MedicationLog';
import { GetAuthContext } from '../../_services/Providers/AuthProvider';
import { CopyAndSetKey } from '../../functions';

type RecordMedicationScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'RecordMedication'>;

type Props = {
    navigation: RecordMedicationScreenNavigationProp;
    route: any;
};


export default function RecordMedication(props: Props) {
    const {user} = GetAuthContext();
    const [medicationLog, setMedicationLog] = useState<MedicationLog>(new MedicationLog(user!.id!));
    const [date, setDate] = useState<any>(new Date());
    const [time, setTime] = useState<any>(new Date());

    function updateValue(key:string, value:any){
        const seizLog = CopyAndSetKey(medicationLog, key, value) as MedicationLog;
        setMedicationLog(seizLog);
    }
    
    useEffect(() => {
        if (props.route.params) {
            let date: any = props.route.params.date;
            setDate(new Date(date.dateString.replace(/-/g, '\/')));
        }
    }, []);

    const onChangeDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || medicationLog.date;
        updateValue(MedicationLogDb.fields.date, currentDate);
    };

    const onChangeTime = (_event: Event, selectedDate: Date | undefined) => {
        const currentTime = selectedDate || medicationLog.date;
        console.log(selectedDate);
        updateValue(MedicationLogDb.fields.time, currentTime.toLocaleTimeString());
        updateValue(MedicationLogDb.fields.date, currentTime);
    };

    const insertQuery = async () => {
        let results = await MedicationLogDao.insert(medicationLog);
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
                        value={medicationLog.date}
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
                        value={medicationLog.date}
                        mode="time"
                        display="default"
                        onChange={onChangeTime}
                    />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Medication Name</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={(value) => {
                            updateValue(MedicationLogDb.fields.dosage_unit_id, value);
                        }}
                        value={medicationLog.medication_id.toString()} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Dosage</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={(value) => {
                            updateValue(MedicationLogDb.fields.dosage_unit_id, value);
                        }}
                        value={medicationLog.dosage.toString()} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Dosage Unit</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={(value) => {
                            updateValue(MedicationLogDb.fields.dosage_unit_id, value);
                        }}
                        value={medicationLog.dosage_unit_id.toString()} />
                </View>
            </View>
            <Button title="Save" onPress={() => insertQuery()} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}
