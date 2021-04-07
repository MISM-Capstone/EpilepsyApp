import React, { useState } from 'react';

import { View, Button, Text } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeOptions, HomeStackParamList } from "../../navigation/Home/HomeNavProps";
import { CopyAndSetKey, returnToPreviousPage } from '../../functions';
import Location, { LocationDb } from '../../models/Location';
import { RouteProp } from '@react-navigation/native';
import LocationDao from '../../_services/database/dao/LocationDao';
import { MultiInput, SingleInput } from '../../components/Inputs/Input';
import { GetUpdateContext } from '../../_services/Providers/UpdateProvider';
import { TrendOptions, TrendsStackParamList } from '../../navigation/Trends/TrendsNavProps';

type HomeNavProp = StackNavigationProp<HomeStackParamList, HomeOptions.AddLocation>;
type HomeRouteProp = RouteProp<HomeStackParamList, HomeOptions.AddLocation>;

type trendNavProp = StackNavigationProp<TrendsStackParamList, TrendOptions.UpdateLocation>;
type trendRouteProp = RouteProp<TrendsStackParamList, TrendOptions.UpdateLocation>;

type Props = {
    navigation: HomeNavProp | trendNavProp;
    route: HomeRouteProp | trendRouteProp;
};


export default function AddLocation(props: Props) {
    const updateContext = GetUpdateContext();
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
        let results = await LocationDao.save(location);
        if (results) {
            returnToPreviousPage(
                location,
                results,
                updateContext,
                props.navigation.goBack
            );
        }
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 12 }}>
                <Text style={{fontStyle: 'italic', color: '#555'}}>Add a location for tracking where your seizures occur. For example home, work, or school.</Text>
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

