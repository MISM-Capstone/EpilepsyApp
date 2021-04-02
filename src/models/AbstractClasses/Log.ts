import Db, { DbFields } from "./Db";

export default abstract class Log extends Db {
    date_recorded: Date = new Date();
    date: Date = new Date();
    user_id: number;
    get time() {
        return this.date.toLocaleTimeString();
    }
    constructor(userId: number) {
        super();
        this.user_id = userId;
    }
}

export const LogFields = {
    ...DbFields,
    date_recorded: "date_recorded",
    date: "date",
    user_id:"user_id",
} as const;
