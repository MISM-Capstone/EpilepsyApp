import React, { Component, useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation"
import { STORAGE_KEYS } from '../../constants';
import SQLite from 'react-native-sqlite-storage';

type Props = {
    navigation: any;
};
type StateTypes = {
    record: any
}

export default class SurveyHistory extends React.Component<Props, StateTypes> {
    constructor(props: Props | Readonly<Props>) {
        super(props)
    
        this.state = {
          record: null
        }
    
        let db = SQLite.openDatabase({
            name: 'epilepsy.db',
            location: 'default',
            createFromLocation: 1
        },
            () => { console.log('DB success') },
            error => {
                console.log("ERROR: " + error);
            }
        );

        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM seizure_log', [], (tx, results) => {
              console.log("Query completed");
    
              // Get rows with Web SQL Database spec compliance.
    
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(`Record: ${row.name}`);
                this.setState({record: row});
              }
            });
        });
    
      }


    render() {
        return (
            <SafeAreaView>
                <View style={{ padding: 12 }}>
                    <Text>Survey History</Text>
                    <Text>
                        {this.state.record !== null ? 'Success: ' + this.state.record.name : 'Waiting...'}
                    </Text>
                </View>
            </SafeAreaView >
        )
    }
}