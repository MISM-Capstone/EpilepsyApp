import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { captureRef } from "react-native-view-shot";

import { ProfileStackParamList } from '../../navigation/ProfileNavigation';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import chartsService from '../../_services/Charts/charts.service';
import Loader from '../../components/Loader';
import PDF from "./PDF";
import { COLORS } from '../../constants';

type GenerateReportScreenNavigationProp = StackNavigationProp<
    ProfileStackParamList,
    "GenerateReport"
>;

type GenerateReportScreenRouteProp = RouteProp<
    ProfileStackParamList,
    "GenerateReport"
>;

export type GenerateReportProps = {
    route: GenerateReportScreenRouteProp;
    navigation: GenerateReportScreenNavigationProp;
};


type demo = {
    seizureDayData:any[];
}

const GenerateReport = (props:GenerateReportProps) => {
    const [state, setState] = useState<demo>({seizureDayData:[]});
    const graphRef = useRef<any>(null);
    const rendered = useRef(false);
    const loadedData = useRef(false);
    const generatingPDF = useRef(false);
    const wasShown = useRef(false);
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
                const pdfURI = await PDF.generatePDF(startDate, endDate, imageLinks);
                PDF.displayPDF(wasShown, pdfURI, props);
            }
        })();
    
    },[graphRef.current]);

    return (
        <View>
            <Loader isLoading={!wasShown.current} />
            <View
                ref={graphRef}
                style={{ position: "absolute", left: 3000, top: 0}}
            >
                <Text>Seizures by Day of the Week</Text>
                <VictoryChart width={560} theme={VictoryTheme.material} domainPadding={45}>
                    <VictoryBar
                        data={state.seizureDayData}
                        x="day"
                        y="seizures"
                        barWidth={50}
                        style={{
                            data: { fill: COLORS.darkBlue }
                        }} />
                </VictoryChart>
            </View>
        </View>
    );
}

export default GenerateReport;


