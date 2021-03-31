import { ResultSet } from "react-native-sqlite-storage";
import SeizureLog, { SeizureLogDb } from "../../../models/SeizureLog";
import Dao from "./Dao";

export default class SeizureLogDao extends Dao {
    static async getAll() {
        const sql = `
            SELECT
                *
            FROM
                ${SeizureLogDb.table}
        ;`;
        const resultSeizureLog = await this.runQuery(sql);
        return this.convertQueryResultToObj(resultSeizureLog, SeizureLog);
    }
    static async getByDate(date: Date) {
        let start = date.getTime();
        date.setHours(23, 59, 59, 999);
        let end = date.getTime();
        const sql = `
            SELECT
                *
            FROM
                ${SeizureLogDb.table}
            WHERE 
                ${SeizureLogDb.fields.date} >= ?
                AND ${SeizureLogDb.fields.date} <= ?
        ;`;
        const resultSeizureLog = await this.runQuery(sql, [start, end]);
        return this.convertQueryResultToObj(resultSeizureLog, SeizureLog);
    }
    static async getInDateRange(startDate:Date, endDate:Date) {
        startDate.setHours(0,0,0,0);
        let start = startDate.getTime();
        endDate.setHours(23, 59, 59, 999);
        let end = endDate.getTime();
        const sql = `
            SELECT
                *
            FROM
                ${SeizureLogDb.table}
            WHERE
                ${SeizureLogDb.fields.date} >= ?
                and ${SeizureLogDb.fields.date} <= ?
        ;`;
        const params = [start, end];
        const resultSeizureLog = await this.runQuery(sql, params);
        return this.convertQueryResultToObj(resultSeizureLog, SeizureLog);
    }
    static async getById(seizure_id: number | string) {
        const sql = `
            SELECT
                *
            FROM
                ${SeizureLogDb.table}
            WHERE 
                ${SeizureLogDb.fields.id} = ?
        ;`;
        const resultSeizureLog = await this.runQuery(sql, [seizure_id]);
        const convertedLogs = this.convertQueryResultToObj(resultSeizureLog, SeizureLog)[0];
        return convertedLogs?convertedLogs:undefined;
    }

    static async delete(id: number | string) {
        return await this.deleteObj(id, SeizureLogDb);
    }
}