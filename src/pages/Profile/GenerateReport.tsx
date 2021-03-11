import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { captureRef } from "react-native-view-shot";

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import chartsService from '../../_services/Charts/charts.service';
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
    const loadedData = useRef(false);
    const generatingPDF = useRef(false);
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
            const results = await chartsService.getChartDataDayInRange(startDate, endDate);
            setState({
                seizureDayData: results
            });
            loadedData.current = true;
        })();
    },[]);

    useEffect(() => {
        
        (async () => {
            let imageLinks:string[] = [];
            if (graphRef.current && loadedData.current && !rendered.current) {
                const imageLink = await capture();
                imageLinks.push(imageLink);
                rendered.current = true;
            }
            if (rendered.current && !generatingPDF.current) {
                generatingPDF.current = true;
                const pdf = await getHTMLToConvert(startDate, endDate, imageLinks);
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
                ref={graphRef}
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
