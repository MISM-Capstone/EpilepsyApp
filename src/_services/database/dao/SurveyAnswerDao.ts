import SurveyAnswer from "../../../models/Surveys/SurveyAnswer";
import LogDao from "./LogDao";

export default class SurveyAnswerDao extends LogDao {
    static async getSurveyAnswers() {
        return await this.pullAll(SurveyAnswer);
    }

    // static async getSurveyAnswersByDate(date: Date) {
    //     return await this.pullfromDateRange(date, date, SurveyAnswer);
    // }

    static async getSurveyAnswersById(survey_id: number) {
        return await this.pullById(survey_id, SurveyAnswer);
    }
}