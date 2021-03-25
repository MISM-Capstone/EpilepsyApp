import Db, { DbFields, DBObj } from "./AbstractClasses/Db";

export default class Location extends Db {
    name: string = "";
    description: string = "";
}

export const LocationDb:DBObj = {
    table: "location",
    fields: {
        ...DbFields,
        name: "name",
        description: "description",
    }
}