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

function RenderItem(props: RenderProps) {
    return (
        <View style={{ backgroundColor: `#ccc`, padding: 12, borderColor: `#000`, margin: 2 }}>
            <Text style={{ fontSize: 16, fontWeight: `bold` }}>Seizure Event</Text>
            <View>
                <Text>Time: {props.log.time}</Text>
                <Text>Location: {props.log.location}</Text>
                <Text>Notes: {props.log.notes}</Text>
            </View>
        </View>
    )
}

const DateHistory = (props: Props) => {
    const { date } = props.route.params;
    const [records, setRecords] = useState<any>();
    const [areRecords, setAreRecords] = useState<boolean>();

    useEffect(() => {
        console.log(areRecords);
        (async () => {
            const results = await SeizureHistoryDao.getLogsByDate(date.dateString);
            setRecords(results);
            if (results.length >0){
                setAreRecords(true);
            }
        })();
    }, []);

    return (
        <View style={{ margin: 14}}>
            {areRecords ?
                <View>
                    <FlatList
                        data={records}
                        renderItem={({ item }) => <RenderItem log={item} />}
                        keyExtractor={(item) => item.seizure_id.toString()}
                    />
                </View>
                :
                <Text>No events recorded for this day.</Text>
            }
        </View>
    )
}

export default DateHistory;