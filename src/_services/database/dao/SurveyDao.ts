import Survey, { SurveyDb } from "../../../models/Surveys/Survey";
import DAO from "./Dao"

export default class SurveyDao extends DAO {
    static async getAll() {
        const sql = `
            SELECT
                *
            FROM
                ${SurveyDb.table}
            ORDER BY
                ${SurveyDb.fields.name};
        `;
        const resultSurvey = await this.runQuery(sql);
        return this.convertQueryResultToObj(resultSurvey, Survey);
    }
    static async getById(id:number): Promise<Survey | undefined> {
        const sql = `
            SELECT
                *
            FROM
                ${SurveyDb.table}
            WHERE
                id=?
            LIMIT 1;
        `;
        const resultSurvey = await this.runQuery(sql, [id]);
        return this.convertQueryResultToObj(resultSurvey, Survey)[0];
    }
}