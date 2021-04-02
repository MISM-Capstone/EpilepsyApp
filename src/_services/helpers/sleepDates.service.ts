
type returnProps = {
    hours: number;
    minutes: number;
}

// Default structure for getting chart data
const getSleepTime = (start: Date, end: Date): returnProps => {
    const total: number = (new Date(end).getTime() - new Date(start).getTime()) / 1000 / 60 /60;
    const hours: number = Math.floor(total);
    const minutes: number = Math.floor((total - hours) * 60);
    
    return {hours, minutes};
}

export default {
    getSleepTime
}
