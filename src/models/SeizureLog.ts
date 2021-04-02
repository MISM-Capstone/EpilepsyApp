import Log, { LogFields } from "./AbstractClasses/Log";

export default class SeizureLog extends Log {
    notes: string = "";
    location_id: number;
    get db() {
        return SeizureLogDb;
    }
    
    constructor(user:number=0, locationId:number=0) {
        super(user);
        this.location_id = locationId;
    }
}

export const SeizureLogDb = {
    table: "seizure_log",
    fields: {
        ...LogFields,
        time: "time",
        notes: "notes",
        location_id: "location_id",
    }
} as const;