import Db, { DbFields, DBObj } from "./AbstractClasses/Db";

export default class EpilepsyType extends Db {
    name: string = "";
    description: string = "";
}

export const EpilepsyTypeDb = {
    table: "epilepsy_type",
    fields: {
        ...DbFields,
        name: "name",
        description: "description",
    }
}