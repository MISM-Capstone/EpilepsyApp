import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { VictoryChart, VictoryTheme, VictoryBar } from "victory-native";
import chartsService from '../../_services/Charts/charts.service';


function Chart() {
    const [seizureDayData, setDayData] = useState<any[]>([]);
    const [seizureTimeData, setTimeData] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const results = await chartsService.getChartDataDay();
            console.log(results);
            setDayData(results);
        })();
        (async () => {
            const results = await chartsService.getChartDataTime();
            console.log(results);
            setTimeData(results);
        })();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>Seizures by Day of the Week</Text>
                    <VictoryChart width={350} theme={VictoryTheme.material}>
                        <VictoryBar
                            alignment="start"
                            data={seizureDayData}
                            x="day"
                            y="seizures"
                            style={{
                                data: { fill: `#44C2B3` }
                            }} />
                    </VictoryChart>
                </View>
                <View>
                    <Text>Seizures by Time of Day</Text>
                    <VictoryChart width={350} theme={VictoryTheme.material}>
                        <VictoryBar
                            alignment="start"
                            data={seizureTimeData}
                            x="hour"
                            y="seizures"
                            style={{
                                data: { fill: `#44C2B3` }
                            }} />
                    </VictoryChart>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Chart;