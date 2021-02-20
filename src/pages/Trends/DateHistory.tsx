import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import SeizureHistoryDao from '../../_services/database/dao/SeizureHistoryDao';

type Props = {
    navigation: any;
    route: any
};

type RenderProps = {
    log: any;
}

function RenderItem(props:RenderProps) {
    return (
        <View>
            <Text>ID: {props.log.seizure_id}</Text>
            <Text>Date: {props.log.date}</Text>
            <Text>Location: {props.log.location}</Text>
            <Text>Notes: {props.log.notes}</Text>
        </View>
    )
}

const DateHistory = (props: Props) => {
    const { date } = props.route.params;
    const [records, setRecords] = useState<any>();

    useEffect(() => {
        (async () => {
            const results = await SeizureHistoryDao.getLogsByDate(date.dateString);
            setRecords(results);
        })();
    },[]);
    
    return(
        <View>
            <Text>History from this day:</Text>
            <View>
            <FlatList 
                data={records}
                renderItem={({item}) => <RenderItem log={item} />}
                keyExtractor={(item) => item.seizure_id.toString()}
            />
            </View>
        </View>
    )
}

export default DateHistory;