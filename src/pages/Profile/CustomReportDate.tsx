import React from 'react';
import { Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProfileStyles from "../../styles/ProfileStyles";

export type CustomDateProps = {
    startDate: Date;
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;
    endDate: Date;
    setEndDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function CustomReportDate(props: CustomDateProps) {
    return (<View style={ProfileStyles.customDateOptions}>
        <View style={ProfileStyles.dateWithLabel}>
            <Text
                style={ProfileStyles.dateLabel}
            >
                From:
            </Text>
            <DateTimePicker
                value={props.startDate}
                dateFormat="shortdate"
                onChange={(_event, selectedDate) => {
                    const currDate = selectedDate || props.startDate;
                    currDate.setHours(0, 0, 0, 0);
                    props.setStartDate(currDate);
                }}
                style={ProfileStyles.date}
                maximumDate={props.endDate} />
        </View>
        <View style={ProfileStyles.dateWithLabel}>
            <Text
                style={ProfileStyles.dateLabel}
            >
                To:
            </Text>
            <DateTimePicker
                value={props.endDate}
                dateFormat="shortdate"
                onChange={(_event, selectedDate) => {
                    const currDate = selectedDate || props.endDate;
                    currDate.setHours(23, 59, 59, 999);
                    props.setEndDate(currDate);
                }}
                style={ProfileStyles.date}
                minimumDate={props.startDate}
                maximumDate={new Date()} />
        </View>
    </View>);
}
