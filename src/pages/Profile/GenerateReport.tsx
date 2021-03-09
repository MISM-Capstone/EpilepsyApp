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

type GenerateReportScreenNavigationProp = StackNavigationProp<
    ProfileStackParamList,
    "GenerateReport"
>;

type GenerateReportScreenRouteProp = RouteProp<
    ProfileStackParamList,
    "GenerateReport"
>;

type Props = {
    route: GenerateReportScreenRouteProp;
    navigation: GenerateReportScreenNavigationProp;
};


type demo = {
    seizureDayData:any[];
}

const GenerateReport = (props:Props) => {
    const [state, setState] = useState<demo>({seizureDayData:[]});
    const graphRef = useRef<any>(null);
    const rendered = useRef(false);
    const startDate = new Date(props.route.params.start);
    const endDate = new Date(props.route.params.end);

    let capture = async () => {
        let result = await captureRef(graphRef.current, {
            format: "jpg",
            quality: 1,
        })
        return result;
    }

    useEffect(() => {
        (async () => {
            const results = await chartsService.getChartDataDay();
            setState({
                seizureDayData: results
            });
        })();
    },[]);

    useEffect(() => {
        
        (async () => {
            let imageLink = "";
            if (graphRef.current && !rendered.current) {
                imageLink = await capture();
                rendered.current = true;
            }
            if (rendered.current) {
                const pdf = await getHTMLToConvert(startDate, endDate, imageLink);
                props.navigation.navigate(
                    "ViewReport",
                    {pdf}
                );
            }
        })();
    
    },[graphRef.current]);

    return (
        <View>
            <View
                ref={(ref) => {
                    if (!graphRef.current) {
                        graphRef.current = ref;
                    }
                }}
                style={{ position: "absolute", left: 3000, top: 0}}
            >
                <Text>Seizures by Day of the Week</Text>
                <VictoryChart width={560} theme={VictoryTheme.material} domainPadding={14}>
                    <VictoryBar
                        data={state.seizureDayData}
                        x="day"
                        y="seizures"
                        style={{
                            data: { fill: `#44C2B3` }
                        }} />
                </VictoryChart>
            </View>
        </View>
    );
}

export default GenerateReport;
