import React, { useEffect, useState } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import SeizureLogDao from '../../_services/database/dao/SeizureLogDao';
import SurveyStyles from '../../styles/SurveyStyles';
import SeizureLog from '../../models/SeizureLog';

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
    const [seizureLog, setSeizureLog] = useState<SeizureLog>(new SeizureLog());
    const [date, setDate] = useState<any>(new Date());
    const [time, setTime] = useState<any>(new Date());
    const [location, setLocation] = useState<string>();
    const [notes, setNotes] = useState<string>();

    const errors: ErrorObject = {};

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

    const onChangeLocationText = (text: string) => {
        setLocation(text);
    }

    const onChangeNotesText = (text: string) => {
        setNotes(text);
    }

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
    const checkErrors = (date: Date, time: Date, location: string | any, notes: string | any) => {
        location === undefined ? errors.location = "Please Add a Location." : null;
        notes === undefined ? errors.notes = "Please Add Notes about the Seizure." : null;

        console.log(errors);

        if (Object.keys(errors).length == 0) {
            insertQuery(date, time, location, notes);
        }
    }

    const insertQuery = async (date: Date, time: Date, location: string | any, notes: string | any) => {
        let results = await SeizureLogDao.insertSeizureLog(date, time, location, notes);
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
                        value={date}
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
                        value={time}
                        mode="time"
                        display="default"
                        onChange={onChangeTime}
                    />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Location</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={text => onChangeLocationText(text)}
                        value={location} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Details</Text>
                    <TextInput
                        style={{ backgroundColor: 'lightgray', height: 100 }}
                        onChangeText={text => onChangeNotesText(text)}
                        value={notes}
                        multiline
                        numberOfLines={5} />
                </View>
            </View>
            <Button title="Save" onPress={() => checkErrors(date, time, location, notes)} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
            <View>
                {errors.location && <Text>{errors.location}</Text>}
                {errors.notes && <Text>{errors.notes}</Text>}
            </View>
        </SafeAreaView>
    )
}
