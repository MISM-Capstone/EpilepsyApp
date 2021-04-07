import Db, { DbFields } from "./AbstractClasses/Db";

export default class User extends Db {
    first_name: string = "";
    last_name: string = "";
    get db() {
        return UserDb;
    }
    
}

export const UserDb = {
    table: "user",
    fields: {
        ...DbFields,
        first_name: "first_name",
        last_name: "last_name",
    }
} as const;