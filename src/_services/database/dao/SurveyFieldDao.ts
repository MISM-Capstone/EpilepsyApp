import SurveyField, { SurveyFieldDb } from "../../../models/Surveys/SurveyField";
import DAO from "./Dao"

export default class SurveyFieldDao extends DAO {
    static async getAll() {
        const sql = `
            SELECT
                *
            FROM
                ${SurveyFieldDb.table}
            ORDER BY
                ${SurveyFieldDb.fields.id};
        `;
        const resultSurveyField = await this.runQuery(sql);
        return this.convertQueryResultToObj(resultSurveyField, SurveyField);
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
    static async getById(id:number): Promise<SurveyField | undefined> {
        const sql = `
            SELECT
                *
            FROM
                ${SurveyFieldDb.table}
            WHERE
                id=?
            LIMIT 1;
        `;
        const resultSurveyField = await this.runQuery(sql, [id]);
        return this.convertQueryResultToObj(resultSurveyField, SurveyField)[0];
    }
}