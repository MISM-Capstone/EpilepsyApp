import React from 'react';
import SeizureHistoryDao from '../database/dao/SeizureHistoryDao';

// Default structure for getting chart data
const getChartData = async () => {
    const seizures: any[] = await SeizureHistoryDao.getLogs();
    let data: any[] = [];

    seizures.forEach(seizure => {
        data.push({ x: seizure.date, y: 1 }) // What information is needed here to make a good chart?
    });
    return data;
}

// Charting Seizure Events by Day of the Week
const getChartDataDay = async () => {
    const seizures: any[] = await SeizureHistoryDao.getLogs();
    let data: any[] = new Array(7);
    data[0] = { day: "Sun", seizures: 0 };
    data[1] = { day: "Mon", seizures: 0 };
    data[2] = { day: "Tue", seizures: 0 };
    data[3] = { day: "Wed", seizures: 0 };
    data[4] = { day: "Thu", seizures: 0 };
    data[5] = { day: "Fri", seizures: 0 };
    data[6] = { day: "Sat", seizures: 0 };

    seizures.forEach(seizure => {
        let day = new Date(seizure.date).getDay();
        console.log(data[day]);
        data[day].seizures = +data[day].seizures + 1;

    });
    return data;
}

export default {
    getChartData,
    getChartDataDay
}
