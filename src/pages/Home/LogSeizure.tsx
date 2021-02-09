 import React, { useState, Component } from 'react';

import { Text, View, Button, Platform } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import SQLite from 'react-native-sqlite-storage';
import { not } from 'react-native-reanimated';

type LogSeizureScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'LogSeizure'>;

type Props = {
    navigation: LogSeizureScreenNavigationProp;
};
type StateTypes = {
    date: Date,
    location: string,
    notes: string
}

export default class LogSeizure extends React.Component<Props, StateTypes> {
    constructor(props: Props) {
        super(props);
        this.state = {
            date: new Date(),
            location: '',
            notes: ''
        }

        let db = SQLite.openDatabase({
            name: 'epilepsy.db',
            location: 'Library',
            createFromLocation: '~epilepsy.db'
        },
            () => { console.log('DB success') },
            error => {
                console.log("ERROR: " + error);
            }
        );
    }

    /**
     * Execute sql queries
     * 
     * @param sql
     * @param params
     * 
     * @returns {resolve} results
     */
    ExecuteQuery = (sql: string, params: [Date, string, string]) => new Promise((resolve, reject) => {
        db.executeSql(sql, params, (_, results) => {
            resolve(results);
            this.props.navigation.goBack;
        },
            (error) => {
                reject(error);
            });
    });

    async insertQuery(date: Date, location: string, notes: string) {
        console.log('inserting with: ', date, location, notes)
        let insert = await this.ExecuteQuery('INSERT INTO seizure_log (date, location, notes) VALUES (?,?,?);', [date, location, notes])
        console.log('insert: ', insert);
    }

    onChangeLocationText = (text: string) => {
        this.setState({
            location: text,
        })
    }

    onChangeNotesText = (text: string) => {
        this.setState({
            notes: text,
        })
    }

    onChange = (_event: any, selectedDate: any) => {
        const currentDate = selectedDate
        this.setState({
            date: currentDate
        })
    };

    render() {
        const date = this.state;

        return (
            <SafeAreaView>
                <View style={{ padding: 12 }}>
                    <Text>Date of Seizure</Text>
                    <DateTimePicker
                        testID="datePicker"
                        value={this.state.date}
                        mode="date"
                        display="default"
                        onChange={this.onChange}
                    />
                    <Text>Time of Seizure</Text>
                    <Text>Location</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={text => this.onChangeLocationText(text)}
                        value={this.state.location} />
                    <Text>Details</Text>
                    <TextInput
                        style={{ backgroundColor: 'lightgray', height: 100 }}
                        onChangeText={text => this.onChangeNotesText(text)}
                        value={this.state.notes}
                        multiline
                        numberOfLines={5} />
                </View>
                <Button title="Save" onPress={() => this.insertQuery(this.state.date, this.state.location, this.state.notes)} />
                <Button title="Cancel" onPress={this.props.navigation.goBack} />
            </SafeAreaView>
        )
    }
}
