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
        const db = await this.getDatabase();
        const results = await db.executeSql(sql);
        return this.SetResultsToList(results[0].rows) as SurveyLog[];
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
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [start, end]);
        return this.SetResultsToList(results[0].rows) as SurveyLog[];
    }
    static async getSurveysInDateRange(startDate:Date, endDate:Date):Promise<any[]> {
        const sql = `
            SELECT
                *
            FROM
                ${SurveyLogDb.table}
            WHERE
                ${SurveyLogDb.fields.date} >= ?
                and ${SurveyLogDb.fields.date} <= ?
        ;`;
        const params = [startDate.toJSON().substring(0,10), endDate.toJSON().substring(0,10)];
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, params);
        return this.SetResultsToList(results[0].rows) as SurveyLog[];
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
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [survey_id]);
        return this.SetResultsToList(results[0].rows) as SurveyLog[];
    }

    // TODO - Fix this!! 
    static async insertSurveyLog(date: Date, sleep_start_date: Date, sleep_end_date: Date, stress_level: string, illness: boolean, fever: boolean, miss_meal: boolean, medication: boolean) {
        let date_string = date.toJSON().substring(0,10);
        const sql = `
            INSERT INTO ${SurveyLogDb.table} 
                (${SurveyLogDb.fields.date},
                ${SurveyLogDb.fields.survey_id}) 
            VALUES
                (?,?,?,?,?,?,?,?)
            ;
        `;
        const params = [
            date_string,
            sleep_start_date.toString(),
            sleep_end_date.toString(),
            stress_level,
            illness.toString(),
            fever.toString(),
            miss_meal.toString(),
            medication.toString()
        ]
        console.log('params: ', params);
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, params);
        return results;
    }

    static async deleteSurveyLog(id: number | string) {
        const sql = `
            DELETE FROM ${SurveyLogDb.table}
            WHERE ${SurveyLogDb.fields.id} = ?
        ;`;
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, [id]);
        return this.SetResultsToList(results[0].rows);
    }

    // TODO - Fix this!!!!!!!
    static async updateSurveyLog(id: number | string, date: Date, sleep_start_date: Date, sleep_end_date: Date, stress_level: string, illness: boolean, fever: boolean, miss_meal: boolean, medication: boolean) {
        let date_string = date.toJSON().substring(0, 10);
        const sql = `
            UPDATE survey_log 
            SET    
                date = ?, 
                sleep_start_date =?,
                sleep_end_date = ?, 
                stress_level = ?,
                illness = ?,
                fever = ?,
                miss_meal = ?,
                medication = ? 
            WHERE 
                survey_id = ?
            ;
        `;
        const params = [
            date_string,
            sleep_start_date.toString(),
            sleep_end_date.toString(),
            stress_level,
            illness.toString(),
            fever.toString(),
            miss_meal.toString(),
            medication.toString(),
            id
        ]
        console.log('params: ', params);
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, params);
        return results;
    }
}