import SeizureLogDao from '../database/dao/SeizureLogDao';

// Default structure for getting chart data
const getCalendarData = async () => {
    const seizures: any[] = await SeizureLogDao.getAll();
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

const getTimeArray = (date: Date): Array<number> => {
    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    let time_array: Array<number> = new Array();
    time_array[0] = hours;
    time_array[1] = minutes;
    return time_array;
}

export default {
    getCalendarData,
    createDateFromTime,
    getTimeArray
}
