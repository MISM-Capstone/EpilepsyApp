import Db, { DbFields, DBObj, DBObjFields } from "./Db";
import User from "../User";

export default abstract class Log extends Db {
    date_recorded: Date = new Date();
    date_modified: Date = new Date();
    date: Date = new Date();
    user_id: number;
    constructor(userId: number) {
        super();
        this.user_id = userId;
    }
}

export const LogFields:DBObjFields = {
    ...DbFields,
    date_recorded: "date_recorded",
    date_modified: "date_modified",
    date: "date",
    user_id:"user_id",
}