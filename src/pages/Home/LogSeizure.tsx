import React, { useState, Component, useEffect } from 'react';

import { Text, View, Button, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import SQLite from 'react-native-sqlite-storage';
import LogSeizureDao from '../../_services/database/dao/LogSeizureDao';

type LogSeizureScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'LogSeizure'>;

type Props = {
    navigation: LogSeizureScreenNavigationProp;
};
type StateTypes = {
    date: Date,
    location: string,
    notes: string
}

export default function LogSeizure(props: Props) {
    const [date, setDate] = useState<any>(new Date());
    const [location, setLocation] = useState<string>();
    const [notes, setNotes] = useState<string>();

    const onChange = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const onChangeLocationText = (text: string) => {
        setLocation(text);
    }

    const onChangeNotesText = (text: string) => {
        setNotes(text);
    }

    const insertQuery = async (date: Date, location: string | any, notes: string | any) => {
        let results = await LogSeizureDao.insertSeizure(date,location,notes);
        console.log('inserted: ',results);
        props.navigation.goBack();
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 12 }}>
                <Text>Date of Seizure</Text>
                <DateTimePicker
                    testID="datePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
                <Text>Time of Seizure</Text>
                <Text>Location</Text>
                <TextInput
                    style={{ height: 40, backgroundColor: 'lightgray' }}
                    onChangeText={text => onChangeLocationText(text)}
                    value={location} />
                <Text>Details</Text>
                <TextInput
                    style={{ backgroundColor: 'lightgray', height: 100 }}
                    onChangeText={text => onChangeNotesText(text)}
                    value={notes}
                    multiline
                    numberOfLines={5} />
            </View>
            <Button title="Save" onPress={() => insertQuery(date, location, notes)} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}
