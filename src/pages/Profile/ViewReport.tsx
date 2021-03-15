import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommonActions, RouteProp } from '@react-navigation/native';
import { captureRef } from "react-native-view-shot";
import Pdf from 'react-native-pdf';

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';
import { VictoryBar, VictoryChart, VictoryContainer, VictoryLine, VictoryTheme } from 'victory-native';
import chartsService from '../../_services/Charts/charts.service';
import { ScrollView } from 'react-native-gesture-handler';
import { getHTMLToConvert } from './getHTMLToConvert';

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
    useEffect(() => {
        const unsubscribe = props.navigation.addListener("transitionEnd", () => {
            props.navigation.dispatch(state => {
                const routes = state.routes.filter(r => r.name !== "GenerateReport");
                return CommonActions.reset({
                    ...state,
                    routes,
                    index: routes.length - 1,
                });
            });
        });
        return unsubscribe
    },[]);
    return (
        <ScrollView>
            <View style={styles.container}>
                <Pdf
                    source={props.route.params.pdf}
                    // onLoadComplete={(numberOfPages,filePath)=>{
                    //     console.log(`number of pages: ${numberOfPages}`);
                    // }}
                    // onPageChanged={(page,numberOfPages)=>{
                    //     console.log(`current page: ${page}`);
                    // }}
                    // onError={(error)=>{
                    //     console.log(error);
                    // }}
                    // onPressLink={(uri)=>{
                    //     console.log(`Link press: ${uri}`)
                    // }}
                    style={styles.pdf}
                />
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});
export default ViewReport;

