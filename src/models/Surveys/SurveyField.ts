import Db, { DbFields } from "../AbstractClasses/Db";

export enum SURVEY_FIELD_TYPE {
    bool = "boolean",
    str = "string",
    num = "number",
    date = "Date",
}

export default class SurveyField extends Db {
    question: string = "";
    field_type: SURVEY_FIELD_TYPE = SURVEY_FIELD_TYPE.bool;
    survey_id: number;
    constructor(surveyId:number = 0) {
        super();
        this.survey_id = surveyId;
    }
}

export const SurveyFieldDb = {
    table: "survey_field",
    fields: {
        ...DbFields,
        question: "question",
        field_type: "field_type",
        survey_id: "survey_id",
    }
} as const;