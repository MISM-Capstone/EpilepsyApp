import React, { useState } from 'react';
import { View,Button } from 'react-native';
import { COLORS } from '../../constants';

const ButtonSet = (params: any) => {
    const [activeChoice, setActive] = useState<any>();
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button 
                color={ activeChoice === 'yes' ? COLORS.darkBlue : 'gray' } 
                title="Yes" 
                onPress={() => { params.onChange(true); setActive('yes') }}>
            </Button>
            <Button color={ activeChoice === 'no' ? COLORS.darkBlue : 'gray' } 
                title="No" 
                onPress={() => { params.onChange(true); setActive('no') }}>
            </Button>
        </View>
    );
}

export default ButtonSet;

