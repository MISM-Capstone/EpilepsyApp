import React from 'react';
import SeizureHistoryDao from '../database/dao/SeizureHistoryDao';

// Default structure for getting chart data
const getCalendarData = async () => {
    const seizures: any[] = await SeizureHistoryDao.getLogs();
    let days: any = [];

    seizures.forEach(seizure => {
        days.push( seizure.date );
    });

    console.log('Days: ', String(days));

    let marked_days: any = {};

    days.forEach((day: string | number) => {
        marked_days[day] = {selected: true, marked: true};
    });

    return marked_days;
}

export default {
    getCalendarData
}
