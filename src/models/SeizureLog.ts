export default class SeizureLog {
    seizure_id?:number;
    date?: Date;
    time?: string;
    location?: string;
    notes?: string
}

export const SeizureDb = {
    table: "seizure_log",
    fields: {
        seizure_id:"seizure_id",
        date: "date",
        time: "time",
        location: "location",
        notes: "notes",
    }
}
