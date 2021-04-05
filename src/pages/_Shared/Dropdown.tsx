import React from 'react';
import {View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = (props: any) => {
    return (
        <View>
            <RNPickerSelect
                onValueChange={(itemValue) => {
                    updateValue(SeizureLogDb.fields.location_id, itemValue);
                }}
                items={props.location}
             />

            
        </View>
    )
}

export default Dropdown;