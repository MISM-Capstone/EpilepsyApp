import Log, { LogFields } from "../AbstractClasses/Log";

export default class SurveyLog extends Log {
    survey_id: number;
    constructor(user:number=0, surveyId:number=0) {
        super(user);
        this.survey_id = surveyId;
    }
}

export const SurveyLogDb = {
    table: "survey_log",
    fields: {
        ...LogFields,
        survey_id: "survey_id",
    }
} as const;
