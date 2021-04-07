import Db, { DbFields } from "../AbstractClasses/Db";

export enum SURVEY_FIELD_TYPE {
    bool = "boolean",
    str = "string",
    num = "number",
    date = "date",
    time = "time",
    datetime = "dateTime",
}


type FieldOption = {
    display: string;
    db: SURVEY_FIELD_TYPE;
}
export const FIELD_TYPES:FieldOption[] = [
    {
        display:"True/False",
        db:SURVEY_FIELD_TYPE.bool
    },
    {
        display:"Text",
        db:SURVEY_FIELD_TYPE.str
    },
    {
        display:"Number",
        db:SURVEY_FIELD_TYPE.num
    },
    {
        display:"Date",
        db:SURVEY_FIELD_TYPE.date
    },
    {
        display:"Time",
        db:SURVEY_FIELD_TYPE.time
    },
    {
        display:"Date with Time",
        db:SURVEY_FIELD_TYPE.datetime
    }
 ]

export default class SurveyField extends Db {
    question: string = "";
    field_type: SURVEY_FIELD_TYPE = SURVEY_FIELD_TYPE.bool;
    survey_id: number;
    get db() {
        return SurveyFieldDb;
    }
    

    get field_display() {
        let display = "";
        FIELD_TYPES.forEach(type => {
            if (type.db === this.field_type) {
                display = type.display;
                return;
            }
        });
        return display;
    }

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