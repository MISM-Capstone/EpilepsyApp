import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { VictoryLine, VictoryChart, VictoryTheme, VictoryBar } from "victory-native";
import chartsService from '../../_services/Charts/charts.service';


function Chart() {
    const [seizureData, setData] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const results = await chartsService.getChartDataDay();
            console.log(results);
            setData(results);
        })();
    }, []);

    return (
        <SafeAreaView>
            <Text>Seizures by Day of the Week</Text>
            <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryBar
                    alignment="start"
                    data={seizureData}
                    x="day"
                    y="seizures"
                    style = {{
                        data: { fill: `#44C2B3` }
                      }}/>
            </VictoryChart>
        </SafeAreaView>
    );
}

export default Chart;