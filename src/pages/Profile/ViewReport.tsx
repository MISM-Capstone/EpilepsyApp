import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
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


type demo = {
    pdf:object|null;
    seizureDayData:any[];
}

const ViewReport = (props:Props) => {
    const [state, setState] = useState<demo>({pdf:null, seizureDayData:[]});
    const test = useRef<any>(null);
    const startDate = new Date(props.route.params.start);
    const endDate = new Date(props.route.params.end);
    useEffect(() => {
        (async () => {
            if (!state.pdf) {
                const results = await chartsService.getChartDataDay();
                const source = await getHTMLToConvert(startDate, endDate);
                setState({
                    pdf: source,
                    seizureDayData: results
                });

            }
        })();
    
    },[test.current]);

    return (
        <ScrollView>
            <View style={styles.container}>
                <VictoryChart
                    containerComponent={
                        <VictoryContainer
                            containerRef={(ref) => {
                                if (!test.current) {
                                    test.current = ref
                                    setTimeout(() => {
                                        console.log("_*_*_*_*_*_*_*_**_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_**")
                                        console.log(test.current?"It has a ref %%":"%% NO REF")
                                        if (test.current) {
                                            console.log(test.current.querySelector);
                                        }
                                    }, 500);
                                }
                                
                            }}
                        />
                    }
                >
                <VictoryLine/>
                </VictoryChart>
                <Text>Seizures by Day of the Week</Text>
                <VictoryChart width={350} theme={VictoryTheme.material}>
                    <VictoryBar
                        alignment="start"
                        data={state.seizureDayData}
                        x="day"
                        y="seizures"
                        style={{
                            data: { fill: `#44C2B3` }
                        }} />
                </VictoryChart>
                {state.pdf?
                <Pdf
                    source={state.pdf}
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
                />:
                <Text>Loading</Text>}
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

