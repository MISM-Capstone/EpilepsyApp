import SurveyAnswer, { SurveyAnswerDb } from "../../../models/Surveys/SurveyAnswer";
import LogDao from "./LogDao";

export default class SurveyAnswerDao extends LogDao {
    static async getAll() {
        return await this.pullAll(SurveyAnswer);
    }
    static async getBySurveyLogId(surveyLogId:number) {
        const sql = `
            SELECT
                *
            FROM
                ${SurveyAnswerDb.table}
            WHERE
                ${SurveyAnswerDb.fields.survey_log_id}=?
            ORDER BY
                ${SurveyAnswerDb.fields.id};
        `;
        const resultSurveyField = await this.runQuery(sql, [surveyLogId]);
        return this.convertQueryResultToObj(resultSurveyField, SurveyAnswer);
    }

    static async getById(survey_id: number) {
        return await this.pullById(survey_id, SurveyAnswer);
    }
}