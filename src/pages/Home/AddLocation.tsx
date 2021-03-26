import React, { useState } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import SurveyStyles from '../../styles/SurveyStyles';
import { CopyAndSetKey } from '../../functions';
import Location, { LocationDb } from '../../models/Location';
import { RouteProp } from '@react-navigation/native';
import LocationDao from '../../_services/database/dao/LocationDao';

type LocationScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'AddLocation'>;
type LocationScreenRouteProp = RouteProp<HomeStackParamList, 'AddLocation'>;

type Props = {
    navigation: LocationScreenNavigationProp;
    route: LocationScreenRouteProp;
};


export default function AddLocation(props: Props) {
    const [location, setLocation] = useState(new Location());

    function updateValue(key:string, value:any){
        const loc = CopyAndSetKey(location, key, value) as Location;
        setLocation(loc);
    }

    // TODO: find way for errors to be displayed
    const checkErrors = () => {
        insertQuery();
    }

    const insertQuery = async () => {
        let results = await LocationDao.insert(location);
        if (results) {
            console.log('inserted: ', results);
            props.navigation.navigate("LogSeizure", {location_id:results.insertId});
        }
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 12 }}>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Name</Text>
                    <TextInput
                        style={{ height: 40, backgroundColor: 'lightgray' }}
                        onChangeText={(value) => {
                            updateValue(LocationDb.fields.name, value);
                        }}
                        value={location.name} />
                </View>
                <View style={SurveyStyles.questionSection}>
                    <Text style={SurveyStyles.questionHeading}>Description</Text>
                    <TextInput
                        style={{ backgroundColor: 'lightgray', height: 100 }}
                        onChangeText={(value) => {
                            updateValue(LocationDb.fields.description, value);
                        }}
                        value={location.description}
                        multiline
                        numberOfLines={5} />
                </View>
            </View>
            <Button title="Save" onPress={() => checkErrors()} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}
