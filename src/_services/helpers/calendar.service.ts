import React from 'react';
import HistoryDao from '../database/dao/HistoryDao';

// Default structure for getting chart data
const getCalendarData = async () => {
    const seizures: any[] = await HistoryDao.getSeizureLogs();
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
