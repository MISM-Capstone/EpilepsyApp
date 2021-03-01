import React, { useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';

type ViewReportScreenNavigationProp = StackNavigationProp<
    ProfileStackParamList,
    "ViewReport"
>;

type ViewReportScreenRouteProp = RouteProp<
    ProfileStackParamList,
    "ViewReport"
>;

type Props = {
    route: ViewReportScreenRouteProp;
    navigation: ViewReportScreenNavigationProp;
};

  
const ViewReport = (props:Props) => {
    console.log("View the report ------------------------")
    console.log(new Date(props.route.params.start))
    console.log(new Date(props.route.params.end))
    return (
        <SafeAreaView style={{ padding: 12 }}>
            <StatusBar barStyle="dark-content" />
            <View>
                <Text>View Report</Text>
            </View>
        </SafeAreaView>
    );
}

export default ViewReport;
