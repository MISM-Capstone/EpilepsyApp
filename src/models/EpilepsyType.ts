import Db, { DbFields } from "./AbstractClasses/Db";

export default class EpilepsyType extends Db {
    name: string = "";
    description: string = "";
    get db() {
        return EpilepsyTypeDb;
    }
    
}

export const EpilepsyTypeDb = {
    table: "epilepsy_type",
    fields: {
        ...DbFields,
        name: "name",
        description: "description",
    }
} as const;