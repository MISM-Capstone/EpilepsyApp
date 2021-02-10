import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from "../../navigation/HomeNavigation"
import SeizureLogDao from '../../database/dao/SeizureLogDao';
import { FlatList } from 'react-native-gesture-handler';

type Props = {
    navigation: any;
};

type RenderProps = {
    log: any;
}

function RenderItem(props:RenderProps) {
    return (
        <View>
            <Text>ID: log.seizure_id</Text>
            <Text>Date: log.date</Text>
            <Text>Location: log.location</Text>
            <Text>Notes: log.notes</Text>
        </View>
    )
}

export default function SurveyHistory(props:Props) {
    const [records, setRecords] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const results = await SeizureLogDao.getLogs();
            setRecords(results);
        })();
    },[]);


    return (
        <SafeAreaView>
            <FlatList 
                data={records}
                renderItem={({item}) => <RenderItem log={item} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView >
    )
}