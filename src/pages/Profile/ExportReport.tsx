import React, { useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';
import ProfileStyles from "../../styles/ProfileStyles";

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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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
            {dateOption===dateOptions.custom ? (
                <View>
                    <View style={ProfileStyles.dateWithLabel}>
                        <Text>From:</Text>
                        <DateTimePicker
                            value={startDate}
                            onChange={(_event, selectedDate) => {
                                const currDate = selectedDate || startDate;
                                setStartDate(currDate);
                            }}
                            style={ProfileStyles.date}
                        />
                    </View>
                    <View style={ProfileStyles.dateWithLabel}>
                        <Text>To:</Text>
                        <DateTimePicker
                            value={endDate}
                            onChange={(_event, selectedDate) => {
                                const currDate = selectedDate || endDate;
                                setEndDate(currDate);
                            }}
                            style={ProfileStyles.date}
                        />
                    </View>
                </View>
            ) : (
                null
            )
            }
        </SafeAreaView>
    );
}

export default ExportReport;
