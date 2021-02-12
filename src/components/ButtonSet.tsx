import React, { useState } from 'react';
import { View,Button } from 'react-native';

const ButtonSet = (params: any) => {
    const [activeChoice, setActive] = useState<any>();
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button 
                color={ activeChoice === 'yes' ? 'blue' : 'gray' } 
                title="Yes" 
                onPress={() => { params.onChange(true); setActive('yes') }}>
            </Button>
            <Button color={ activeChoice === 'no' ? 'blue' : 'gray' } 
                title="No" 
                onPress={() => { params.onChange(true); setActive('no') }}>
            </Button>
        </View>
    );
}

export default ButtonSet;

