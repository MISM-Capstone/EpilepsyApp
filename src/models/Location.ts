import Db, { DbFields } from "./AbstractClasses/Db";

export default class Location extends Db {
    name: string = "";
    description: string = "";
}

export const LocationDb = {
    table: "location",
    fields: {
        ...DbFields,
        name: "name",
        description: "description",
    }
} as const;