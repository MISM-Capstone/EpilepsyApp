import Dao from "./Dao";

export default class ReportDao extends Dao {
    static async getSeizuresInDateRange(startDate:Date, endDate:Date):Promise<any[]> {
        const sql = `
            SELECT
                *
            FROM
                seizure_log
            WHERE
                date >= ?
                and date <= ?
        ;`;
        const params = [startDate.toJSON().substring(0,10), endDate.toJSON().substring(0,10)];
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, params);
        return this.SetResultsToList(results[0].rows);
    }

    static async getMedicationInDateRange(startDate:Date, endDate:Date):Promise<any[]> {
        return [];
    }

    static async getSurveysInDateRange(startDate:Date, endDate:Date):Promise<any[]> {
        const sql = `
            SELECT
                *
            FROM
                survey_log
            WHERE
                date >= ?
                and date <= ?
        ;`;
        const params = [startDate.toJSON().substring(0,10), endDate.toJSON().substring(0,10)];
        const db = await this.getDatabase();
        const results = await db.executeSql(sql, params);
        return this.SetResultsToList(results[0].rows);
    }
}
