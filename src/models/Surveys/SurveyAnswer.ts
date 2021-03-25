import Db, { DbFields, DBObj } from "../AbstractClasses/Db";

export default class SurveyAnswer extends Db {
    answer: string = "";
    survey_log_id: number;
    survey_field_id: number;
    constructor(surveyLogId:number = 0, surveyFieldId:number = 0) {
        super();
        this.survey_log_id = surveyLogId;
        this.survey_field_id = surveyFieldId;
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
}
