import Db, { DbFields } from "../AbstractClasses/Db";
import SurveyLog from "./SurveyLog";
import SurveyField from "./SurveyField";

export default class SurveyAnswer extends Db {
    answer: string = "";
    survey_log_id: number;
    survey_field_id: number;
    constructor(surveyLog: SurveyLog, surveyField: SurveyField) {
        super();
        this.survey_log_id = surveyLog.id!;
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
}
