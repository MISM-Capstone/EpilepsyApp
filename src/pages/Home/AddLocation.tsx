import React, { useState } from 'react';

import { View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import { CopyAndSetKey } from '../../functions';
import Location, { LocationDb } from '../../models/Location';
import { RouteProp } from '@react-navigation/native';
import LocationDao from '../../_services/database/dao/LocationDao';
import { MultiInput, SingleInput } from '../../components/Inputs/Input';

type LocationScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'AddLocation'>;
type LocationScreenRouteProp = RouteProp<HomeStackParamList, 'AddLocation'>;

type Props = {
    navigation: LocationScreenNavigationProp;
    route: LocationScreenRouteProp;
};


export default function AddLocation(props: Props) {
    const [location, setLocation] = useState(new Location());

    function updateValue(key:keyof Location, value:any){
        const loc = CopyAndSetKey(location, key, value);
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
            if (props.route.params.previousPage) {
                props.navigation.navigate(props.route.params.previousPage, {location_id:results.insertId});
            } else {
                props.navigation.goBack();
            }
        }
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 12 }}>
                <SingleInput
                    title="Name"
                    onChange={(value) => {
                        updateValue(LocationDb.fields.name, value);
                    }}
                    value={location.name}
                />
                <MultiInput
                    title="Description"
                    onChange={(value) => {
                        updateValue(LocationDb.fields.description, value);
                    }}
                    value={location.description}
                />
            </View>
            <Button title="Save" onPress={() => checkErrors()} />
            <Button title="Cancel" onPress={props.navigation.goBack} />
        </SafeAreaView>
    )
}
