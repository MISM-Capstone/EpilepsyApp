import React, { useState } from 'react';

import { Text, View, Button, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../navigation/HomeNavigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

type LogSeizureScreenNavigationProp = StackNavigationProp<HomeStackParamList,'LogSeizure'>;

type Props = {
  navigation: LogSeizureScreenNavigationProp;
};


export default function LogSeizure(props:Props) {
    const [date, changeDate] = useState<Date>(new Date(Date.now()));
    const [time, changeTime] = useState(new Date(Date.now()));
    const [locationText, onChangeLocationText] = useState('');
    const [detailsText, onChangeDetailsText] = useState('');

    const storeData = async () => {
        try {
            var arr = {"Date": date, "Time": time, "Location": locationText, "Details": detailsText};
            var json = JSON.stringify(arr);
            console.log(json);
            await AsyncStorage.setItem(STORAGE_KEYS.survey, json);
        } catch (e) {
            console.error(e);
        } finally {
            props.navigation.navigate("Home")
        }
    }

    const navigateBack = () => {
        props.navigation.navigate("Home")
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
                    onChange={() => changeDate}
                />
                <Text>Time of Seizure</Text>
                <DateTimePicker
                    testID="timePicker"
                    value={time}
                    mode="time"
                    display="default"
                    onChange={() => changeTime}
                />
                <Text>Location</Text>
                <TextInput
                    style={{ height: 40, backgroundColor: 'lightgray' }}
                    onChangeText={text => onChangeLocationText(text)}
                    value={locationText} />
                <Text>Details</Text>
                <TextInput
                    style={{ backgroundColor: 'lightgray', height: 100 }}
                    onChangeText={text => onChangeDetailsText(text)}
                    value={detailsText}
                    multiline
                    numberOfLines={5} />
            </View>
            <Button title="Save" onPress={() => storeData()} />
            <Button title="Cancel" onPress={navigateBack} />
        </SafeAreaView>
    )
}
