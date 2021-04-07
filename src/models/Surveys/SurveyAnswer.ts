import Db, { DbFields } from "../AbstractClasses/Db";
import SurveyField from "./SurveyField";

export default class SurveyAnswer extends Db {
    answer: string = "";
    survey_log_id: number;
    survey_field_id: number;
    get db() {
        return SurveyAnswerDb;
    }
    
    constructor(surveyLogId:number = 0, surveyField:SurveyField) {
        super();
        this.survey_log_id = surveyLogId;
        this.survey_field_id = surveyField.id!;
    }
}

export const SurveyAnswerDb = {
    table: "survey_answer",
    fields: {
        ...DbFields,
        answer: "answer",
        survey_log_id: "survey_log_id",
        survey_field_id: "survey_field_id",
    }
} as const;
