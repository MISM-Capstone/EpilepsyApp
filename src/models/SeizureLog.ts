import { DBObj } from "./AbstractClasses/Db";
import Log, { LogFields } from "./AbstractClasses/Log";

export default class SeizureLog extends Log {
    time: string = "";
    details: string = "";
    notes: string = "";
    location_id: number;
    constructor(user:number=0, locationId:number=0) {
        super(user);
        this.location_id = locationId;
    }
}

export const SeizureLogDb:DBObj = {
    table: "seizure_log",
    fields: {
        ...LogFields,
        time: "time",
        details: "details",
        notes: "notes",
        location_id: "location_id",
    }
}