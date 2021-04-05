import React, { useEffect, useState } from 'react';

import { Text, View, Button } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeOptions, HomeStackParamList } from "../../navigation/Home/HomeNavProps";
import SeizureLogDao from '../../_services/database/dao/SeizureLogDao';
import SeizureLog, { SeizureLogDb } from '../../models/SeizureLog';
import { CopyAndSetKey, returnToPreviousPage } from '../../functions';
import { GetAuthContext } from '../../_services/Providers/AuthProvider';
import Location from '../../models/Location';
import { RouteProp } from '@react-navigation/native';
import LocationDao from '../../_services/database/dao/LocationDao';
import { InputContainer } from '../../components/Inputs/InputComponents';
import { MultiInput } from '../../components/Inputs/Input';
import { TrendOptions, TrendsStackParamList } from "../../navigation/Trends/TrendsNavProps";
import { TabOptions } from "../../components/TabOptions";
import { GetUpdateContext } from '../../_services/Providers/UpdateProvider';
import RNPickerSelect from 'react-native-picker-select';
import PickerStyles from '../../styles/PickerStyles';
import { PickerItem } from '../../models/PickerItem';

type HomeNavProp = StackNavigationProp<HomeStackParamList, HomeOptions.LogSeizure>;
type HomeRouteProp = RouteProp<HomeStackParamList, HomeOptions.LogSeizure>;

type TrendNavProp = StackNavigationProp<TrendsStackParamList, TrendOptions.UpdateSeizureLog>;
type TrendRouteProp = RouteProp<TrendsStackParamList, TrendOptions.UpdateSeizureLog>;

type Props = {
    navigation: HomeNavProp | TrendNavProp;
    route: HomeRouteProp | TrendRouteProp;
};

type ErrorObject = {
    location?: string;
    notes?: string;
}

export default function AddEditSeizureLog(props: Props) {
    const {user} = GetAuthContext();
    const updateContext = GetUpdateContext();
    const [seizureLog, setSeizureLog] = useState(new SeizureLog(user!.id!));
    const [locations, setLocations] = useState<Location[]>([]);
    const [locationsAsItems, setLocationsAsItems] = useState<PickerItem[]>([]);
    const id = props.route.params.id;

    useEffect(() => {
        (async () => {
            if (id) {
                const foundSeizure = await SeizureLogDao.getById(id);
                if (foundSeizure) {
                    setSeizureLog(foundSeizure);
                }
            }
        })();
    }, [id]);

    function updateValue(key:keyof SeizureLog, value:any){
        const seizLog = CopyAndSetKey(seizureLog, key, value);
        setSeizureLog(seizLog);
    }
    async function getLocations() {
        const locs = await LocationDao.getAll();
        const currentLocation = locs.find((loc) => {
            return loc.id === seizureLog.location_id;
        });
        if (locs.length > 0 && !currentLocation && seizureLog.location_id === 0) {
            updateValue(SeizureLogDb.fields.location_id, locs[0].id)
        }
        setLocations(locs);

        const locationsAsItems: PickerItem[] = new Array<PickerItem>();
        locs.forEach((loc: Location) => {
            let locAsItem: PickerItem = {
                label: loc.name,
                value: loc.id,
            }
            locationsAsItems.push(locAsItem)
        });
        setLocationsAsItems(locationsAsItems);
    }
    
    const errors: ErrorObject = {};

    useEffect(() => {
        if (props.route.params.tab === TabOptions.home && props.route.params.date) {
            // TODO - Figure out what object type date is
            let date: any = props.route.params.date;
            let paramDate = new Date(date.dateString.replace(/-/g, '\/'));
            updateValue(SeizureLogDb.fields.date, paramDate);
        }
    }, []);

    useEffect(() => {
        if (!id || id === seizureLog.id) {
            getLocations();
        }
    }, [seizureLog.location_id]);

    useEffect(() => {
        const updatedObj = updateContext.getUpdatedObjbyType(props.route.name, Location);
        if (updatedObj) {
            updateValue(SeizureLogDb.fields.location_id, updatedObj.id);
        }
    }, [updateContext.hasObject]);

    const onChangeDate = (_event: Event, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || seizureLog.date;
        updateValue(SeizureLogDb.fields.date, currentDate);
    };

    const onChangeTime = (_event: Event, selectedDate: Date | undefined) => {
        const currentTime = selectedDate || seizureLog.date;
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

        if (Object.keys(errors).length == 0) {
            insertQuery();
        }
    }

    const insertQuery = async () => {
        let results = await SeizureLogDao.save(seizureLog);
        if (results) {
            returnToPreviousPage(
                seizureLog,
                results,
                updateContext,
                props.navigation.goBack
            );
        }
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
                    
                    {
                        locations.length ?
                            <View style={{marginVertical: 4}}>
                                <RNPickerSelect
                                    onValueChange={(itemValue) => {
                                        updateValue(SeizureLogDb.fields.location_id, itemValue);
                                    }}
                                    items={locationsAsItems}
                                    style={PickerStyles}
                                />
                            </View>
                        :
                            <Text>Please Add a Location</Text>
                    }
                    <Button title="Add Location" onPress={() => {
                        updateContext.setPageToUpdate(props.route.name);
                        if (props.route.params.tab ===  TabOptions.home) {
                            const nav = props.navigation as HomeNavProp;
                            nav.navigate(HomeOptions.AddLocation, {tab:TabOptions.home});
                        } else {
                            const nav = props.navigation as TrendNavProp;
                            nav.navigate(TrendOptions.UpdateLocation, {tab:TabOptions.trends});
                        }
                    }} />
                    
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
