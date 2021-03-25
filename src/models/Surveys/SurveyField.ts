import Db, { DbFields, DBObj } from "../AbstractClasses/Db";

export enum FieldType {
    bool = "boolean",
    str = "string",
    num = "number",
    date = "Date",
}

export default class SurveyField extends Db {
    question: string = "";
    field_type: FieldType = FieldType.bool;
    survey_id: number;
    constructor(surveyId:number = 0) {
        super();
        this.survey_id = surveyId;
    }
}

export const SurveyFieldDb:DBObj = {
    table: "survey_field",
    fields: {
        ...DbFields,
        question: "question",
        field_type: "field_type",
        survey_id: "survey_id",
    }
}