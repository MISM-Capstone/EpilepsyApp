import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

const Chart = () => {
    return (
        <SafeAreaView>
            <Text>Chart</Text>
            <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryLine
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    data={[
                        { x: 1, y: 2 },
                        { x: 2, y: 3 },
                        { x: 3, y: 5 },
                        { x: 4, y: 4 },
                        { x: 5, y: 7 }
                    ]}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                      }}
                />
            </VictoryChart>
        </SafeAreaView>
    );
}

export default Chart;