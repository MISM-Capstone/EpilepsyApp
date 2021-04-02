import SurveyField, { SurveyFieldDb } from "../../../models/Surveys/SurveyField";
import DAO from "./Dao"

export default class SurveyFieldDao extends DAO {
    static async getAll() {
        return await this.pullAll(SurveyField);
    }
    static async getBySurveyId(surveyId:number) {
        const sql = `
            SELECT
                *
            FROM
                ${SurveyFieldDb.table}
            WHERE
                ${SurveyFieldDb.fields.survey_id}=?
            ORDER BY
                ${SurveyFieldDb.fields.id};
        `;
        const resultSurveyField = await this.runQuery(sql, [surveyId]);
        return this.convertQueryResultToObj(resultSurveyField, SurveyField);
    }
    static async getById(id:number) {
        return await this.pullById(id, SurveyField);

    }
}