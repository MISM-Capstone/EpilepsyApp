import Db, { DbFields } from "../AbstractClasses/Db";

export default class Survey extends Db {
    name: string = "";
    description: string = "";
    get db() {
        return SurveyDb;
    }
    
}

export const SurveyDb = {
    table: "survey",
    fields: {
        ...DbFields,
        name: "name",
        description: "description",
    }
} as const;