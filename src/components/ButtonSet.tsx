import React, { useState } from 'react';
import { View,Button } from 'react-native';

const ButtonSet = (params: any) => {
    const [activeChoice, setActive] = useState<any>();
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button 
                color={ activeChoice === 'yes' ? '#2E4D9E' : 'gray' } 
                title="Yes" 
                onPress={() => { params.onChange(true); setActive('yes') }}>
            </Button>
            <Button color={ activeChoice === 'no' ? '#2E4D9E' : 'gray' } 
                title="No" 
                onPress={() => { params.onChange(true); setActive('no') }}>
            </Button>
        </View>
    );
}

export default ButtonSet;

