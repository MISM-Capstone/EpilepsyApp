import Db, { DbFields, DBObj } from "../AbstractClasses/Db";

export default class Survey extends Db {
    name: string = "";
    description: string = "";
}

export const SurveyDb:DBObj = {
    table: "survey",
    fields: {
        ...DbFields,
        name: "name",
        description: "description",
    }
}