import Db, { DbFields } from "./Db";
import User from "../User";

export default abstract class Log extends Db {
    date_recorded: Date = new Date();
    date_modified: Date = new Date();
    date_taken: Date = new Date();
    user_id: number;
    constructor(user: User) {
        super()
        this.user_id = user.id!;
    }
}

export const LogFields = {
    ...DbFields,
    date_recorded: "date_recorded",
    date_modified: "date_modified",
    date_taken: "date_taken",
    user_id:"user_id",
}