import SurveyLog from "../../../models/Surveys/SurveyLog";
import LogDao from "./LogDao";

export default class SurveyLogDao extends LogDao {
    static async getSurveyLogs() {
        return await this.pullAll(SurveyLog);
    }
    static async getSurveyLogsByDate(date: Date) {
        return await this.pullfromDateRange(date, date, SurveyLog);
    }
    static async getSurveysInDateRange(startDate:Date, endDate:Date):Promise<any[]> {
        return await this.pullfromDateRange(startDate, endDate, SurveyLog);
    }
    static async getSurveyLogById(survey_id: number) {
        return await this.pullById(survey_id, SurveyLog);
    }

}