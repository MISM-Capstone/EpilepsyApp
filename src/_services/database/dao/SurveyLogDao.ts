import SurveyLog, { SurveyLogDb } from "../../../models/Surveys/SurveyLog";
import Dao from "./Dao";

export default class SurveyLogDao extends Dao {
    static async getSurveyLogs() {
        const sql = `
            SELECT
                *
            FROM
                ${SurveyLogDb.table}
        ;`;
        const resultSurveyLog = await this.runQuery(sql);
        return this.convertQueryResultToObj(resultSurveyLog, SurveyLog);
    }
    static async getSurveyLogsByDate(date: Date) {
        let start = date.getTime();
        date.setHours(23, 59, 59, 999);
        let end = date.getTime();
        const sql = `
            SELECT
                *
            FROM
                ${SurveyLogDb.table}
            WHERE 
                ${SurveyLogDb.fields.date} = ?
        ;`;
        const resultSurveyLog = await this.runQuery(sql, [start, end]);
        return this.convertQueryResultToObj(resultSurveyLog, SurveyLog);
    }
    static async getSurveysInDateRange(startDate:Date, endDate:Date):Promise<any[]> {
        startDate.setHours(0,0,0,0);
        let start = startDate.getTime();
        endDate.setHours(23, 59, 59, 999);
        let end = endDate.getTime();
        const sql = `
            SELECT
                *
            FROM
                ${SurveyLogDb.table}
            WHERE
                ${SurveyLogDb.fields.date} >= ?
                and ${SurveyLogDb.fields.date} <= ?
        ;`;
        const resultSurveyLog = await this.runQuery(sql, [start, end]);
        return this.convertQueryResultToObj(resultSurveyLog, SurveyLog);
    }
    static async getSurveyLogById(survey_id: number | string) {
        const sql = `
            SELECT
                *
            FROM
                ${SurveyLogDb.table}
            WHERE 
                ${SurveyLogDb.fields.id} = ?
        ;`;
        const resultSurveyLog = await this.runQuery(sql, [survey_id]);
        const convertedLogs = this.convertQueryResultToObj(resultSurveyLog, SurveyLog)[0];
        return convertedLogs?convertedLogs:undefined;
    }

    static async delete(id: number | string) {
        return await this.deleteObj(id, SurveyLogDb);
    }
}