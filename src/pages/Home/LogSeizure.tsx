import React, { useEffect, useState } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import SeizureLogDao from '../../_services/database/dao/SeizureLogDao';
import SurveyStyles from '../../styles/SurveyStyles';
import SeizureLog, { SeizureLogDb } from '../../models/SeizureLog';
import { CopyAndSetKey } from '../../functions';
import { GetAuthContext } from '../../_services/Providers/AuthProvider';

type LogSeizureScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'LogSeizure'>;

type Props = {
    navigation: LogSeizureScreenNavigationProp;
    route: any;
};

type ErrorObject = {
    location?: string;
    notes?: string;
}

export default function LogSeizure(props: Props) {
    const {user} = GetAuthContext();
    const [seizureLog, setSeizureLog] = useState<SeizureLog>(new SeizureLog(user!.id!));

    function updateValue(key:string, value:any){
        const newUser = CopyAndSetKey(seizureLog, key, value) as SeizureLog;
        setSeizureLog(newUser);
    }
    
    const errors: ErrorObject = {};

    useEffect(() => {
        if (props.route.params) {
            let date: any = props.route.params.date;
            let paramDate = new Date(date.dateString.replace(/-/g, '\/'));
            updateValue(SeizureLogDb.fields.date, paramDate);
        }
    }, []);

    const onChangeDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || seizureLog.date;
        updateValue(SeizureLogDb.fields.date, currentDate);
    };

    const onChangeTime = (_event: Event, selectedDate: Date | undefined) => {
        const currentTime = selectedDate || seizureLog.date;
        console.log(selectedDate);
        updateValue(SeizureLogDb.fields.time, currentTime.toLocaleTimeString());
        console.log(seizureLog);
    };

    // Optional way to validate form -> do we want to require every field?
    // const validateForm = () => {
    //     const validArray = [date,time,location, notes];
    //     for (var i = 0; i < validArray.length; i++){ 
    //         if (validArray[i] === undefined) {
    //             return setValidForm(false);
    //         }
    //     }
    //     return setValidForm(true);
    // }

    // TODO: find way for errors to be displayed
    const checkErrors = () => {
        seizureLog.location_id === 0 ? errors.location = "Please Add a Location." : null;
        seizureLog.notes === "" ? errors.notes = "Please Add Notes about the Seizure." : null;

        console.log(errors);

        if (Object.keys(errors).length == 0) {
            insertQuery();
        }
    }

    const insertQuery = async () => {
        let results = await SeizureLogDao.insert(seizureLog);
        console.log('inserted: ', results);
        props.navigation.goBack();
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 12 }}>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Date of Seizure</Text>
                    <DateTimePicker
                        testID="datePicker"
                        value={seizureLog.date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        maximumDate={new Date()}
                    />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Time of Seizure</Text>
                    <DateTimePicker
                        testID="timePicker"
                        value={seizureLog.date}
                        mode="time"
                        display="default"
                        onChange={onChangeTime}
                    />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Location</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={(value) => {
                            updateValue(SeizureLogDb.fields.location_id, value);
                        }}
                        value={seizureLog.location_id.toString()} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Details</Text>
                    <TextInput
                        style={{ backgroundColor: 'lightgray', height: 100 }}
                        onChangeText={(value) => {
                            updateValue(SeizureLogDb.fields.notes, value);
                        }}
                        value={seizureLog.notes}
                        multiline
                        numberOfLines={5} />
                </View>
            </View>
            <Button title="Save" onPress={() => checkErrors()} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
            <View>
                {errors.location && <Text>{errors.location}</Text>}
                {errors.notes && <Text>{errors.notes}</Text>}
            </View>
        </SafeAreaView>
    )
}
