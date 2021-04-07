import Db, { DbFields } from "../AbstractClasses/Db";
import Survey from "./Survey";

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
    constructor(survey:Survey) {
        super();
        this.survey_id = survey.id!;
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
}