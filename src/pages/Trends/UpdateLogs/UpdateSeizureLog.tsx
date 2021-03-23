import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, View } from 'react-native';
import SurveyStyles from '../../../styles/SurveyStyles';
import HistoryDao from '../../../_services/database/dao/HistoryDao';
import DateTimePicker from '@react-native-community/datetimepicker';
import calendarService from '../../../_services/helpers/calendar.service';

type Props = {
    navigation: any;
    route: any;
};

const UpdateSeizureLog = (props: Props) => {
    const seizure_id = props.route.params.seizure_id;
    const [seizureLog, setSeizureLog] = useState<any>();
    const [seizureId, setSeizureId] = useState<any>();
    const [date, setDate] = useState<any>(new Date());
    const [time, setTime] = useState<any>(new Date());
    const [location, setLocation] = useState<any>();
    const [notes, setNotes] = useState<any>();

    useEffect(() => {
        async function getSeizure() {
            let seizure: any = await HistoryDao.getSeizureLogById(seizure_id);
            setSeizureLog(seizure[0]);
            setSeizureId(seizure[0]['seizure_id']);
            setDate(new Date(seizure[0]['date']));
            const timeDate: Date = calendarService.createDateFromTime(seizure[0]['time']);
            setTime(timeDate);
            setLocation(seizure[0]['location']);
            setNotes(seizure[0]['notes']);
        }

        getSeizure();        
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

    const updateSeizure = async (seizure_id: any, date: any, time: any, location: any, notes: any) => {
        let updated = await HistoryDao.updateSeizureLog(seizure_id,date,time,location,notes);
        console.log('Updated: ', updated);
        return props.navigation.goBack();
    }

    const deleteSeizure = async (seizure_id: any) => {
        let deleted = await HistoryDao.deleteSeizureLog(seizure_id);
        console.log('Deleted: ', deleted);
        return props.navigation.goBack();
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 12 }}>
            <Text>{JSON.stringify(seizureLog)}</Text>
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
            <Button title="Save" onPress={() => updateSeizure(seizureId,date,time,location,notes)} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
            <Button title="Delete" color="red" onPress={() => deleteSeizure(seizureId)} />
        </SafeAreaView>
    )
}

export default UpdateSeizureLog;