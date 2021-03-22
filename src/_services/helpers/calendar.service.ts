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

const createDateFromTime = (time: string): Date => {
    let hours: string = time.substring(0,time.indexOf(":"));
    let minutes: string = time.substring(hours.length + 1, hours.length + 3);
    let ampm: string= time.substring(time.length - 2, time.length);
    ampm === "PM" ? hours = (Number(hours) + 12).toString() : null;
    let date = new Date(2021,1,1,Number(hours),Number(minutes));
    return date
}

export default {
    getCalendarData,
    createDateFromTime
}
