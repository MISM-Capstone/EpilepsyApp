import Log, { LogFields } from "./AbstractClasses/Log";
import Location from "./Location";
import User from "./User";

export default class SeizureLog extends Log {
    time: string = "";
    details: string = "";
    notes: string = "";
    location_id: number;
    constructor(user:User, location:Location) {
        super(user);
        this.location_id = location.id!;
    }
}

export const SeizureLogDb = {
    table: "seizure_log",
    fields: {
        ...LogFields,
        time: "time",
        details: "details",
        notes: "notes",
        location_id: "location_id",
    }
}