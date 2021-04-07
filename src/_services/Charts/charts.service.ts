import HistoryDao from '../database/dao/HistoryDao';
import ReportDao from '../database/dao/ReportDao';

type ChartData = {
    data: any;
    numSeizures: number;
}

// Default structure for getting chart data
const getChartData = async () => {
    const seizures: any[] = await HistoryDao.getSeizureLogs();
    let data: any[] = [];
    
    seizures.forEach(seizure => {
        data.push({ x: seizure.date, y: 1 }); // What information is needed here to make a good chart?
    });

    return data;
}

// Charting Seizure Events by Day of the Week
const getChartDataDay = async (): Promise<ChartData> => {
    const seizures: any[] = await HistoryDao.getSeizureLogs();
    let data = getDaysInWeekArray();
    let numSeizures: number = 0;

    seizures.forEach(seizure => {
        let day = new Date(seizure.date).getUTCDay();
        data[day].seizures = +data[day].seizures + 1;
        numSeizures = numSeizures + 1;
    });

    const chartData: ChartData = {data,numSeizures}
    return chartData;
}

// Charting Seizure Events by Day of the Week in a certain range
const getChartDataDayInRange = async (startDate:Date, endDate:Date) => {
    const seizures: any[] = await ReportDao.getSeizuresInDateRange(startDate, endDate);
    let data = getDaysInWeekArray();

    seizures.forEach(seizure => {
        let day = new Date(seizure.date).getUTCDay();
        data[day].seizures = +data[day].seizures + 1;
    });
    return data;
}

// Charting Seizure Events by Day of the Week
const getChartDataTime = async (): Promise<ChartData> => {
    const seizures: any[] = await HistoryDao.getSeizureLogs();
    let data: any[] = new Array(6);
    data[0] = { hour: "12am", seizures: 0 }; 
    data[1] = { hour: "4am", seizures: 0 };
    data[2] = { hour: "8am", seizures: 0 };
    data[3] = { hour: "12pm", seizures: 0 };
    data[4] = { hour: "4pm", seizures: 0 };
    data[5] = { hour: "8pm", seizures: 0 };
    let numSeizures = 0;

    seizures.forEach(seizure => {
        let time = new Date("01/01/2021 " + seizure.time).getHours();
        console.log('TIME: ', time);
        let bucket = Math.ceil(time / 4) // 4 hour buckets
        console.log('bucket: ', bucket);
        data[bucket-1].seizures = +data[bucket-1].seizures + 1;
        numSeizures = numSeizures + 1;
    });

    const chartData: ChartData = {data, numSeizures}

    return chartData;
}

function getDaysInWeekArray() {
    return [
        { day: "Sun", seizures: 0 },
        { day: "Mon", seizures: 0 },
        { day: "Tue", seizures: 0 },
        { day: "Wed", seizures: 0 },
        { day: "Thu", seizures: 0 },
        { day: "Fri", seizures: 0 },
        { day: "Sat", seizures: 0 },
    ];
}

export default {
    getChartData,
    getChartDataDay,
    getChartDataDayInRange,
    getChartDataTime,
}
