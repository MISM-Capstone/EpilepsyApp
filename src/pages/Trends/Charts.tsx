import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { VictoryChart, VictoryTheme, VictoryBar } from "victory-native";
import MainStyles from '../../styles/MainStyles';
import chartsService from '../../_services/Charts/charts.service';


function Charts() {
    const [seizureDayData, setDayData] = useState<any>([]);
    const [seizureTimeData, setTimeData] = useState<any>([]);

    useEffect(() => {
        (async () => {
            const results = await chartsService.getChartDataDay();
            setDayData(results);
        })();
        (async () => {
            const results = await chartsService.getChartDataTime();
            setTimeData(results);
        })();
    }, []);

    return (
        <SafeAreaView style={{ paddingHorizontal: 12 }}>
            <ScrollView>
                <Text style={MainStyles.subheadingStyle}>Seizures by Day of the Week</Text>
                {seizureDayData.numSeizures > 0 ?
                    <View>
                        <VictoryChart width={350} theme={VictoryTheme.material}>
                            <VictoryBar
                                alignment="start"
                                data={seizureDayData.data}
                                x="day"
                                y="seizures"
                                style={{
                                    data: { fill: `#44C2B3` }
                                }} />
                        </VictoryChart>
                    </View>
                    :
                    <View>
                        <Text>No seizure events recorded.</Text>
                    </View>
                }
                <Text style={MainStyles.subheadingStyle}>Seizures by Time of Day</Text>
                {seizureTimeData.numSeizures > 0 ?
                    <View>
                        <VictoryChart width={350} theme={VictoryTheme.material}>
                            <VictoryBar
                                alignment="start"
                                data={seizureTimeData.data}
                                x="hour"
                                y="seizures"
                                style={{
                                    data: { fill: `#44C2B3` }
                                }} />
                        </VictoryChart>
                    </View>
                    :
                    <View>
                        <Text>No seizures events recorded.</Text>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

export default Charts;