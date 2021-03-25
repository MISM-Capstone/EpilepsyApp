import Db, { DbFields, DBObj } from "./AbstractClasses/Db";

export default class User extends Db {
    first_name: string = "";
    last_name: string = "";
}

export const UserDb:DBObj = {
    table: "user",
    fields: {
        ...DbFields,
        first_name: "first_name",
        last_name: "last_name",
    }
}