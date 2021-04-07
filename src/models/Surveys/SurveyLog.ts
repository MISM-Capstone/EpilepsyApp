import Log, { LogFields } from "../AbstractClasses/Log";
import Survey from "./Survey";
import User from "../User";

export default class SurveyLog extends Log {
    survey_id: number;
    constructor(user: User, survey: Survey) {
        super(user);
        this.survey_id = survey.id!;
    }
}

export const SurveyLogDb = {
    table: "survey_log",
    fields: {
        ...LogFields,
        survey_id: "survey_id",
    }
}
