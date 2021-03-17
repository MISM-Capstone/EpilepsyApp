import React from 'react';

type returnProps = {
    hours: number;
    minutes: number;
}

// Default structure for getting chart data
const getSleepTime = (start: Date, end: Date): returnProps => {
    console.log(start);
    console.log(end);

    const total: number = (new Date(end).getTime() - new Date(start).getTime()) / 1000 / 60 /60;
    const hours: number = Math.floor(total);
    const minutes: number = Math.floor((total - hours) * 60);
    
    console.log(total - hours);

    return {hours, minutes};
}

export default {
    getSleepTime
}
