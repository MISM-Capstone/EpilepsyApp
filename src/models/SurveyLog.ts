export default class SurveyLog {
    survey_entry_id?:number;
    date: Date = new Date();
    sleep_start_date?: Date;
    sleep_end_date?: Date;
    stress_level: number = 0;
    illness: boolean = false;
    fever: boolean = false;
    miss_meal: boolean = false;
}

export const SurveyDb = {
    table: "survey_log",
    fields: {
        survey_entry_id:"survey_entry_id",
        date: "date",
        sleep_start_date: "sleep_start_date",
        sleep_end_date: "sleep_end_date",
        stress_level: "stress_level",
        illness: "illness",
        fever: "fever",
        miss_meal: "miss_meal",
    }
}
