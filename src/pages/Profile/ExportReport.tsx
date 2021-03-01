import React, { useState } from 'react';
import { Button, Pressable, StatusBar, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';
import ProfileStyles from "../../styles/ProfileStyles";

import RadioButton from '../../components/RadioButton';

type ExportScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ExportReport"
>;

type Props = {
  navigation: ExportScreenNavigationProp;
};

const dateOptions = {
    oneMonth: 1,
    twoMonths: 2,
    threeMonths: 3,
    custom: 0,
}

function GetMonthsBeforeDate(numberOfMonths:number) {
    let date = new Date();
    const month = date.getMonth();
    date.setMonth(date.getMonth() - numberOfMonths);
    while (date.getMonth() === (month + 1 - numberOfMonths)) {
        date.setDate(date.getDate() - 1);
    }
    date.setHours(0,0,0,0);
    return date;
}
  
const ExportReport = (props:Props) => {
    let start = GetMonthsBeforeDate(dateOptions.oneMonth);
    let today = new Date();
    today.setHours(23, 59, 59, 999);
    const [dateOption, setDateOption] = useState(dateOptions.oneMonth);
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(today);

    console.log(startDate)
    console.log(endDate)

    function onPress(numberOfMonths:number) {
        setDateOption(numberOfMonths);
        setStartDate(GetMonthsBeforeDate(numberOfMonths));
        setEndDate(today);
    }

    return (
        <SafeAreaView style={{ padding: 12 }}>
            <StatusBar barStyle="dark-content" />
            <View>
                <RadioButton
                    label="One Month"
                    selected={dateOption===dateOptions.oneMonth?true:false}
                    onPress={() => {
                        onPress(dateOptions.oneMonth);
                    }}
                />
                <RadioButton
                    label="Two Months"
                    selected={dateOption===dateOptions.twoMonths?true:false}
                    onPress={() => {
                        onPress(dateOptions.twoMonths);
                    }}
                />
                <RadioButton
                    label="Thee Months"
                    selected={dateOption===dateOptions.threeMonths?true:false}
                    onPress={() => {
                        onPress(dateOptions.threeMonths);
                    }}
                />
                <RadioButton
                    label="Custom"
                    selected={dateOption===dateOptions.custom?true:false}
                    onPress={() => {
                        setDateOption(dateOptions.custom);
                    }}
                />
            </View>
            {
                dateOption===dateOptions.custom ? (
                    <View style={ProfileStyles.customDateOptions}>
                        <View style={ProfileStyles.dateWithLabel}>
                            <Text
                                style={ProfileStyles.dateLabel}
                            >
                                From:
                            </Text>
                            <DateTimePicker
                                value={startDate}
                                dateFormat="shortdate"
                                onChange={(_event, selectedDate) => {
                                    const currDate = selectedDate || startDate;
                                    currDate.setHours(0,0,0,0);
                                    setStartDate(currDate);
                                }}
                                style={ProfileStyles.date}
                            />
                        </View>
                        <View style={ProfileStyles.dateWithLabel}>
                            <Text
                                style={ProfileStyles.dateLabel}
                            >
                                To:
                            </Text>
                            <DateTimePicker
                                value={endDate}
                                dateFormat="shortdate"
                                onChange={(_event, selectedDate) => {
                                    const currDate = selectedDate || endDate;
                                    currDate.setHours(23,59,59,999);
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
            <Button
                title="Cancel"
                onPress={props.navigation.goBack}
            />
            <Button
                title="Create Report"
                onPress={() => {
                    props.navigation.navigate(
                        "ViewReport",
                        {start: startDate.getTime(), end: endDate.getTime()}
                    );
                }}
            />
        </SafeAreaView>
    );
}

export default ExportReport;
