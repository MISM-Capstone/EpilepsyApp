import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import HistoryDao from '../../../_services/database/dao/HistoryDao';

const UpdateSeizureLog = (props: any) => {
    const [seizureLog, setSeizureLog] = useState<Object>();

    useEffect(() => {
        async function getSeizure() {
            let seizure: Object = await HistoryDao.getSeizureLogById(props.seizure_id);
            setSeizureLog(seizure);
        }

        getSeizure();        
    }, []);

    return (
        <>
            <Text>{seizureLog?.toString}</Text>
        </>
    );
}

export default UpdateSeizureLog;