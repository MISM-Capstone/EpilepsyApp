import Log, { LogFields } from "./Log";
import Survey from "./Survey";
import User from "./User";

export default class SurveyLog extends Log {
    survey_id: number;
    constructor(user: User, survey: Survey) {
        super(user);
        this.survey_id = survey.id!;
    }
}

export const MedicationLogDb = {
    table: "medication_log",
    fields: {
        ...LogFields,
        survey_id: "survey_id",
    }
}
