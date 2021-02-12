import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';

import RadioButton from '../../components/RadioButton';

type TrendsScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ExportReport"
>;

type Props = {
  navigation: TrendsScreenNavigationProp;
};



const dateOptions = {
    oneMonth: 1,
    twoMonths: 2,
    threeMonths: 3,
    custom: 0,
}
  
const ExportReport = (props:Props) => {
    const [dateOption, setDateOption] = useState(dateOptions.oneMonth)

    return (
        <SafeAreaView style={{ padding: 12 }}>
            <StatusBar barStyle="dark-content" />
            <View>
                <RadioButton
                    label="One Month"
                    selected={dateOption===dateOptions.oneMonth?true:false}
                    onPress={() => setDateOption(dateOptions.oneMonth)}
                />
                <RadioButton
                    label="Two Months"
                    selected={dateOption===dateOptions.twoMonths?true:false}
                    onPress={() => setDateOption(dateOptions.twoMonths)}
                />
                <RadioButton
                    label="Thee Months"
                    selected={dateOption===dateOptions.threeMonths?true:false}
                    onPress={() => setDateOption(dateOptions.threeMonths)}
                />
                <RadioButton
                    label="Custom"
                    selected={dateOption===dateOptions.custom?true:false}
                    onPress={() => setDateOption(dateOptions.custom)}
                />
            </View>
        </SafeAreaView>
    );
}

export default ExportReport;
