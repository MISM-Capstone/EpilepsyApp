import React, { useEffect, useState } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation";
import SeizureLogDao from '../../_services/database/dao/SeizureLogDao';
import SeizureLog, { SeizureLogDb } from '../../models/SeizureLog';
import { CopyAndSetKey } from '../../functions';
import { GetAuthContext } from '../../_services/Providers/AuthProvider';
import {Picker} from '@react-native-picker/picker';
import Location from '../../models/Location';
import { RouteProp } from '@react-navigation/native';
import LocationDao from '../../_services/database/dao/LocationDao';
import { InputContainer } from '../../components/Inputs/InputComponents';
import { MultiInput } from '../../components/Inputs/Input';

type LogSeizureScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'LogSeizure'>;
type LogSeizureScreenRouteProp = RouteProp<HomeStackParamList, 'LogSeizure'>;

type Props = {
    navigation: LogSeizureScreenNavigationProp;
    route: LogSeizureScreenRouteProp;
};

type ErrorObject = {
    location?: string;
    notes?: string;
}

export default function LogSeizure(props: Props) {
    const {user} = GetAuthContext();
    const [seizureLog, setSeizureLog] = useState(new SeizureLog(user!.id!));
    const [locations, setLocations] = useState<Location[]>([]);

    function updateValue(key:keyof SeizureLog, value:any){
        const seizLog = CopyAndSetKey(seizureLog, key, value);
        setSeizureLog(seizLog);
    }
    
    const errors: ErrorObject = {};

    useEffect(() => {
        if (props.route.params && props.route.params.date) {
            // TODO - Figure out what object type date is
            let date: any = props.route.params.date;
            let paramDate = new Date(date.dateString.replace(/-/g, '\/'));
            updateValue(SeizureLogDb.fields.date, paramDate);
        }
    }, []);

    useEffect(() => {
        if (props.route.params.location_id) {
            updateValue(SeizureLogDb.fields.location_id, props.route.params.location_id);
        }
        (async () => {
            const locs = await LocationDao.getAll();
            const currentLocation = locs.find((loc) => {
                return loc.id === seizureLog.location_id;
            });
            if (locs.length > 0 && !currentLocation && seizureLog.location_id === 0) {
                updateValue(SeizureLogDb.fields.location_id, locs[0].id)
            }
            setLocations(locs);
        })();
    }, [props.route.params.location_id]);

    const onChangeDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || seizureLog.date;
        updateValue(SeizureLogDb.fields.date, currentDate);
    };

    const onChangeTime = (_event: Event, selectedDate: Date | undefined) => {
        const currentTime = selectedDate || seizureLog.date;
        console.log(selectedDate);
        updateValue(SeizureLogDb.fields.time, currentTime.toLocaleTimeString());
        updateValue(SeizureLogDb.fields.date, currentTime);
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
        (seizureLog.location_id && seizureLog.location_id === 0) ? errors.location = "Please Add a Location." : null;
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
                <InputContainer title="Date of Seizure">
                    <DateTimePicker
                        testID="datePicker"
                        value={seizureLog.date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                        maximumDate={new Date()}
                    />
                </InputContainer>
                <InputContainer title="Time of Seizure">
                    <DateTimePicker
                        testID="timePicker"
                        value={seizureLog.date}
                        mode="time"
                        display="default"
                        onChange={onChangeTime}
                    />
                </InputContainer>
                <InputContainer title="Location">
                    <Button title="Add Location" onPress={() => {
                        props.navigation.navigate("AddLocation", {previousPage:"LogSeizure"})
                    }} />
                    {
                        locations.length ?
                            <Picker
                                selectedValue={seizureLog.location_id}
                                onValueChange={(itemValue, itemIndex) => {
                                    updateValue(SeizureLogDb.fields.location_id, itemValue);
                            }}>
                                {
                                    locations.map((location) => {
                                        return <Picker.Item key={location.id} label={location.name} value={location.id!} />
                                    })
                                }
                            </Picker>
                        :
                            <Text>Please Add a Location</Text>
                    }
                    
                </InputContainer>
                <MultiInput
                    title="Details"
                    onChange={(value) => {
                        updateValue(SeizureLogDb.fields.notes, value);
                    }}
                    value={seizureLog.notes}
                />
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
