import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SeizureHistoryDao from '../../_services/database/dao/SeizureHistoryDao';

type Props = {
    navigation: any;
};

type RenderProps = {
    log: any;
}

function RenderItem(props:RenderProps) {
    return (
        <View>
            <Text>ID: {props.log.seizure_id}</Text>
            <Text>Date: {props.log.date}</Text>
            <Text>Time: {props.log.time}</Text>
            <Text>Location: {props.log.location}</Text>
            <Text>Notes: {props.log.notes}</Text>
        </View>
    )
}

export default function SurveyHistory(props:Props) {
    const [records, setRecords] = useState<any[]>([]);

    // Similar to class based componentDidMount This will run
    // when the component first renders.
    useEffect(() => {
        (async () => {
            const results = await SeizureHistoryDao.getLogs();
            setRecords(results);
        })();
    },[]); // These square brackets define when the effect should
           // run again. If they are empty, it will only run when
           // the component renders. If you pass a state variable
           // (i.e. records) it will run each time records changes.


    return (
        <SafeAreaView>
            <FlatList 
                data={records}
                renderItem={({item}) => <RenderItem log={item} />}
                keyExtractor={(item) => item.seizure_id.toString()}
            />
        </SafeAreaView >
    )
}