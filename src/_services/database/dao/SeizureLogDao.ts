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
    static async getByDate(date: string) {
        const sql = `
            SELECT
                *
            FROM
                ${SeizureLogDb.table}
            WHERE 
                ${SeizureLogDb.fields.date} = ?
        ;`;
        const resultSeizureLog = await this.runQuery(sql, [date]);
        return this.convertQueryResultToObj(resultSeizureLog, SeizureLog);
    }
    static async getInDateRange(startDate:Date, endDate:Date) {
        const sql = `
            SELECT
                *
            FROM
                ${SeizureLogDb.table}
            WHERE
                ${SeizureLogDb.fields.date} >= ?
                and ${SeizureLogDb.fields.date} <= ?
        ;`;
        const params = [startDate.toJSON().substring(0,10), endDate.toJSON().substring(0,10)];
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

    static async insert(seizureLog:SeizureLog) {
        return await this.insertObj(seizureLog, SeizureLogDb);
    }
    static async deleteSeizureLog(id: number | string) {
        return await this.deleteObj(id, SeizureLogDb);
    }
    static async update(seizureLog:SeizureLog) {
        return await this.updateObj(seizureLog, SeizureLogDb);
    }
}